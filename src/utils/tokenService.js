function setToken(token) {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
}

function getToken() {
  let token = localStorage.getItem('token');
  if (token) {
    // Check if expired, remove if it is
    const payload = JSON.parse(atob(token.split('.')[1]));
    // JWT's exp is expressed in seconds, not milliseconds, so convert
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem('token');
      token = null;
    }
  }
  return token;
}

function getCustomerFromToken() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split('.')[1])).customer : null;
}

function getContractorFromToken() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split('.')[1])).contractor : null;
}

function removeToken() {
  localStorage.removeItem('token');
  console.log("token removed")
}

export default {
  setToken,
  getToken,
  removeToken,
  getCustomerFromToken,
  getContractorFromToken
};