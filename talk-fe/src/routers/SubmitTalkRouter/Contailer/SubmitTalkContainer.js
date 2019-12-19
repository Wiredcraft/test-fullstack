import { connect } from 'react-redux';
import SubmitTalk from '../../../components/SubmitTalk';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: {
      onCreate: ({ title, description }) => {
        dispatch({ type: 'talks/create', payload: { title, description } });
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitTalk);
