import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pagePath = new URL("../src/app/skyway/page.tsx", import.meta.url);
const explorerPath = new URL(
  "../src/components/SkywayNetworkExplorer.tsx",
  import.meta.url,
);
const stylesheetPath = new URL(
  "../src/app/skyway/skyway.module.css",
  import.meta.url,
);

test("skyway route leads with visitor context before development detail", async () => {
  const page = await readFile(pagePath, "utf8");

  assert.match(page, /The Skyway/);
  assert.match(page, /What the Skyway provides/);
  assert.match(page, /Mapping & simulation/);
  assert.match(page, /Distance-based altitude, fixed layers, speed relationships/);
  assert.match(page, /Where development stands/);
  assert.match(page, /Future navigation/);
  assert.match(page, /Current research artifact/);
  assert.match(page, /Existing aviation enters the map/);
  assert.match(page, /The Skyway must fit the sky that already exists/);
  assert.match(page, /Explore flight autonomy/);
  assert.doesNotMatch(page, /Why it needs to exist/);
  assert.doesNotMatch(page, /className=\{styles\.systemTrack\}/);
});

test("future navigation begins with journey and operating inputs", async () => {
  const page = await readFile(pagePath, "utf8");

  assert.match(page, /Current location \+ destination/);
  assert.match(page, /Range, energy, altitude, speed, climb \+ equipment capability/);
  assert.match(page, /Available routes, closures, traffic conditions \+ restrictions/);
  assert.match(page, /Applicable weather, terrain \+ operating conditions/);
  assert.doesNotMatch(page, /Cost profile/);
});

test("skyway public copy keeps software results separate from operations", async () => {
  const page = await readFile(pagePath, "utf8");
  const explorer = await readFile(explorerPath, "utf8");
  const publicCopy = `${page}\n${explorer}`;

  assert.match(publicCopy, /No real routes or operational airspace/);
  assert.match(publicCopy, /Engineering suitability unknown/);
  assert.match(publicCopy, /Illustrative behavior \/\/ Not an operational route/);
  assert.doesNotMatch(publicCopy, /certified Skyway/i);
  assert.doesNotMatch(publicCopy, /validated navigation/i);
});

test("network explorer uses keyboard-operable view controls", async () => {
  const explorer = await readFile(explorerPath, "utf8");

  assert.match(explorer, /<button/);
  assert.match(explorer, /aria-pressed=/);
  assert.match(explorer, /aria-live="polite"/);
  assert.match(explorer, /Journey available/);
  assert.match(explorer, /Conditions change/);
  assert.match(explorer, /Alternative evaluated/);
  assert.doesNotMatch(explorer, />N0\d</);
});

test("network diagrams retain shared responsive coordinate systems", async () => {
  const page = await readFile(pagePath, "utf8");
  const explorer = await readFile(explorerPath, "utf8");
  const stylesheet = await readFile(stylesheetPath, "utf8");

  assert.match(page, /viewBox="0 0 1200 760"/);
  assert.match(page, /viewBox="0 0 600 270"/);
  assert.match(explorer, /viewBox="0 0 900 500"/);
  assert.match(explorer, /preserveAspectRatio="xMidYMid meet"/);
  assert.doesNotMatch(stylesheet, /\.explorerStage svg\s*\{[^}]*display:\s*none/s);
});
