import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useContext,
  createElement
} from "react";

export const State = createContext();
export const Actions = createContext();

const stringify = loc => `${loc.pathname}${loc.search || ""}${loc.hash || ""}`;

const getClientLocation = () => {
  const { pathname, search, hash } = window.location;
  return { pathname, search, hash };
};

export default ({ serverLocation, children }) => {
  const [state, setState] = useState(() => {
    const location = serverLocation || getClientLocation();
    return { location, lastHistoryAction: "POP" };
  });

  const actions = useMemo(() => {
    const push = location => {
      window.history.pushState(null, null, stringify(location));
      setState({ location, lastHistoryAction: "PUSH" });
    };

    const replace = location => {
      window.history.replaceState(null, null, stringify(location));
      setState({ location, lastHistoryAction: "REPLACE" });
    };

    return { push, replace };
  }, []);

  useEffect(() => {
    const onPopstate = () => {
      setState({ location: getClientLocation(), lastHistoryAction: "POP" });
    };
    window.addEventListener("popstate", onPopstate);
    return () => window.removeEventListener("popstate", onPopstate);
  }, []);

  return (
    <State.Provider value={state}>
      <Actions.Provider value={actions}>{children}</Actions.Provider>
    </State.Provider>
  );
};

const match = (routes, segments, result) => {
  outer: for (let i = 0; i < routes.length; i++) {
    const [pathname, factory, ...subRoutes] = routes[i];

    if (pathname === null) {
      result.factory = factory;
      break;
    }

    const rules = pathname.split("/").filter(v => v);
    let params = [];

    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i];

      if (segments.length === i) {
        continue outer;
      }

      let seg = segments[i];

      if (rule.startsWith(":")) {
        params.push(decodeURIComponent(seg));
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
  createElement(factory, {
    ...props,
    params,
    children: inner && inner.factory ? render(inner, props) : null
  });

export const Routes = ({ routes, ...props }) => {
  const { location } = useContext(State);

  const result = useMemo(() => {
    const segments = location.pathname.split("/").filter(v => v);
    let result = {};

    match(routes, segments, result);

    return result;
  }, [location, routes]);

  if (!result.factory) return null;

  return render(result, props);
};

const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

export const Link = ({ replace: replaceProp, to, onClick, ...props }) => {
  const { push, replace } = useContext(Actions);
  return (
    <a
      {...props}
      href={typeof to === "string" ? to : stringify(to)}
      onClick={event => {
        if (event.button !== 0 || isModifiedEvent(event)) return;

        if (onClick) onClick(event);
        if (event.defaultPrevented) return;

        event.preventDefault();

        let location = to;
        if (typeof to === "string") {
          location = { pathname: to, search: "", hash: "" };
        }

        replaceProp ? replace(location) : push(location);
      }}
    />
  );
};
