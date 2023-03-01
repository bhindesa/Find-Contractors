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


async function getOneContractor(contractor_id){
  // console.log(contractor_id)
  // console.log('Getting one Contractors - In (contractorService)\n');
  try {
      const response = await fetch(BASE_URL + `${contractor_id}`, {
          method: 'GET',
          headers: new Headers({'Content-Type': 'application/json'}),
      });
                    
      console.log(response)
      if(response.ok){
          const searchedOneContractor = await response.json(); 
          console.log(searchedOneContractor)
          return searchedOneContractor[0];
      }
      else{
          console.log('Couldn\'t fetch one contractor');
          return null;
      }
  } 
  catch (error) {
     throw new Error('Error while fetching one contractor');
  }
}

async function addReview(contractorReviewData){
  console.log('Review Data is ADD REVIEW Contractor');
  console.log(contractorReviewData);
  try {
      const response = await fetch(BASE_URL + 'addReview', {
          method: 'POST',
          headers: new Headers({'Content-Type': 'application/json'}),
          body: JSON.stringify(contractorReviewData)
      });
                    
      console.log(response)
      if(response.ok){
          const updatedContractorReviewsData = await response.json(); 
          console.log(updatedContractorReviewsData)
          return updatedContractorReviewsData;
      }
      else{
          console.log('Couldn\'t add contractor reviews');
          return null;
      }
  } 
  catch (error) {
     throw new Error('Error while adding reviews to contractor');
  }

}

async function updateContractor(updatedContractorData){
  console.log(JSON.stringify(updatedContractorData))
  try {
      const response = await fetch(BASE_URL + 'updateContractor', {
          method: 'PUT',
          headers: new Headers({'Content-Type': 'application/json'}),
          body: JSON.stringify(updatedContractorData)
      });
                    
      console.log(response)
      if(response.ok){
          const updatedContractor = await response.json(); 
          return updatedContractor;
      }
      else{
          console.log('Contractor Data not updated');
          return null;
      }
  } 
  catch (error) {
     throw new Error('Error while updating Data');
  }
}

async function deleteContractor(deletingContractorData){
  console.log(JSON.stringify(deletingContractorData))
  try {
      const response = await fetch(BASE_URL + 'deleteContractor', {
          method: 'DELETE',
          headers: new Headers({'Content-Type': 'application/json'}),
          body: JSON.stringify(deletingContractorData)
      });
                    
      console.log(response)
      if(response.ok){
          const deletedContractor = await response.json(); 
          return deletedContractor;
      }
      else{
          console.log('Data not updated');
          return null;
      }
  } 
  catch (error) {
     throw new Error('Error while updating Data');
  }
}

export default {
  signupContractor, 
  getUser,
  logout,
  login,
  addReview,
  getOneContractor,
  updateContractor,
  deleteContractor
}