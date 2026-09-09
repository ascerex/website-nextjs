import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const componentPath = new URL(
  "../src/components/VehiclePropulsionGallery.tsx",
  import.meta.url,
);
const stylesheetPath = new URL(
  "../src/components/VehiclePropulsionGallery.module.css",
  import.meta.url,
);

test("card labels reflect recorded program states without generic pass claims", async () => {
  const component = await readFile(componentPath, "utf8");

  assert.match(component, /stateLabel:\s*"Deferred"/);
  assert.match(component, /stateLabel:\s*"In Screening"/);
  assert.match(component, /stateLabel:\s*"Does Not Advance"/);
  assert.match(component, /stateLabel:\s*"Prospective"/);
  assert.doesNotMatch(
    component,
    /stateLabel:\s*"(?:Failed|Passed Screening|Advanced Example)"/,
  );
  assert.doesNotMatch(component, /title:\s*"Architecture [A-F]"/);
});

test("cards progress from active screening through non-advancing studies", async () => {
  const component = await readFile(componentPath, "utf8");
  const screeningIndex = component.indexOf('state: "in-screening"');
  const prospectiveIndex = component.indexOf('state: "prospective"');
  const deferredIndex = component.indexOf('state: "deferred"');
  const stoppedIndex = component.indexOf('state: "does-not-advance"');

  assert.ok(screeningIndex >= 0);
  assert.ok(screeningIndex < prospectiveIndex);
  assert.ok(prospectiveIndex < deferredIndex);
  assert.ok(deferredIndex < stoppedIndex);
});

test("the research catalogue families and technical detail labels are present", async () => {
  const component = await readFile(componentPath, "utf8");

  assert.match(component, /title: "Plasma \/ EHD Research"/);
  assert.match(component, /title: "Fluidic Propulsion"/);
  assert.match(component, /title: "Turbine Jet"/);
  assert.match(component, /title: "Magnetic Thruster Claim"/);
  assert.match(component, /<dt>Evaluation summary<\/dt>/);
  assert.match(component, /<dt>Evidence represented<\/dt>/);
  assert.match(component, /<dt>Takeaway<\/dt>/);
});

test("screening and prospective states use the requested colors", async () => {
  const stylesheet = await readFile(stylesheetPath, "utf8");

  assert.match(stylesheet, /--status-in-screening:\s*#eab308/);
  assert.match(stylesheet, /--status-prospective:\s*#9ca3af/);
});

test("scramble behavior preserves the legacy timing and progressive reveal", async () => {
  const component = await readFile(componentPath, "utf8");

  assert.match(component, /speed=\{15\}/);
  assert.match(component, /speed=\{20\}\s*delay=\{100\}/);
  assert.match(component, /iteration\s*\/\s*1\.5/);
  assert.match(component, /Math\.ceil\(text\.length\s*\*\s*1\.5\)/);
  assert.doesNotMatch(component, /prefers-reduced-motion/);
});

test("card hover motion remains animated instead of snapping", async () => {
  const stylesheet = await readFile(stylesheetPath, "utf8");

  assert.match(
    stylesheet,
    /\.card\s*\{[\s\S]*?transition:[\s\S]*?transform 400ms var\(--motion-standard\)/,
  );
  assert.match(
    stylesheet,
    /\.cardTitle\s*\{[\s\S]*?transition:\s*transform 400ms var\(--motion-standard\)/,
  );
  assert.match(
    stylesheet,
    /\.cardReveal\s*\{[\s\S]*?opacity:\s*0[\s\S]*?transition:[\s\S]*?opacity 400ms var\(--motion-standard\)[\s\S]*?transform 400ms var\(--motion-standard\)/,
  );
  assert.match(
    stylesheet,
    /\.card:hover \.cardReveal[\s\S]*?opacity:\s*1/,
  );
});

test("status corners animate outward with the card status color", async () => {
  const stylesheet = await readFile(stylesheetPath, "utf8");

  assert.match(
    stylesheet,
    /\.card::before,[\s\S]*?\.cardCorners::after[\s\S]*?background:\s*var\(--status-color\)[\s\S]*?transition:\s*transform 400ms var\(--motion-standard\)/,
  );
  assert.match(
    stylesheet,
    /translate3d\(0\.375rem,\s*-0\.375rem,\s*0\)/,
  );
  assert.match(
    stylesheet,
    /translate3d\(-0\.375rem,\s*0\.375rem,\s*0\)/,
  );
});

test("carousel centers from rendered card geometry instead of inferred gap arithmetic", async () => {
  const component = await readFile(componentPath, "utf8");

  assert.match(component, /card\.offsetLeft/);
  assert.match(component, /card\.offsetWidth/);
  assert.match(component, /getCardScrollTarget/);
  assert.doesNotMatch(component, /const CARD_GAP/);
  assert.doesNotMatch(component, /spacerWidth\s*=/);
});

test("programmatic edge scrolling cannot be re-snapped at the 150ms manual snap point", async () => {
  const component = await readFile(componentPath, "utf8");

  assert.match(component, /const programmaticTargetRef = useRef<number \| null>\(null\)/);
  assert.match(component, /if \(programmaticTarget !== null\)/);
  assert.match(component, /if \(nearestIndex === programmaticTarget\)/);
  assert.match(component, /scrollToCard\(index\)/);
  assert.match(component, /EDGE_SELECTION_DELAY_MS = 450/);
  assert.match(component, /SCROLL_END_MS = 150/);
});
