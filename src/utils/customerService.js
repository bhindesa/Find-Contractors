import tokenService from './tokenService';

const BASE_URL = 'http://localhost:3001/api/customers/';


function getUser() {
  return tokenService.getCustomerFromToken();
}

function logout() {
  tokenService.removeToken();
}

async function signupCustomer(customer) {
  try {
    console.log(customer);
    console.log(JSON.stringify(customer))
    const response = await fetch(BASE_URL + 'signup', {
                  method: 'POST',
                  headers: new Headers({'Content-Type': 'application/json'}),
                  body: JSON.stringify(customer)
                });
              
    const {token} = await response.json();            
    tokenService.setToken(token);
    return token;
  } catch (error) {
    throw new Error(error);
  }
}

async function login(creds) {
  console.log('cust service login func creds' + creds)
  try {
    const response = await fetch(BASE_URL + 'login', {
                      method: 'POST',
                      headers: new Headers({'Content-Type': 'application/json'}),
                      body: JSON.stringify(creds)
                    });
    
    if(response.ok){
      const {token} = await response.json(); 
      console.log('res data is cust service login' + token);
      tokenService.setToken(token)
      return token;
    }
    else{
      console.log('Bad Credentials!');
      return null;
    }
    
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