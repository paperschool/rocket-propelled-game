export const flip = (percentage = 50): boolean => {
    return randomInt(0, 100) <= percentage;
};

export const random = (min = 0, max = 1): number => {
    return Math.random() * (max - min) + min;
};

export const randomInt = (min = 0, max = 1): number => {
    return Math.round(random(min, max));
};
