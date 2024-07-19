import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './index'
import loginReducer from './loginindex'

const rootReducer = combineReducers({
  userData: userReducer,
  loginData:loginReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
