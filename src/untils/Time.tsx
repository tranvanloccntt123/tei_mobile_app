export const esTime = (value: number) => {
    if(value < 10) return `0${value}`;
    else return value
}