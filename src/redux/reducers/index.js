import { combineReducers } from 'redux';

import discoReducer from './discoReducer';

const reducers = combineReducers({
  discoState: discoReducer
})

export default reducers;