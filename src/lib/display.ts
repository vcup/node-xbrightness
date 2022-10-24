import { execSync } from "child_process";

const xrandr = "xrandr";
const o_output = " --output ";
const o_sameas = " --same-as ";
const o_mode = " --mode "

export function displaySameAs(source: string, target: string) {
  const cmd = xrandr + o_output + source + o_sameas + target;
  execSync(cmd);
}

export function displaySetResolution(source: string, mode: string) {
  const cmd = xrandr + o_output + source + o_mode + mode;
  execSync(cmd);
}