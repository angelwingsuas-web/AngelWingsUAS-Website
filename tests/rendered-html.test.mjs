import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the AngelWingsUAS homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>AngelWingsUAS Portfolio \| Drone Photography, Video &amp; 360° Tours<\/title>/i,
  );
   assert.match(html, /Aerial work\./);
  assert.match(html, /Real perspective\./);
  assert.match(html, /Drone photography/);
  assert.match(html, /Drone video/);
  assert.match(html, /CloudPano 360° tours/);
  assert.match(html, /Request project information/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("keeps production metadata and core source assets in place", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

   assert.match(page, /Aerial work\./);
  assert.match(page, /Drone photography/);
  assert.match(page, /Drone video/);
  assert.match(page, /CloudPano 360° tours/);
  assert.match(page, /360° drone images/);
  assert.match(layout, /AngelWingsUAS Portfolio \| Drone Photography, Video & 360° Tours/);
  assert.match(layout, /openGraph:/);
  assert.match(layout, /twitter:/);
  assert.match(packageJson, /"test": "npm run build && node --test/);

  await Promise.all([
    access(new URL("../public/angel-wings-uas-logo-cropped.png", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../package-lock.json", import.meta.url)),
  ]);
  await assert.rejects(access(new URL("../pnpm-lock.yaml", import.meta.url)));
});
