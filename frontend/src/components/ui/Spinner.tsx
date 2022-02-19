import classNames from 'classnames';
import React from 'react';

import './Spinner.scss';

type Props = {
  large: boolean;
};
export default function Spinner(props: Props) {
  const classes = classNames({
    spinner: !props.large,
    'spinner-large': props.large
  });
  return (
    <div className="relative">
      <div className={classes}></div>
    </div>
  );
}
