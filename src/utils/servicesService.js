const BASE_URL = 'http://localhost:3001/api/services/';

async function addService(serviceData){
    console.log(JSON.stringify(serviceData))
    try {
        const response = await fetch(BASE_URL + 'addService', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(serviceData)
        });
                      
        console.log(response)
        if(response.ok){
            const newServiceAdded = await response.json(); 
            return newServiceAdded;
        }
        else{
            console.log('Not Data saved');
            return null;
        }
    } 
    catch (error) {
       throw new Error('Error while Saving Data');
    }
}

async function updateService(updatedServiceData){
    console.log(JSON.stringify(updatedServiceData))
    try {
        const response = await fetch(BASE_URL + 'updateService', {
            method: 'PUT',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(updatedServiceData)
        });
                      
        console.log(response)
        if(response.ok){
            const updatedService = await response.json(); 
            return updatedService;
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

async function deleteService(deletingServiceData){
    console.log(JSON.stringify(deletingServiceData))
    try {
        const response = await fetch(BASE_URL + 'deleteService', {
            method: 'DELETE',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(deletingServiceData)
        });
                      
        console.log(response)
        if(response.ok){
            const deletedService = await response.json(); 
            return deletedService;
        }
        else{
            console.log('Data not deleted');
            return null;
        }
    } 
    catch (error) {
       throw new Error('Error while updating Data');
    }
}

async function getOneService(serviceId){
    console.log('Getting one services - In (ServicesService)\n');
    try {
        const response = await fetch(BASE_URL + `${serviceId}`, {
            method: 'GET',
            headers: new Headers({'Content-Type': 'application/json'}),
        });
                      
        console.log(response)
        if(response.ok){
            const searchedOneService = await response.json(); 
            console.log(searchedOneService[0])
            return searchedOneService[0];
        }
        else{
            console.log('Couldn\'t fetch one service');
            return null;
        }
    } 
    catch (error) {
       throw new Error('Error while fetching one service');
    }
}

async function getAllServices(){
    console.log('Getting all services');
    try {
        const response = await fetch(BASE_URL + 'all', {
            method: 'GET',
            headers: new Headers({'Content-Type': 'application/json'}),
            // body: JSON.stringify()
        });
                      
        console.log(response)
        if(response.ok){
            const allServices = await response.json(); 
            console.log(allServices)
            return allServices;
        }
        else{
            console.log('Couldn\'t fetch all services');
            return null;
        }
    } 
    catch (error) {
       throw new Error('Error while fetching all services');
    }
}

async function addReview(reviewData){
    try {
        const response = await fetch(BASE_URL + 'addReview', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(reviewData)
        });
                      
        console.log(response)
        if(response.ok){
            const updatedServiceReviewData = await response.json(); 
            console.log(updatedServiceReviewData)
            return updatedServiceReviewData;
        }
        else{
            console.log('Couldn\'t add reviews');
            return null;
        }
    } 
    catch (error) {
       throw new Error('Error while adding reviews to service');
    }
}

export default {
  addService,
  updateService,
  deleteService,
  getOneService,
  getAllServices,
  addReview
}