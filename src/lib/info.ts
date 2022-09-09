import { execa } from 'execa';

const xrandr = "xrandr";

export const connectedDisplay = async () => {
  const { stdout } = await execa(xrandr)
  const connected = stdout.match(/.*-\d(?=\s+connected)/g); // match "eDP-1" of inside "eDP-1 connected primary screen"

  if (connected === null) {
    return [];
  }

  const result = []
  for (let index = 0; index < connected.length; index++) {
    result.push(connected[index]);
  }

  return result;
}