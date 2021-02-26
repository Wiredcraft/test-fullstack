# Shared Data

This package may contain common stuff that both `@feed-x/services` and `@feed-x/web-client` depends on, possible for:

- Common validation strateties (form inputs).
- Data models.
- API endpoint configs.
- etc.

No implementation.

## Usage

Simply list this as a dependency, then yarn will do the `link`s.

```json
/* web-client/package.json */

{
  "name": "@feed-x/web-client",
  "dependencies": {
    "@feed-x/shared": "workspace:shared",
    "react": "^17.0.1",
    // ...
  }
  // ...
}
```
