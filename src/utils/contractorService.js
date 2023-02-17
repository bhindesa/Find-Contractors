import tokenService from './tokenService';

const BASE_URL = 'http://localhost:3001/api/contractors/';

function getUser() {
  return tokenService.getContractorFromToken();
}

function logout() {
  tokenService.removeToken();
}

async function signupContractor(contractor) {
  try {
    console.log(contractor);
    console.log(JSON.stringify(contractor))
    const response = await fetch(BASE_URL + 'signup', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(contractor)
    });
    
    if(response.ok){
      const {token} = await response.json(); 
      // console.log('res data is contrac service login' + token);
      tokenService.setToken(token)
      return token;
    }
    else{
      console.log('Bad Credentials!');
      return null;
    }

  } catch (error) {
    throw new Error(error);
  }
}

async function login(creds) {
  // console.log(JSON.stringify(creds))
  // console.log('contrac service login func creds ')
  try {
    const response = await fetch(BASE_URL + 'login', {
                      method: 'POST',
                      headers: new Headers({'Content-Type': 'application/json'}),
                      body: JSON.stringify(creds)
                    });
    console.log(response);
    if(response.ok){
      const {token} = await response.json(); 
      // console.log('res data is contrac service login' + token);
      tokenService.setToken(token)
      return token;
    }
    else{
      console.log('Bad Credentials!');
      return null;
    }
    
  } 
  catch (error) {
    throw new Error('Bad Credentials!');
  }
}

export default {
  signupContractor, 
  getUser,
  logout,
  login,
}