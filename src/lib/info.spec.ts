import test from 'ava';

import { connectedDisplay, disconnectedDisplay, primaryDisplay } from "./info";

test("connectedDisplay_onlyGetConnectedDisplay", async t => {
  const result = await connectedDisplay();
  t.assert(result.length > 0);
});

test("disconnectedDisplay_onlyGetDisconnectedDisplay", async t => {
  const result = await disconnectedDisplay();
  t.assert(result.length > 0);
});

test("primaryDisplay_getPrimaryScreenId", async t => {
  const result = await primaryDisplay();
  t.assert(result.length > 0);
});
