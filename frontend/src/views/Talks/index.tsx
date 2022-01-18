import PropTypes from 'prop-types';
import React, {ReactElement} from 'react';
import {IAppState} from 'src/interfaces/IRootState';
import {api} from '../../actions';
import {connect} from 'react-redux';
import {getCookie} from '../../utils/cookies';

/**
  * Talks component.
  * @param {object} props - Component props
  * @return {ReactElement}
 */
function Talks(props: any): ReactElement {
  const abcd = (event: any): void => {
    event.preventDefault();

    props.dispatch(api.talks.apiTalksListAction(getCookie('token')));
  };


  return (
    <div>
        Welcome, {getCookie('username')} !<p/>
      <button onClick={abcd}>List talks</button>
    </div>
  );
}

Talks.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (_state: IAppState) => {
  return {};
};

export default connect(mapStateToProps)(Talks);
