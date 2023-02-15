import tokenService from './tokenService';

const BASE_URL = 'http://localhost:3001/api/customers/';

async function signupCustomer(customer) {
  try {
    const response = await fetch(BASE_URL + 'signup', {
                  method: 'POST',
                  headers: new Headers({'Content-Type': 'application/json'}),
                  body: JSON.stringify(customer)
                });
              
    const data = await response.json();            
    const token = tokenService.setToken(data);
    return token;
  } catch (error) {
    throw new Error(error);
  }
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

async function login(creds) {
  console.log(creds)
  try {
    const response = fetch(BASE_URL + 'login', {
                      method: 'POST',
                      headers: new Headers({'Content-Type': 'application/json'}),
                      body: JSON.stringify(creds)
                    });
    
    const data = await response.json(); 
    console.log(data)
           
    const token = tokenService.setToken(data)
    return token;
  } catch (error) {
    throw new Error('Bad Credentials!');
  }
  
  
}

export default {
  signupCustomer, 
  getUser,
  logout,
  login
}