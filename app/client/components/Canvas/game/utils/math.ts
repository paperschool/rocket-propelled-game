export function random(min = 0, max = 1): number {
    return Math.random() * (max - min) + min;
}

export function randomInt(min = 0, max = 1): number {
    return Math.round(random(min, max));
}
