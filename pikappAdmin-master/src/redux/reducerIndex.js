import { combineReducers } from 'redux';
import AppStore from './Apps/AppStore';


const rootReducer = combineReducers({
  AppStore: AppStore
});

export default rootReducer;
