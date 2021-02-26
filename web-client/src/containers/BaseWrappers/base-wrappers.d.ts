import { CSSProperties, ElementType } from "react";

export declare type PropWithTagName<T> = {
  tagName?: ElementType;
} & T;

export declare type PropWithStyle<T> = {
  style?: Partial<CSSProperties>;
} & T;

export declare type PropWithClassName<T> = {
  className?: string;
} & T;
