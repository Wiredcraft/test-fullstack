import classNames from "classnames";
import { createElement, PropsWithChildren } from "react";
import { PropWithClassName, PropWithStyle, PropWithTagName } from "./base-wrappers";
import './Bloc.scss';

type BlockProps = PropsWithChildren<PropWithStyle<PropWithTagName<PropWithClassName<{
  noBoxShadow?: boolean;
  noBorderRadius?: boolean;
}>>>>;

export default function Bloc({ tagName, children, style, className, ...options }: BlockProps) {
  tagName = tagName || "div";
  return createElement(tagName, {
    className: `${classNames({
      'fdx-bloc': true,
      'fdx-bloc_flat': options.noBoxShadow,
      'fdx-bloc_sharp': options.noBorderRadius
    })} ${className}`,
    style,
    children
  })
}
