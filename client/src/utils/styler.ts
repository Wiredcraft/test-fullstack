import { clsx } from 'clsx';

interface StylerOption {
  // Keep the raw class name into the output of string. Easy for testing to get the XPath
  keepOriginal?: boolean;
}

/**
 * Enhance the result of get class name from style file.
 * @param style the imported object from style file, used to handle module css's hashed class name
 * @param option see `StylerOption` interface
 * @returns class name string
 */
export function createStyler(
  style: Record<string, string>,
  option: StylerOption = { keepOriginal: true },
) {
  const { keepOriginal = true } = option;

  return function styler(...args: Parameters<typeof clsx>) {
    const classNames = clsx(...args).split(' ');

    return classNames
      .map((name) => style[name])
      .filter((name) => name != null)
      .concat(keepOriginal ? classNames : [])
      .join(' ');
  };
}
