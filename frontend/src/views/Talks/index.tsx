import React, {ReactElement} from 'react';
import {getCookie} from '../../utils/cookies';

/**
  * Talks component.
  * @return {ReactElement}
 */
function Talks(): ReactElement {
  return (
    <div>
        Welcome, {getCookie('username')} !
    </div>
  );
}

export default Talks;
