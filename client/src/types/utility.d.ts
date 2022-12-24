/* eslint-disable @typescript-eslint/no-explicit-any */
declare type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

declare type Executable<A extends any[], R> = (...args: A) => R;

declare type Nullable<T> = T | null | undefined;

declare type ValueOf<T> = T[keyof T];

declare type ArrayType<T extends any[]> = T extends (infer A)[] ? A : never;

declare type PromiseValue<T extends Promise<any>> = T extends Promise<infer V> ? V : never;
