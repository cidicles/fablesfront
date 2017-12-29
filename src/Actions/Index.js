export const CHANGE_LANG = 'CHANGE_LANG';
export const CHANGE_ACTIVEVID = 'CHANGE_ACTIVEVID';
export const CHANGE_POSTS = 'CHANGE_POSTS';
export const CHANGE_POST = 'CHANGE_POST';
export const CHANGE_USER = 'CHANGE_USER';

export function changeLanguage(lang) {
  return {
    type: CHANGE_LANG,
    lang
  }
}

export function changeActiveVid(activeVid) {
  return {
    type: CHANGE_ACTIVEVID,
    activeVid
  }
}

export function changePosts(posts) {
  return {
    type: CHANGE_POSTS,
    posts
  }
}

export function changePost(post) {
  return {
    type: CHANGE_POST,
    post
  }
}

export function changeUser(user) {
  return {
    type: CHANGE_USER,
    user
  }
}
