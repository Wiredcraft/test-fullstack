export class MathUtils {
  static randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static round(num: number, digit: number = 1): number | undefined {
    if (!num) return undefined;
    const d = Math.pow(10, digit);
    return Math.round(num * d) / d;
  }
}
