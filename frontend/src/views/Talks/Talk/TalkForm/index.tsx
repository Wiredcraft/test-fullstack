import {IAppState, IOwnProps} from '../../../../interfaces/IRootState';
import React, {ReactElement, useEffect} from 'react';
import Button from '../../../../components/button';
import Centered from '../../../../components/centered';
import Container from '../../../../components/container';
import Form from '../../../../components/form';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCookie} from '../../../../utils/cookies';
import talks from '../../../../actions/api/talks';
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';

/**
 * User form for create and edit actions.
 * @param {Object} props
 * @param {AppDispatch} props.dispatch - Dispatch actions to the store
 * @param {IAPIAuthState} props.apicreateUserReducer - create user reducer
 * @param {IAPIAuthState} props.apieditUserReducer - edit user reducer
 * @param {string} props.type - `create` or `edit`
 * @return {ReactElement}
 */
function TalkForm(props: any): ReactElement {
  const [message, setMessage] = React.useState('');
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const navigate = useNavigate();

  const {id} = useParams();

  const handleSubmit = (event: any): any => {
    event.preventDefault();

    const currentName = event.target['talk-name'].value;
    const currentDescription = event.target['talk-description'].value;

    if (props.type === 'edit') {
      const patch: any = {};
      if (name) {
        patch['name'] = currentName;
      }
      if (description) {
        patch['description'] = currentDescription;
      }
      if (id) {
        props.dispatch(talks.apiTalksPatchAction(
            getCookie('token'),
            id,
            patch,
        ));
      }
    } else if (props.type === 'create') {
      props.dispatch(talks.apiTalksPostAction(
          {name: currentName, description: currentDescription},
          getCookie('token'),
      ));
    }
  };

  useEffect(() => {
    if (id && props.type === 'edit') {
      props.dispatch(
          talks.apiTalksGetAction( getCookie('token'), id),
      );
    }
  }, []);

  useEffect(() => {
    const apiTalksGetReducer = props.apiTalksGetReducer;

    if (apiTalksGetReducer.error.message) {
      setMessage(apiTalksGetReducer.error.message);
    } else {
      setName(apiTalksGetReducer.response.name);
      setDescription(apiTalksGetReducer.response.description);
    }
  }, [
    props.apiTalksGetReducer,
  ]);

  useEffect(() => {
    const apiTalksPostReducer = props.apiTalksPostReducer;

    if (apiTalksPostReducer.error.message) {
      setMessage(apiTalksPostReducer.error.message);
    } else {
      if (apiTalksPostReducer.response.status === 'created') {
        props.dispatch(talks.apiTalksPostResetAction());
        navigate('/talks');
      }
    }
  }, [
    navigate,
    props,
    props.apiTalksPostReducer,
  ]);


  useEffect(() => {
    const apiTalksPatchReducer = props.apiTalksPatchReducer;

    if (apiTalksPatchReducer.error.message) {
      setMessage(apiTalksPatchReducer.error.message);
    } else {
      if (apiTalksPatchReducer.response.status === 'patched') {
        props.dispatch(talks.apiTalksPatchResetAction());
        navigate('/talks');
      }
    }
  }, [
    navigate,
    props,
    props.apiTalksPatchReducer,
  ]);


  return (
    <Container>
      <Centered>
        <Form onSubmit={handleSubmit}>
          <h1 className='center-text'>
            {props.type === 'create' ? 'Create talk' : 'Edit talk'}
          </h1>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              id="talk-name"
              required={props.type === 'create'}
              placeholder={props.type === 'edit' ? name : ''}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              id="talk-description"
              required={props.type === 'create'}
              placeholder={props.type === 'edit' ? description : ''}
            />
          </div>
          <div className='flex-reverse'>
            <Button type="submit" fullWidth>
          Save
            </Button>
          </div>
          <p/>
          <div className='center-text' id='form-message'>
            {message}
          </div>
        </Form>
      </Centered>
    </Container>

  );
}

TalkForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  apiTalksGetReducer: PropTypes.object.isRequired,
};


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: IAppState, _ownProps: IOwnProps) => {
  return {
    apiTalksGetReducer: state.apiTalksGetReducer,
    apiTalksPatchReducer: state.apiTalksPatchReducer,
    apiTalksPostReducer: state.apiTalksPostReducer,
  };
};

export default connect(mapStateToProps)(TalkForm);
