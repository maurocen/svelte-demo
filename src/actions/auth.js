import { updateStore } from '../stores/auth';
import { makeParsedRequest } from '../helpers/request';

export const setAuth = ({ username, token, admin = false }) => {
  localStorage.setItem('username', username);
  localStorage.setItem('token', token);
  updateStore({ username, token, admin });
}

export const logout = () => {
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  updateStore({ username: null, token: null});
};

export const login = async (username, password) => {
  updateStore({ authenticating: true });
  try {
    const response = await makeParsedRequest(
      '/auth/login',
      {
         username,
         password
      },
      {
        method: 'POST',
      },
    );

    setAuth(response);
  } catch (error) {
    updateStore({ error });
  } finally {
    updateStore({ authenticating: false });
  }
}

export const loginToken = async () => {
  updateStore({ authenticating: true });

  try {
    const response = await makeParsedRequest('/auth/profile');
    setAuth(response);
  } catch (error) {
    updateStore({ error });
  } finally {
    updateStore({ authenticating: false });
  }
}
