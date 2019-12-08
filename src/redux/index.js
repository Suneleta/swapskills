import { combineReducers } from 'redux';

import userReducer from './reducers/userReducer';

const rootReducers = combineReducers({
  user: userReducer
})

export default rootReducers;