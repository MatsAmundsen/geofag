/**
 * PNG-lesing og piksel-diff for bergarter-QC.
 * Chrome-skjermbilder er 8-bit RGB eller RGBA, uten interlace.
 */
import { crc32, deflateSync, inflateSync } from "node:zlib";

const SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

function unfilter(filter, row, prev, bpp) {
  if (filter === 0) return;
  for (let i = 0; i < row.length; i += 1) {
    const left = i >= bpp ? row[i - bpp] : 0;
    const up = prev[i] || 0;
    const ul = i >= bpp ? prev[i - bpp] || 0 : 0;
    let add = 0;
    if (filter === 1) add = left;
    else if (filter === 2) add = up;
    else if (filter === 3) add = Math.floor((left + up) / 2);
    else if (filter === 4) add = paeth(left, up, ul);
    else throw new Error(`ukjent PNG-filter ${filter}`);
    row[i] = (row[i] + add) & 255;
  }
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const name = Buffer.from(type);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([name, data])) >>> 0, 0);
  return Buffer.concat([length, name, data, crc]);
}

/** @returns {{ width: number, height: number, data: Buffer }} RGBA */
export function decodePng(buffer) {
  const buf = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
  if (buf.length < 8 || !buf.subarray(0, 8).equals(SIG)) throw new Error("ikke en PNG");
  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  let interlace = 0;
  const idat = [];
  while (offset + 8 <= buf.length) {
    const length = buf.readUInt32BE(offset);
    offset += 4;
    const type = buf.toString("ascii", offset, offset + 4);
    offset += 4;
    const data = buf.subarray(offset, offset + length);
    offset += length + 4;
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      interlace = data[12];
    } else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
  }
  if (interlace !== 0) throw new Error("interlaced PNG støttes ikke");
  if (bitDepth !== 8 || (colorType !== 6 && colorType !== 2)) {
    throw new Error(`PNG-format ${bitDepth}/${colorType} støttes ikke`);
  }
  const bpp = colorType === 6 ? 4 : 3;
  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * bpp;
  const expected = height * (stride + 1);
  if (raw.length < expected) throw new Error("uferdig PNG-data");
  const rgba = Buffer.alloc(width * height * 4);
  const prev = Buffer.alloc(stride);
  let rawAt = 0;
  for (let y = 0; y < height; y += 1) {
    const filter = raw[rawAt];
    rawAt += 1;
    const row = Buffer.from(raw.subarray(rawAt, rawAt + stride));
    rawAt += stride;
    unfilter(filter, row, prev, bpp);
    prev.set(row);
    const dest = y * width * 4;
    if (bpp === 4) rgba.set(row, dest);
    else {
      for (let x = 0; x < width; x += 1) {
        rgba[dest + x * 4] = row[x * 3];
        rgba[dest + x * 4 + 1] = row[x * 3 + 1];
        rgba[dest + x * 4 + 2] = row[x * 3 + 2];
        rgba[dest + x * 4 + 3] = 255;
      }
    }
  }
  return { width, height, data: rgba };
}

export function encodePng({ width, height, data }) {
  const stride = width * 4;
  const raw = Buffer.alloc(height * (stride + 1));
  for (let y = 0; y < height; y += 1) {
    const at = y * (stride + 1);
    raw[at] = 0;
    data.copy(raw, at + 1, y * stride, y * stride + stride);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    SIG,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/**
 * Piksel for piksel. Ulik størrelse er et avvik uten diff-bilde.
 * Like piksler tones ned, avvik blir røde.
 */
export function diffPng(leftBuf, rightBuf) {
  const left = decodePng(leftBuf);
  const right = decodePng(rightBuf);
  if (left.width !== right.width || left.height !== right.height) {
    return {
      changed: null,
      width: left.width,
      height: left.height,
      otherWidth: right.width,
      otherHeight: right.height,
      reason: "ulik størrelse",
    };
  }
  let changed = 0;
  const out = Buffer.alloc(left.data.length);
  for (let i = 0; i < left.data.length; i += 4) {
    const same =
      left.data[i] === right.data[i] &&
      left.data[i + 1] === right.data[i + 1] &&
      left.data[i + 2] === right.data[i + 2] &&
      left.data[i + 3] === right.data[i + 3];
    if (same) {
      out[i] = left.data[i] >> 2;
      out[i + 1] = left.data[i + 1] >> 2;
      out[i + 2] = left.data[i + 2] >> 2;
      out[i + 3] = 255;
    } else {
      changed += 1;
      out[i] = 255;
      out[i + 1] = 32;
      out[i + 2] = 32;
      out[i + 3] = 255;
    }
  }
  return {
    changed,
    width: left.width,
    height: left.height,
    reason: changed ? "piksler" : "lik",
    png: changed ? encodePng({ width: left.width, height: left.height, data: out }) : null,
  };
}
