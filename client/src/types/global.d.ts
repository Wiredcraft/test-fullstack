declare const __BUILD_DATE__: string;
declare const __DEVELOPMENT__: boolean;
declare const __GIT_REVISION__: string;
declare const __GIT_COMMIT_DATE__: string;

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
