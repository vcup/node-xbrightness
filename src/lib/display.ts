import { execSync } from "child_process";
import { getDisplayModes } from "./info";
import { mode } from "../types/mode";

const xrandr = "xrandr";
const o_output = " --output ";
const o_sameas = " --same-as ";
const o_mode = " --mode "

export function SameAs(source: string, target: string) {
  const cmd = xrandr + o_output + source + o_sameas + target;
  execSync(cmd);
}

export function SetResolution(source: string, mode: string) {
  const cmd = xrandr + o_output + source + o_mode + mode;
  execSync(cmd);
}

export function TrySetResolution(source: string, target: string): mode {
  const allMode = getDisplayModes(source);
  const targetMode = FoundNearResolution(source, target, allMode);
  SetResolution(source, targetMode.Resolution);
  return targetMode;
}

export function FoundNearResolution(source: string, target: string, modes: mode[]): mode {
  if (modes === null || modes.length === 0) throw "parameter 'modes' is null or empty";
  const diffrences = [] as number[];

  const target_s = target.split('x');
  const targetDitizing = [Number.parseInt(target_s[0]), Number.parseInt(target_s[1])];
  for (let index = 0; index < modes.length; index++) {
    const resolution = modes[index].Resolution.split('x');
    const diffrence =
      (Number.parseInt(resolution[0]) - targetDitizing[0]) *
      (Number.parseInt(resolution[1]) - targetDitizing[1]);
    diffrences.push(Math.abs(diffrence));
  }

  const min = Math.min.apply(null, diffrences);
  return modes[diffrences.indexOf(min)];
}