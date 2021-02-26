import classNames from 'classnames';
import { forwardRef, HTMLAttributes, PropsWithChildren, RefObject } from "react";
import './index.scss';


type ButtonAttributes = HTMLAttributes<HTMLButtonElement>
interface FeedxButtonProps extends ButtonAttributes {
  type?: "submit" | "button"
  btnType?: "primary" | "danger" | "ghost";
}

export const FeedxButton = forwardRef(
  (
    { children, btnType, type, style, ...domAttributes }: PropsWithChildren<FeedxButtonProps>,
    ref: RefObject<HTMLButtonElement>
  ) => {
    // build className
    // // const baseClassName = 'fdx-btn';
    // // const typeInferClassName = `fdx-btn_${type || 'primary'}`;
    // // const className = `${baseClassName} ${typeInferClassName}`;
    // use classnames to help
    const className = classNames({
      'fdx-btn': true,
      [`fdx-btn_${btnType || 'primary'}`]: true,
      'fdx-transition': true,
    });

    return <button type={type || "button"} ref={ref} style={style} className={className} {...domAttributes
    }> {children}</ button >
  });
