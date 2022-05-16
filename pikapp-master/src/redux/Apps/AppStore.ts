import {UserType} from '../../types/UserType';

// Action Types
export const SET_USER = 'SET_USER';
export const SET_LOGGED = 'SET_LOGGED';

// Action Creators
export const setUser = (user: UserType) => ({
  type: SET_USER,
  user,
});

export const setLogged = (value: boolean) => ({
  type: SET_LOGGED,
  value,
});

// reducer
const initialState = {
  user: <UserType>{
    email: '',
    password: '',
  },
  isLogged: false,
};

const AppStore = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case SET_LOGGED:
      return {
        ...state,
        isLogged: action.value,
      };
    default:
      return state;
  }
};

export default AppStore;
