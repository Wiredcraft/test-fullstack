import React from "react";

const RouterState = React.createContext();
const Push = React.createContext();
const Replace = React.createContext();

export const useRouterState = () => React.useContext(RouterState);
export const usePush = () => React.useContext(Push);
export const useReplace = () => React.useContext(Replace);

const stringify = loc => `${loc.pathname}${loc.search || ""}${loc.hash || ""}`;

const getClientLocation = () => {
  const { pathname, search, hash } = window.location;
  return { pathname, search, hash };
};

export default ({ serverLocation, children }) => {
  const [state, setState] = React.useState(() => {
    const location = serverLocation || getClientLocation();
    return { location, lastHistoryAction: "POP" };
  });

  const push = React.useCallback(location => {
    window.history.pushState(null, null, stringify(location));
    setState({ location, lastHistoryAction: "PUSH" });
  }, []);

  const replace = React.useCallback(location => {
    window.history.replaceState(null, null, stringify(location));
    setState({ location, lastHistoryAction: "REPLACE" });
  }, []);

  React.useEffect(() => {
    const onPopstate = () => {
      setState({ location: getClientLocation(), lastHistoryAction: "POP" });
    };
    window.addEventListener("popstate", onPopstate);
    return () => window.removeEventListener("popstate", onPopstate);
  }, []);

  return (
    <RouterState.Provider value={state}>
      <Push.Provider value={push}>
        <Replace.Provider value={replace}>{children}</Replace.Provider>
      </Push.Provider>
    </RouterState.Provider>
  );
};

const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

export const Link = ({ replace: replaceProp, to, onClick, ...props }) => {
  const push = usePush();
  const replace = useReplace();
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
