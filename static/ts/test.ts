export function f(x: number): number {
    if (x === 1 || x === 2) {
        return 1;
    }
    return f(x - 1) + f(x - 2)
}