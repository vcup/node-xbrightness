import { execa } from 'execa';

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
  const { stdout } = await execa(xrandr);
  const matched = stdout.match(/.*-\d(?=\s+connected primary)/g)

  return regexMatchToStringArray(matched)[0];
}

export async function connectedDisplay() {
  const { stdout } = await execa(xrandr);
  const matched = stdout.match(/.*-\d(?=\s+connected)/g); // match "eDP-1" of inside "eDP-1 connected primary screen"

  return regexMatchToStringArray(matched);
}

export async function disconnectedDisplay() {
  const { stdout } = await execa(xrandr);
  const matched = stdout.match(/.*-\d(?=\s+disconnected)/g); // match "DP-1" of inside "DP-1 disconnected"

  return regexMatchToStringArray(matched);
}


