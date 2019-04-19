import React from 'react';

const Spinner = ({ scale, padding }) => {
  return (
    <div style={{padding: padding}}>
      <div
        className='spinner-container'
        style={{
          zoom: scale && `${Math.ceil(scale * 100)}%`,
        }}
      >
        <div
          className='lds-ring'
          aria-label='Loading...'
          title='Loading...'
        >
          <div className='lds-ring-inner first'></div>
          <div className='lds-ring-inner second'></div>
          <div className='lds-ring-inner third'></div>
        </div>
      </div>
    </div>
  );

}

export default Spinner;
