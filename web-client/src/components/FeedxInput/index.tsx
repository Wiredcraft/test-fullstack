import classNames from 'classnames';
import { useField } from 'formik';
import { AllHTMLAttributes, forwardRef, RefObject } from "react";
import './index.scss';


type CombinedAttributes = AllHTMLAttributes<HTMLInputElement> & AllHTMLAttributes<HTMLLabelElement>
interface FeedxInputProps extends CombinedAttributes { }

export const FeedxInput = forwardRef(
  (
    { style, label, ...domAttributes }: FeedxInputProps,
    ref: RefObject<HTMLInputElement>
  ) => {
    // @ts-ignore
    const [field, meta] = useField(domAttributes);
    return (
      <>
        {label ? <label className="fdx-label" htmlFor={domAttributes.id || domAttributes.name}>{label}</label> : ''}
        <input className={classNames({
          'fdx-input': true,
          'fdx-transition': true,
        })} ref={ref} style={style}  {...field} {...domAttributes} />
        {meta.touched && meta.error ? (
          <div className="fdx-input-error">{meta.error}</div>
        ) : null}
      </>
    )
  });
