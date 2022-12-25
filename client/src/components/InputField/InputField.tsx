import style from './style.css';

import { createStyler } from '@/utils/styler';

const styler = createStyler(style);

type Props = (React.InputHTMLAttributes<Element> | React.TextareaHTMLAttributes<Element>) & {
  label?: string;
  error?: string;
};

export function InputField(props: Props) {
  const { className, label, error, ...inputProps } = props;

  const multiple = 'rows' in props;
  const InputComponent = multiple ? 'textarea' : 'input';
  const inputElement = (
    <InputComponent className={styler('input', multiple && 'multi-lines-input')} {...inputProps} />
  );

  return (
    <div className={styler(className, 'input-field', error && 'error-field')}>
      {label ? (
        <label className={styler('input-label')}>
          <span className={styler('label-text')}>{label}</span>
          {inputElement}
        </label>
      ) : (
        inputElement
      )}
      <span className={styler('input-error')}>{error}</span>
    </div>
  );
}
