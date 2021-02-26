import fs from 'fs';
import path from 'path';
import JSON5 from 'json5';

export default function loadJSON5<T = any>(filename: string): T {
  path.join(__dirname, filename);
  const content = fs.readFileSync(filename, 'utf8');
  try {
    return JSON5.parse(content);
  } catch (err) {
    err.message = filename + ': ' + err.message;
    throw err;
  }
}
