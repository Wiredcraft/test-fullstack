import './index.css';
import React, {ReactElement} from 'react';

interface Props {
    children: React.ReactNode;
}

/**
  * Component which is centered vertically and horizontally.
  * @param {Props} props
  * @param {ReactElement} props.children - Children to display
  * @return {ReactElement}
 */
function Centered(props: Props): ReactElement {
  return (
    <div className="flex-center">
      <div className="flex-center-row">
        {props.children}
      </div>
    </div>
  );
}

export default Centered;
