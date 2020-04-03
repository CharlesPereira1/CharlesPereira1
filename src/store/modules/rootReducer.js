import { combineReducers } from 'redux';

// import pullrequest from './pullRequest/reducer';
import repository from './repository/reducer';

export default combineReducers({
  repository,
});
