import * as actions from './auth-actions';

export interface State  {
    token: string,
    authenticated: boolean
}

const initialState: State = {
    token: null,
    authenticated: false
}

export function authReducer(state = initialState, action : actions.AuthActions) {
    switch(action.type) {
        case actions.SIGNUP:
            return {
                ...state,
                authenticated: true
            }
        case actions.SIGNIN:
            return {
                ...state,
                authenticated: true
            }
        case actions.LOGOUT:
            return {
                ...state,
                authenticated : false,
                token: null
            };
        case actions.SET_TOKEN:
            return {
                ...state,
                authenticated : true,
                token: action.payload
            };
        default:
            return state;
    }
}