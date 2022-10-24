import { execSync } from 'child_process';
import { mode } from "../types/mode.js";

const xrandr = "xrandr";

function regexMatchToStringArray(array: RegExpMatchArray | null) {
  if (array === null) {
    return [];
  }

  const result = [];
  for (let index = 0; index < array.length; index++) {
    result.push(array[index]);
  }

  return result;
}

export async function primaryDisplay() {
  const stdout = execSync(xrandr).toString();
  const matched = stdout.match(/.*-\d(?=\s+connected primary)/g)

  return regexMatchToStringArray(matched)[0];
}

export async function connectedDisplay() {
  const stdout = execSync(xrandr).toString();
  const matched = stdout.match(/.*-\d(?=\s+connected)/g); // match "eDP-1" of inside "eDP-1 connected primary screen"

  return regexMatchToStringArray(matched);
}

export async function disconnectedDisplay() {
  const stdout = execSync(xrandr).toString();
  const matched = stdout.match(/.*-\d(?=\s+disconnected)/g); // match "DP-1" of inside "DP-1 disconnected"

  return regexMatchToStringArray(matched);
}

export function getDisplayModes(source: string): mode[] {
  var stdout: string = execSync(xrandr).toString();
  var stdout_s = stdout.split('\n');
  var gotSource = false;
  var result = [];
  for (let index = 0; index < stdout_s.length; index++) {
    const element = stdout_s[index];
    const reResolution = /\s+\d+x\d+\s+[-+]?[0-9]*\.?[0-9]+.*/;
    if (gotSource && !reResolution.test(element) && /^[^\s]*(?=\s)/.test(element) && element.startsWith(source)) gotSource = false;
    if (!gotSource && element.startsWith(source)) gotSource = true;
    if (!gotSource || !reResolution.test(element)) continue;

    const mode = {} as mode;
    mode.IsCurrent = /\*/.test(element);
    mode.IsOptimal = /\+/.test(element);
    mode.FrameRates = [];

    const sourceModeInfo = element.split(/\s+/)
    for (let index = 0; index < sourceModeInfo.length; index++) {
      const element = sourceModeInfo[index];
      if (element === '' || element === '+' || element === '*') continue;
      else if (/\d+x\d+/.test(element)) mode.Resolution = element;
      else mode.FrameRates.push(Number.parseFloat(element));
    }
    result.push(mode);
  }

  return result;
}
