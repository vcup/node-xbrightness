import test from 'ava';

import { connectedDisplay, disconnectedDisplay, primaryDisplay, getDisplayModes } from "./info";

test("connectedDisplay_onlyGetConnectedDisplay", async t => {
  const result = connectedDisplay();
  t.assert(result.length > 0);
});

test("disconnectedDisplay_onlyGetDisconnectedDisplay", async t => {
  const result = disconnectedDisplay();
  t.assert(result.length > 0);
});

test("primaryDisplay_getPrimaryScreenId", async t => {
  const result = primaryDisplay();
  t.assert(result.length > 0);
});

test("getDisplayModes", async t => {
  const result = getDisplayModes(await primaryDisplay());
  t.assert(result.length > 0);
})