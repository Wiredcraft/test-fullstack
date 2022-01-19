import {IAPIAuthState, IAPITalksState} from './IAPI';
import {AppDispatch} from '../store';
import {IUserState} from './IUser';

export interface IAppState {
    apiLoginUserReducer: IAPIAuthState;
    apiRegisterUserReducer: IAPIAuthState;
    userReducer: IUserState;
    dispatch: AppDispatch;
    apiTalksDeleteReducer: IAPIAuthState;
    apiTalksGetReducer: IAPIAuthState;
    apiTalksListReducer: IAPITalksState;
    apiTalksPatchReducer: IAPIAuthState;
    apiTalksPostReducer: IAPIAuthState;
    apiTalksVoteReducer: IAPIAuthState;
}

export interface IOwnProps {
    dispatch?: AppDispatch;
}

export interface IRootState {
    state: IAppState;
}

