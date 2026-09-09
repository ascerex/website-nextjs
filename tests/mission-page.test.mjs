import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pagePath = new URL("../src/app/mission/page.tsx", import.meta.url);
const componentPath = new URL(
  "../src/components/MissionPolicyExplorer.tsx",
  import.meta.url,
);
const stylesheetPath = new URL(
  "../src/app/mission/mission.module.css",
  import.meta.url,
);

test("mission route preserves the approved page structure", async () => {
  const page = await readFile(pagePath, "utf8");

  assert.match(page, /Mission statement/);
  assert.match(page, /Integrated system architecture/);
  assert.match(page, /id="policy-and-compliance"/);
  assert.match(page, /<MissionPolicyExplorer \/>/);
  assert.match(page, /Explore the vehicle/);
});

test("mission claims remain future-facing and evidence bounded", async () => {
  const page = await readFile(pagePath, "utf8");
  const explorer = await readFile(componentPath, "utf8");
  const publicCopy = `${page}\n${explorer}`;

  assert.match(publicCopy, /not claims of approval or\s+certification today/);
  assert.doesNotMatch(publicCopy, /validates feasibility/i);
  assert.doesNotMatch(publicCopy, /system validated through/i);
  assert.doesNotMatch(publicCopy, /DO-178C/);
});

test("architecture diagram preserves its network at narrow widths", async () => {
  const page = await readFile(pagePath, "utf8");
  const explorer = await readFile(componentPath, "utf8");
  const stylesheet = await readFile(stylesheetPath, "utf8");

  assert.match(page, /viewBox="0 0 800 520"/);
  assert.match(explorer, /viewBox="0 0 400 400"/);
  assert.match(page, /preserveAspectRatio="xMidYMid meet"/);
  assert.match(explorer, /preserveAspectRatio="xMidYMid meet"/);
  assert.match(
    stylesheet,
    /@media \(max-width: 720px\)[\s\S]*?\.architectureCanvas\s*\{\s*aspect-ratio: 20 \/ 13;/,
  );
  assert.doesNotMatch(
    stylesheet,
    /@media \(max-width: 720px\)[\s\S]*?\.architectureConnectors\s*\{\s*display: none;/,
  );
  assert.match(
    stylesheet,
    /@media \(max-width: 720px\)[\s\S]*?\.policyBubbles\s*\{[\s\S]*?position: static;/,
  );
});

test("policy categories are keyboard-operable controls", async () => {
  const explorer = await readFile(componentPath, "utf8");

  assert.match(explorer, /<button/);
  assert.match(explorer, /aria-pressed=/);
  assert.match(explorer, /aria-controls="active-policy-category"/);
  assert.match(explorer, /Previous policy category/);
  assert.match(explorer, /Next policy category/);
  assert.match(explorer, /title: "Autonomy Assurance"/);
  assert.match(explorer, /title: "Vehicle Approval"/);
});

test("policy nodes hide connector lines behind opaque boundaries", async () => {
  const stylesheet = await readFile(stylesheetPath, "utf8");

  assert.match(stylesheet, /\.policyCenter\s*\{[\s\S]*?background: #111419;/);
  assert.match(stylesheet, /\.policyBubble\s*\{[\s\S]*?background: #0d0f13;/);
});
