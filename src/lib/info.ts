import { execa } from 'execa';

const xrandr = "xrandr";

export const connectedDisplay = async () => {
  const { stdout } = await execa(xrandr)
  const connected = stdout.match(/.*-\d(?=\s+connected)/); // match "eDP-1" of inside "eDP-1 connected primary screen"
  return connected ?? "";
}