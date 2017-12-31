import { lang } from '../il8n/lang';
import { loadState } from '../utils';

const initialState = loadState() || {
  lang: lang.getLanguage(),
  activeVid: lang.videos.videos[0][0],
  posts: {},
  post: {},
  user: {},
  localState: {
    count: 0
  }
};

const mainReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_LANG':
      lang.setLanguage(action.lang);
      return Object.assign({}, state, {
        lang: action.lang
      });
    case 'CHANGE_ACTIVEVID':
      return Object.assign({}, state, {
        activeVid: action.activeVid
      });
    case 'CHANGE_POSTS':
      return Object.assign({}, state, {
        posts: action.posts
      });
    case 'CHANGE_POST':
      return Object.assign({}, state, {
        post: action.post
      });
    case 'CHANGE_USER':
      return Object.assign({}, state, {
        user: action.user
      });
    case 'CHANGE_LOCALSTATE':
      return Object.assign({}, state, {
        localState: action.localState
      });
    default:
      return initialState;
  }
};

export default mainReducer;
