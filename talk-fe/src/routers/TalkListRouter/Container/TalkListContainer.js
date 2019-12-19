import { connect } from 'react-redux';
import TalkList from '../../../components/TalkList';

const mapStateToProps = ({ talks }) => {
  return { talks };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: {
      onLike: id => {
        dispatch({ type: 'talks/like', payload: { id } });
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TalkList);
