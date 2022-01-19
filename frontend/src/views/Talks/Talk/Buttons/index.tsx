import {IAppState, IOwnProps} from '../../../../interfaces/IRootState';
import React, {ReactElement, useEffect} from 'react';
import {AppDispatch} from '../../../../store';
import {ITalkObject} from 'src/interfaces/ITalk';
import {IUserState} from 'src/interfaces/IUser';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {api} from '../../../../actions';
import {connect} from 'react-redux';
import {getCookie} from '../../../../utils/cookies';


interface ButtonProps {
    talk: ITalkObject;
    userReducer: IUserState;
    dispatch: AppDispatch;
}

const TalkButtons = (props: ButtonProps): ReactElement => {
  const [isOwner, setisOwner] = React.useState(false);
  const link = `/talks/edit/${props.talk._id}`;

  useEffect(() => {
    setisOwner(props.talk.user === props.userReducer.username);
  }, []);

  const handleDelete = (): void => {
    props.dispatch(
        api.talks.apiTalksDeleteAction(
            getCookie('token'),
            props.talk._id,
        ));
  };

  return (
    <div style={{
      flex: '1 0',
      margin: '10px',
      alignContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }}>
      {isOwner ?
        (<React.Fragment>

          <Link to={link} style={{
            textDecoration: 'none',
            color: '#000',
          }}>
            Edit
          </Link>


          <br/>
          <div style={{cursor: 'pointer'}} onClick={handleDelete}>Delete</div>
        </React.Fragment>):<React.Fragment/>
      }
    </div>
  );
};


TalkButtons.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ( state: IAppState, _ownProps: IOwnProps) => {
  return {
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps)(TalkButtons);
