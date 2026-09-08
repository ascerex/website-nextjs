import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const headerStyles = readFileSync(
  new URL("../src/components/Header.module.css", import.meta.url),
  "utf8",
);

test("the header always tucks with a transform transition", () => {
  assert.match(
    headerStyles,
    /\.stage\s*\{[^}]*transition-property:\s*transform;[^}]*transition-duration:\s*[1-9]\d*ms;/s,
    "the normal header state should declare an explicit non-zero transform transition",
  );

  const reducedMotionStyles = headerStyles.match(
    /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*)\}\s*$/,
  )?.[1];

  assert.ok(reducedMotionStyles, "the header should retain a reduced-motion treatment");
  assert.doesNotMatch(
    reducedMotionStyles,
    /\.stage\s*\{[^}]*transition:\s*none;/s,
    "reduced motion should shorten the tuck instead of making the header snap away",
  );
  assert.match(
    reducedMotionStyles,
    /\.stage\s*\{[^}]*transition-duration:\s*[1-9]\d*ms;/s,
    "the reduced-motion tuck should retain a short non-zero duration",
  );
});
