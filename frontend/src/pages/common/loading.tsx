import React from 'react';
import Spinner from '../../components/ui/Spinner';

import './loading.scss';

export default class Loading extends React.Component {
  render() {
    return (
      <div className="w-full flex items-center justify-center spinner-wrapper">
        <Spinner large />
      </div>
    );
  }
}
