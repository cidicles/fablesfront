export function truncate(str, len) {
  return str.length > len ? `${str.substring(0,len)}...` : str;
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState == null){
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch(err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write error
  }
}


export const goFetch = (method, url, postData, jwt) => {

  let settings = {
    method,
    credentials: 'omit',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  if(postData){
    settings.body = JSON.stringify(postData);
  }

  if(jwt){
    settings.headers['Authorization'] = `Bearer ${jwt}`;
  }

  return fetch(url, settings).then(response => {
    if(response.status === 401){
      return Object.assign({ error: { message: 'You must be signed in to perform this action.' }})
    }
    return response.json().then(json => {
      return response.ok ? json : Object.assign({ error: json });
    });
  });
}
