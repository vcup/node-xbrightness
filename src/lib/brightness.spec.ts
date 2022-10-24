import test from "ava";
import { setBrightnessFade } from "./brightness";
import { primaryDisplay } from "./info";

test("setBrightness", async t => {
  await setBrightnessFade(primaryDisplay(), 0, 0);
  await setBrightnessFade(primaryDisplay(), 1, 1);

  t.pass()
})