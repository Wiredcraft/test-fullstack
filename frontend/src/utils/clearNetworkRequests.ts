import {IAppState} from 'src/interfaces/IRootState';
import {api} from '../actions';

const clearNetworkRequests = (props: IAppState) => {
  props.dispatch(api.authentication.login.apiLoginUserResetAction());
  props.dispatch(api.authentication.register.apiRegisterUserResetAction());
};

export default clearNetworkRequests;
