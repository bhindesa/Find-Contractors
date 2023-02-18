const Service = require('../models/service');

async function addService(req, res){
    console.log(req.body.category)
    const newlyAddedService = new Service(req.body);
    try {
        newlyAddedService.contractor_id = req.body.contractor_id;
        await newlyAddedService.save()
        res.json(newlyAddedService);
    }
    catch (err) {
      res.status(400).json(err);
    }
}

async function updateService(req, res){
    console.log('Backend Update FUnc')
    console.log(req.body)
    // const updatingService = await Service.findById(req.body.service_id);
    try {
        Service.findById(req.body.service_id)
        .populate(['customer_ids', 'contractor_id'])
        .exec(async function(err, serviceSearched){
            if(serviceSearched){
                for (let key in req.body) {
                    if(key === 'customer_ids' || key === 'reviews' || key === 'stars'){
                        serviceSearched[key].push(req.body[key])
                    }
                    else{
                        serviceSearched[key] = req.body[key];
                    }
                }
                await serviceSearched.save();
                res.json(serviceSearched);
            }
            else{
                res.json(null).status(401);
            }
        });
    }
    catch (err) {
      res.status(400).json(err);
    }
}

async function deleteService(req, res){
    // console.log(req.body.category)
    try {
        const deletedService = Service.findOneAndDelete({_id : req.body.contractor_id});
        res.json(deletedService);
    }
    catch (err) {
      res.status(400).json(err);
    }
}

async function getOneService(req, res){
    console.log('In get one func contrl \n')
    console.log(req.params.serviceId)

    try {
        // const serviceSearched = 
        Service.find({_id : req.params.serviceId})
        .populate('contractor_id')
        .exec(function(err, serviceSearched){
            if(serviceSearched){
                res.json(serviceSearched);
            }
            else{
                res.json(null).status(401);
            }
        });
        
    }
    catch (err) {
      res.status(400).json(err);
    }
}

async function getAllServices(req, res){
    console.log('In get all func contrl')
    try {
        const allServices = await Service.find({}).populate('contractor_id');
        if(allServices.length > 0){
            res.json(allServices);
        }
        else{
            res.json(null).status(401);
        }
    }
    catch (err) {
      res.status(400).json(err);
    }
}



module.exports = {
    addService,
    updateService,
    deleteService,
    getOneService,
    getAllServices
}