/* eslint-disable no-unused-vars */
import { all, takeLatest, call, put, delay } from 'redux-saga/effects';

import api from '~/services/api';

import { repoSearchSuccess, repoFailure, repoNextPageSuccess } from './actions';

export function* searchinRepo({ payload }) {
  try {
    // cria os parametros a serem passados para o action
    const { search = 'javascript', page, filter, perPage } = payload.data;

    // define os parametros no link da api
    const res = yield call(api.get, 'search/repositories', {
      params: {
        q: search,
        sort: filter || 'stars', // 'stars',
        page,
        per_page: perPage,
        order: 'desc',
      },
    });
    // delay de 2ms
    yield delay(2000);

    // const filterActual = filter;
    const repos = res.data;

    // passa os parametros para o action vindos no repository.js
    yield put(repoSearchSuccess(repos, search, filter, page, perPage));
  } catch (error) {
    yield put(repoFailure());
  }
}
export function* searchInSearch({ payload }) {
  try {
    // cria os parametros a serem passados para o action
    const { search, page, filter, perPage } = payload.data;

    // define os parametros no link da api
    const res = yield call(api.get, 'search/repositories', {
      params: {
        q: search,
        sort: filter || 'stars', // 'stars',
        page,
        per_page: perPage,
        order: 'desc',
      },
    });
    // delay de 2ms
    yield delay(1000);

    // const filterActual = filter;
    const repos = res.data;
    yield put(repoNextPageSuccess(repos, page, filter, perPage));
  } catch (error) {
    yield put(repoFailure());
  }
}

export default all([
  takeLatest('@repo/REPO_REQUEST_SEARCH', searchinRepo),
  takeLatest('@repo/REPO_REQUEST_NEXT_PAGE', searchInSearch),
]);
