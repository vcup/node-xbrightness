import test from "ava";
import { setBrightnessFade } from "./brightness.js";
import { primaryDisplay } from "./info.js";

test("setBrightness", async t => {
  await setBrightnessFade(await primaryDisplay(), 0, 0);
  await setBrightnessFade(await primaryDisplay(), 1, 1);

  t.pass()
})