// faz requisição na API
export function repoRequestSearch(data, search, filter, page, perPage) {
  return {
    type: '@repo/REPO_REQUEST_SEARCH',
    payload: { data, search, filter, page, perPage },
  };
}

// Mostra em tela
export function repoSearchSuccess(data, search, filter, page, perPage) {
  return {
    type: '@repo/REPO_SEARCH_SUCCESS',
    payload: { data, search, filter, page, perPage },
  };
}

export function repoRequestNextPage(data, page, filter, perPage) {
  return {
    type: '@repo/REPO_REQUEST_NEXT_PAGE',
    payload: { data, page, filter, perPage },
  };
}

export function repoNextPageSuccess(data, page, filter, perPage) {
  return {
    type: '@repo/REPO_NEXT_PAGE_SUCCESS',
    payload: { data, page, filter, perPage },
  };
}

export function repoFailure() {
  return {
    type: '@repo/REPO_FAILURE',
  };
}
