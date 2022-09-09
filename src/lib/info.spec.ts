import test from 'ava';

import { connectedDisplay } from "./info.js";

test("connectedDisplay_onlyGetConnectedDisplay", async t => {
    const result = await connectedDisplay();
    t.assert(result.length !== 0)
})
