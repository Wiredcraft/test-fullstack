import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';

export class StringUtils {
  static readonly EmailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  static isBlank(str: string): boolean {
    return !str || str.trim().length === 0;
  }

  static formatAmount(src: number): string {
    if (src) {
      return String(src).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    return null;
  }

  static dateWithoutTimezone(datetime: Date, containTime: boolean = false): string {
    if (datetime && datetime instanceof Date) {
      return containTime ? datetime.toISOString() : datetime.toISOString().slice(0, 10);
    }
    return null;
  }

  static dateFormat(datetime: Date, format: string = 'YYYY/MM/DD') {
    if (datetime && datetime instanceof Date) {
      return dayjs(datetime).format(format);
    }
    return null;
  }

  static datetimeFormat(datetime: Date, format: string = 'YYYY/MM/DD HH:mm:ss') {
    if (datetime && datetime instanceof Date) {
      return dayjs(datetime).format(format);
    }
    return null;
  }

  static isValidPassword(value: string): boolean {
    return /[A-Z]+/.test(value) && /[a-z]+/.test(value) && /[\d]+/.test(value) && value.length >= 8;
  }

  static isValidEmail(value: string): boolean {
    return StringUtils.EmailReg.test(value);
  }

  static splitBy(value: string, separator: string): string {
    if (!value || !separator) {
      return;
    }
    return value.split(separator).join('\n');
  }

  static parseBool(value: string | null): boolean | null {
    if (value == null || value === '') {
      return null;
    }
    return value === 'true';
  }

  static getCurrentISODate(): string {
    return new Date().toISOString();
  }

  static toHalfWidthNumber(input: string): string {
    input = input || '';
    const result = input.replace(/[０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });
    return result;
  }

  static removeNonNumeric(input: string): string {
    input = input || '';
    return input.replace(/[^\d.-]/g, '');
  }

  static generateUUID(): string {
    return uuid();
  }

  static splitAsArray(input: string, by: string = ','): string[] {
    if (StringUtils.isBlank(input)) {
      return [];
    }
    return input?.split(by);
  }

  static isContainLowerCase(input: string): boolean {
    return /(?=.*[a-z])/.test(input);
  }

  static isContainUpperCase(input: string): boolean {
    return /(?=.*[A-Z])/.test(input);
  }

  static isContainNumber(input: string): boolean {
    return /(?=.*[0-9])/.test(input);
  }

  static isContainMark(input: string): boolean {
    return /(?=.*[!~-])/.test(input);
  }
}
