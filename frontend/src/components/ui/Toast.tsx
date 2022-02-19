import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import './Toast.scss';

export interface ToastProps {
  id: string;
  destroy: () => void;
  title: string;
  content: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}
const Toast: React.FC<ToastProps> = (props) => {
  const { destroy, content, title, duration = 0, type } = props;

  const toastClasses = classNames({
    success: type === 'success',
    info: type === 'info',
    error: type === 'error'
  });

  useEffect(() => {
    if (!duration) return;

    const timer = setTimeout(() => {
      destroy();
    }, duration);

    return () => clearTimeout(timer);
  }, [destroy, duration]);

  return (
    <div className={toastClasses}>
      <div className={'toast-header'}>
        <div>
          {title}
        </div>
        <button className='exit-button' onClick={destroy}>X</button>
      </div>
      <div className={'toast-body'}>{content}</div>
    </div>
  );
};

const shouldRerender = (prevProps: ToastProps, nextProps: ToastProps) => {
  return prevProps.id === nextProps.id;
};
export default React.memo(Toast, shouldRerender);
