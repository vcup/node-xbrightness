import { execSync } from 'child_process';

let current_brightness = 1;

async function setBrightness(screen: string, brightness: number) {
    const cmd = "xrandr --output " + screen + " --brightness " + brightness;
    execSync(cmd);
    current_brightness = brightness;
}

export async function setBrightnessFade(screen: string, brightness: number, time = 3) {
    if (time === 0) {
        await setBrightness(screen, brightness);
        return;
    }
    const step = 50; // ms
    const totalTime = time * 1000; // ms
    const count = totalTime / step;
    const brightness_step = Math.abs(current_brightness - brightness) / count;
    const is_negative = current_brightness > brightness;
    for (let i = 0; i < count; i++) {
        const next_brightness = is_negative ? current_brightness - brightness_step : current_brightness + brightness_step;
        await new Promise(resolve => setTimeout(resolve, step))
        await setBrightness(screen, next_brightness);
    }
    await setBrightness(screen, brightness);
}

export function getBrightness() {
    return current_brightness;
}