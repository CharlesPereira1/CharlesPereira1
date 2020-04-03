import { all } from 'redux-saga/effects';

// import pullRequest from './pullRequest/sagas';
import repository from './repository/sagas';

export default function* rootSaga() {
  return yield all([repository]);
}
