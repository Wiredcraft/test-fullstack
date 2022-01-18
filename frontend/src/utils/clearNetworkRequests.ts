import {IAppState} from 'src/interfaces/IRootState';
import {api} from '../actions';

/**
  * Trigger action which reset state for login and register actions.
  * @param {IAppState} props - Application state
 */
const clearNetworkRequests = (props: IAppState): void => {
  props.dispatch(api.authentication.login.apiLoginUserResetAction());
  props.dispatch(api.authentication.register.apiRegisterUserResetAction());
};

export default clearNetworkRequests;
