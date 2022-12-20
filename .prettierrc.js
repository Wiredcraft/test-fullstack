// prettier-vscode issue for pnpm
// https://github.com/umijs/umi/issues/8182#issuecomment-1171840512

module.exports = {
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "all",
  "proseWrap": "never",
  "overrides": [
    { "files": ".prettierrc.js", "options": { "parser": "json" } }
  ]
}
