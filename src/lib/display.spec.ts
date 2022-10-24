import test from 'ava';
import { primaryDisplay, getDisplayModes } from "./info"
import { FoundNearResolution } from "./display";

test("FoundNearResolution", t => {
  const source = primaryDisplay();
  const mode = FoundNearResolution(source, "1366x728", getDisplayModes(source));
  t.pass();
})