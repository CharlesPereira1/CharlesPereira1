import produce from 'immer';

const INITIAL_STATE = {
  pullrepo: [],
  repository: {},
  loading: false,
}

export default function pullRepos(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@repo/REPO_SEARCH_SUCCESS': {
        draft.pullrepo = action.payload.data.full_name;
        draft.loading = false;
        break;
      }

      default:
        return state;
    }
  })
}
