const SEP = '/';
const UPPER = '..';
const CURR = '.';

// if the path starts with '/'
export function isAbsolute(path: unknown): boolean {
  return !!path && String(path).startsWith(SEP);
}

export function hasTailSlash(path: unknown): boolean {
  return !!path && String(path).endsWith(SEP);
}

// remove all falsey values (false, null, 0, "", undefined, and NaN)
export function compact(...args: (string[] | string)[]): string[] {
  return ([] as string[]).concat(...args).filter((arg) => !!arg);
}

// normalize given path by resolving '..' and '.' segments
// testcase:
//    ../../en/js/position/  => ../../en/js/position/
//    ../en/js/position/     => ../en/js/position/
//    /../../en/js/position/ => /en/js/position/
//    /../en/js/position/    => /en/js/position/
export function normalize(path: string): string {
  if (!path) return path;

  const isAbs = isAbsolute(path);
  const paths: string[] = [];

  compact(path.split(SEP)).forEach((segment) => {
    if (segment === CURR) return;

    if (segment === UPPER) {
      if ((!isAbs && paths.length === 0) || paths[paths.length - 1] === UPPER) {
        paths.push(segment);
      } else if (paths.length > 0) {
        paths.pop();
      }
      return;
    }

    paths.push(segment);
  });

  return `${isAbs ? SEP : ''}${paths.join(SEP)}${hasTailSlash(path) ? SEP : ''}`;
}

export function join(...args: string[]): string {
  return normalize(compact(args).join(SEP));
}

export function splice(
  path: string,
  start: number,
  deleteCount: number,
  ...items: string[]
): string {
  const paths = path.split(SEP);
  paths.splice(start, deleteCount, ...items);
  return paths.join(SEP);
}
