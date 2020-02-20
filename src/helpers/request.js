import authStore from '../stores/auth';

let token = '';

authStore.subscribe(({ token: authToken }) => {
  token = authToken
});

const getUrl = (url) => /^https?:\/\//.test(url) ? url : `${process.env.ROOT_URL}${url}`;

export const parseBody = (response) => response.json();

export const checkStatus = (response) => {
  if (response.status > 299 || response.status < 200) {
    throw new Error(response.status);
  }

  return response;
};

export const makeRequest = (url, body, options = {}) => {
  const method = options.method || 'GET';
  const headers = options.headers || new Headers();

  headers.set('Content-Type', 'application/json');
  headers.set('token', token);

  return fetch(
    getUrl(url),
    {
      method,
      headers,
      body: JSON.stringify(body),
    }
  )
    .then(checkStatus);
};

export const makeParsedRequest = (url, body, options = {}) => {
  const method = options.method || 'GET';
  const headers = options.headers || new Headers();

  return makeRequest(getUrl(url), body, { method, headers })
    .then(parseBody);
};

export const buildQueryParams = (queryParams = []) => {
  let queryParamsString = '';

  if (queryParams.length) {
    let queryParamsValues = queryParams.map(({ label, value }) => (label.trim() && value.trim()) ? `${label}=${value}` : '');

    queryParamsValues = queryParamsValues.filter((queryParam) => queryParam);
    queryParamsString = `?${queryParamsValues.join('&')}`;
  }

  return queryParamsString;
};
