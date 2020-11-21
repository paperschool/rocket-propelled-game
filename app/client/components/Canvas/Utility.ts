

export const random = (min: number = 0, max: number = 1): number => {
    return (Math.random() * (max - min)) + min;
}

export const randomInt = (min: number = 0, max: number = 1): number => {
    return Math.round(random(min, max))
}