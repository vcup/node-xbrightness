import { execSync } from "child_process";

const xrandr = "xrandr";
const o_output = " --output ";
const o_sameas = " --same-as ";

export async function displaySameAs(source: string, target: string) {
  const cmd = xrandr + o_output + source + o_sameas + target;
  execSync(cmd);
}