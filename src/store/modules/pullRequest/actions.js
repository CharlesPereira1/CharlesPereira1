import { dispatch } from 'redux'

export function searchPullRequest(create, repository) {
  return {
    type: '@pull/SEARCH_PULL_REQUEST',
    payload: { create, repository },
  };
}

export function searchPullRequestSuccess(create, repository) {
  return {
    type: '@pull/SEARCH_PULL_REQUEST_SUCCESS',
    payload: { create, repository },
  };
}

export function pullRequestFailure() {
  return {
    type: '@pull/PULL_REQUEST_FAILURE',
  };
}
