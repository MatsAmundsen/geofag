import assert from "node:assert/strict";
import { test } from "node:test";
import {
  D1_DATABASE_NAME,
  cloudflareAuthFromEnv,
  idFromCreateOutput,
  idFromWranglerList,
  patchWranglerJson,
  patchWranglerToml,
  PLACEHOLDER_ID,
} from "./ensure-d1.mjs";

const SAMPLE = `name = "geofag"
main = "./.output/server/index.mjs"

[[d1_databases]]
binding = "POSTS_DB"
database_name = "geofag-posts"
database_id = "${PLACEHOLDER_ID}"
`;

test("patchWranglerToml replaces the placeholder id", () => {
  const id = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const next = patchWranglerToml(SAMPLE, id);
  assert.match(next, new RegExp(`database_id = "${id}"`));
  assert.doesNotMatch(next, new RegExp(PLACEHOLDER_ID));
});

test("patchWranglerToml appends a block when missing", () => {
  const next = patchWranglerToml('name = "geofag"\n', "11111111-2222-3333-4444-555555555555");
  assert.match(next, /\[\[d1_databases\]\]/);
  assert.match(next, /binding = "POSTS_DB"/);
  assert.match(next, new RegExp(`database_name = "${D1_DATABASE_NAME}"`));
});

test("idFromWranglerList reads uuid or id", () => {
  assert.equal(
    idFromWranglerList([{ name: "geofag-posts", uuid: "abc" }], "geofag-posts"),
    "abc",
  );
  assert.equal(
    idFromWranglerList({ result: [{ name: "geofag-posts", id: "def" }] }, "geofag-posts"),
    "def",
  );
  assert.equal(idFromWranglerList([{ name: "other", uuid: "abc" }], "geofag-posts"), null);
});

test("idFromCreateOutput parses wrangler create text", () => {
  const stdout = `
[[d1_databases]]
binding = "DB"
database_name = "geofag-posts"
database_id = "zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz"
`;
  assert.equal(idFromCreateOutput(stdout), "zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz");
});

test("patchWranglerJson inserts or updates d1_databases", () => {
  const first = patchWranglerJson(JSON.stringify({ name: "geofag" }), "abc-id");
  assert.match(first, /"database_id": "abc-id"/);
  assert.match(first, /"binding": "POSTS_DB"/);
  const next = patchWranglerJson(first, "def-id");
  assert.match(next, /"database_id": "def-id"/);
  assert.equal(JSON.parse(next).d1_databases.length, 1);
});

test("cloudflareAuthFromEnv reads token and account", () => {
  const auth = cloudflareAuthFromEnv({
    CLOUDFLARE_ACCOUNT_ID: "acct",
    CLOUDFLARE_API_TOKEN: "tok",
  });
  assert.equal(auth.accountId, "acct");
  assert.equal(auth.token, "tok");
});
