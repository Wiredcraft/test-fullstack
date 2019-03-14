import React from "react";
import { useRouterState } from "./router";

const decode = value => (value ? decodeURIComponent(value) : value);

const match = (routes, segments, result) => {
  outer: for (let i = 0; i < routes.length; i++) {
    const [pathname, factory, ...subRoutes] = routes[i];

    if (pathname === null) {
      result.factory = factory;
      break;
    }

    const rules = pathname.split("/");
    let params = [];

    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i];

      if (segments.length === i) {
        continue outer;
      }

      let seg = segments[i];

      if (rule.startsWith(":")) {
        params.push(decode(seg));
      } else if (rule !== seg) {
        continue outer;
      }
    }

    if (rules.length === segments.length) {
      result.factory = factory;
      result.params = params;
      break;
    }

    if (!subRoutes.length) {
      continue;
    }

    let inner = {};

    match(subRoutes, segments.slice(rules.length), inner);

    if (inner.factory) {
      result.factory = factory;
      result.params = params;
      result.inner = inner;
      break;
    }
  }
};

const render = ({ factory, params, inner }, props) =>
  React.createElement(factory, {
    ...props,
    params,
    children: inner && inner.factory ? render(inner, props) : null
  });

export default ({ routes, ...props }) => {
  const { location } = useRouterState();

  const result = React.useMemo(() => {
    const segments = location.pathname.slice(1).split("/");
    let result = {};

    match(routes, segments, result);

    return result;
  }, [location, routes]);

  if (!result.factory) return null;

  return render(result, props);
};
