module.exports = {
  extends: ["plugin:import/typescript"],
  env: {
    es6: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  plugins: ["@typescript-eslint", "eslint-plugin-unicorn", "import"],
  rules: {
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/ban-types": [
      // This is the defaultOptions minus `object`
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md#default-options
      "error",
      {
        extendDefaults: false,
        types: {
          String: {
            message: "Use string instead",
            fixWith: "string",
          },
          Boolean: {
            message: "Use boolean instead",
            fixWith: "boolean",
          },
          Number: {
            message: "Use number instead",
            fixWith: "number",
          },
          Symbol: {
            message: "Use symbol instead",
            fixWith: "symbol",
          },

          Function: {
            message: [
              "The `Function` type accepts any function-like value.",
              "It provides no type safety when calling the function, which can be a common source of bugs.",
              "It also accepts things like class declarations, which will throw at runtime as they will not be called with `new`.",
              "If you are expecting the function to accept certain arguments, you should explicitly define the function shape.",
            ].join("\n"),
          },

          // object typing
          Object: {
            message: [
              'The `Object` type actually means "any non-nullish value", so it is marginally better than `unknown`.',
              '- If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.',
              '- If you want a type meaning "any value", you probably want `unknown` instead.',
            ].join("\n"),
          },
          "{}": {
            message: [
              '`{}` actually means "any non-nullish value".',
              '- If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.',
              '- If you want a type meaning "any value", you probably want `unknown` instead.',
            ].join("\n"),
          },
        },
      },
    ],
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }],
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-inferrable-types": ["error", { ignoreParameters: true, ignoreProperties: true }],
    "@typescript-eslint/no-this-alias": "error",
    "@typescript-eslint/triple-slash-reference": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/restrict-plus-operands": "error",
    "@typescript-eslint/typedef": ["error", { arrowParameter: false }],
    "constructor-super": "error",
    curly: ["error", "multi-line"],
    "dot-notation": "error",
    eqeqeq: ["error", "smart"],
    "guard-for-in": "error",
    "import/no-cycle": "error",
    "max-params": ["error", 3],
    "no-caller": "error",
    "no-cond-assign": "error",
    "no-duplicate-case": "error",
    "no-eval": "error",
    "no-fallthrough": "error",
    // Temporarily disabled because it does not support `this` in arrow function class method and class property definition
    // See: https://github.com/typescript-eslint/typescript-eslint/issues/491
    // 'no-invalid-this': 'error',
    "no-new-wrappers": "error",
    "no-param-reassign": "error",
    "no-redeclare": "error",
    "no-return-await": "error",
    "no-sequences": "error",
    // Use @typescript-eslint/no-shadow instead because eslint's no-shadow doesn't support Typescript enums
    // https://stackoverflow.com/questions/63961803/eslint-says-all-enums-in-typescript-app-are-already-declared-in-the-upper-scope
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "no-sparse-arrays": "error",
    "no-throw-literal": "error",
    "no-unsafe-finally": "error",
    "no-var": "error",
    "no-void": "error",
    "prefer-arrow-callback": ["error", { allowNamedFunctions: true }],
    "prefer-const": "error",
    "prefer-object-spread": "error",
    radix: "error",
    "unicorn/filename-case": ["error", { case: "kebabCase" }],
    "use-isnan": "error",
  },
};
