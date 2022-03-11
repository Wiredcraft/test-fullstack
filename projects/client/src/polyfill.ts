// FIXME::This is a bug from React-Fresh
// the runtime will tell you that the following variables cannot be found
// but it doesn't seem to have any side effects
// a simple solution is to create them directly here
if (process.env.NODE_ENV !== "production") {
  // @ts-ignore
  window.$RefreshReg$ = () => {};
  // @ts-ignore
  global.$RefreshSig$ = () => () => {};
}
