import assert from "node:assert/strict";
import net from "node:net";
import test from "node:test";
import { startIpv6LoopbackBridge } from "./ipv6-loopback-bridge.mjs";

function listen(server, options) {
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(options, () => resolve(server.address()));
  });
}

test("IPv6 loopback reaches an IPv4-only target on the same port number", async () => {
  const target = net.createServer((socket) => {
    socket.end("ok-from-ipv4");
  });
  const targetAddress = await listen(target, { host: "127.0.0.1", port: 0 });
  const bridge = startIpv6LoopbackBridge(targetAddress.port);
  await listen(bridge, { host: "::", port: 0, ipv6Only: true });
  const bridgeAddress = bridge.address();

  try {
    const body = await new Promise((resolve, reject) => {
      const socket = net.connect({ host: "::1", port: bridgeAddress.port });
      const chunks = [];
      socket.on("data", (chunk) => chunks.push(chunk));
      socket.on("end", () => resolve(Buffer.concat(chunks).toString()));
      socket.on("error", reject);
    });
    assert.equal(body, "ok-from-ipv4");
  } finally {
    bridge.close();
    target.close();
  }
});
