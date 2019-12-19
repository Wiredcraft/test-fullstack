import { connect } from 'react-redux';
import Login from '../../../components/Login';

const mapStateToProps = ({ talks }) => {
  return { talks };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: {
      onLogin: ({ username, password }) => {
        dispatch({ type: 'user/login', payload: { username, password } });
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
