import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'FrontEnd-Challenge',
      storage,
      whitelist: ['repository', 'pullRequest'],
    },
    reducers
  );

  return persistedReducer;
};
