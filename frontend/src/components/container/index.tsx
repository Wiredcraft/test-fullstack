import './index.css';
import React, {ReactElement} from 'react';

interface Props {
  children: React.ReactNode;
}

/**
  * The main application container.
  * @param {Props} props
  * @param {ReactElement} props.children - Children to display
  * @return {ReactElement}
 */
function Container(props: Props): ReactElement {
  return (
    <div className="container">
      {props.children}
    </div>
  );
}

export default Container;
