export const getToken = () => {
  return localStorage.getItem('apisco_token');
};

export const setToken = (token) => {
  localStorage.setItem('apisco_token', token);
};

export const removeToken = () => {
  localStorage.removeItem('apisco_token');
};

export const isAuthenticated = () => {
  return !!getToken();
};