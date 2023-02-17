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
            method: 'POST',
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
            method: 'POST',
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
            return allServices;
        }
        else{
            console.log('Couldn\'t fetch all service');
            return null;
        }
    } 
    catch (error) {
       throw new Error('Error while updating Data');
    }
}

export default {
  addService,
  updateService,
  deleteService,
  getAllServices
}