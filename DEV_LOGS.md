# Yarn v2

## yarnrc dotenv

Yarn [supports](https://yarnpkg.com/configuration/yarnrc) envrironment variables in its `.yarnrc.yml`:

```yaml
npmRegistryServer: ${BERRY_RC_NPM_REGISTRY}
# use a fallback value
npmRegistryServer: ${BERRY_RC_NPM_REGISTRY-fallbackValue}
# or
npmRegistryServer: ${BERRY_RC_NPM_REGISTRY:-fallbackValue}
# example
npmRegistryServer: ${BERRY_RC_NPM_REGISTRY:-https://registry.npm.taobao.org}
```

But it reads global environments only.

There exists [a yarn plugin that reads dotenv files](https://github.com/jeysal/yarn-plugin-dotenv), but only works for scripts except `yarnrc` itself.

## Install failure with typescript

Add [resolution](https://yarnpkg.com/configuration/manifest#resolutions) entry for typescript version, avoid `4.2.x`:

```json
// [root]packages.json
{
  // ...
  "resolutions": {
    "typescript": "4.1.5"
  }
  // ...
}
```

# MISC

## Prisma vs TypeORM
[Type Safty](https://www.prisma.io/docs/concepts/more/comparisons/prisma-and-typeorm#type-safety)
[Migerate to Primsa](https://darioielardi.dev/migrating-a-large-production-app-from-typeorm-to-prisma)


## React Virtualized scrolling

<!-- no implementation yet -->
1. [react-virtualized](https://github.com/bvaughn/react-virtualized)
2. [react-window]()
