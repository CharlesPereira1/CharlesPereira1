import produce from 'immer';

const INITIAL_STATE = {
  search: '',
  filter: '',
  page: '',
  perPage: '',
  qtdResult: 0,
  plusPage: false,
  loading: false,
  totalCount: '',
  repos: [],
};
export default function repo(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@repo/REPO_REQUEST_SEARCH': {
        draft.loading = true;
        break;
      }

      // recupera dados do request (map)
      case '@repo/REPO_SEARCH_SUCCESS': {
        draft.repos = action.payload.data.items;
        draft.search = action.payload.search;
        draft.filter = action.payload.filter;
        draft.page = action.payload.page;
        draft.perPage = action.payload.perPage;
        draft.totalCount = action.payload.data.total_count;
        draft.loading = false;
        break;
      }

      case '@repo/REPO_REQUEST_NEXT_PAGE': {
        if (draft.page >= 1) {
          draft.plusPage = true;
        }
        break;
      }

      case '@repo/REPO_NEXT_PAGE_SUCCESS': {
        const newRepositories = [...draft.repos];
        newRepositories.push(...action.payload.data.items);

        draft.repos = newRepositories;
        draft.page = action.payload.page;
        draft.plusPage = false;
        break;
      }

      case '@repo/REPO_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
        return state;
    }
  });
}
