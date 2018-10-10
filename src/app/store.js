import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { combineReducers } from 'redux';

import authentication from './login/authentication.reducer';
import registration from './login/registration.reducer';
import users from './login/users.reducer';
import alert from './login/alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert
});
const loggerMiddleware = createLogger()

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
)

export default store