import url from 'url'
import Path from 'path-parser'

function match (href, routes) {
  const parsed = url.parse(href)
  for (const route of routes) {
    const matched = route.matcher.test(parsed.pathname, { trailingSlash: true })
    if (matched) {
      return {
        handler: route.handler,
        params: matched,
        path: route.path
      }
    }
  }
}

function route (path, handler) {
  const matcher = new Path(path)
  return {
    build: matcher.build.bind(matcher),
    matcher,
    handler,
    path
  }
}

export { match, route }
export default { match, route }
