# FEEDx

Feed you with good ideas

# Setup

**Export DOTENV for yarnrc**

Under the project root, run `source scripts/export-dotenv` to export stuff from dotenv to global.

Yarn [supports](https://yarnpkg.com/configuration/yarnrc) envrironment variables in its `.yarnrc.yml`:

``` yaml
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


**Install**

Run `yarn [install]` anywhere in the project.
