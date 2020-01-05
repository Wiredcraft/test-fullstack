/**
 * Simple templating
 * @example
 * template('this is {name}', { name: "Zhuo" })
 * => this is Zhuo
 */

const template = (string: string, obj: { [x: string]: string }): string => {
  let newString = string;
  Object.entries(obj).forEach(([key, value]) => {
    newString = newString.replace(new RegExp(`{${key}}`, "g"), value);
  });
  return newString;
};

export default template;
