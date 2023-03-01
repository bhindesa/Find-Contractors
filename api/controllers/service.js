const Service = require('../models/service');
const Contractor = require('../models/contractor');

async function addService(req, res){
    console.log(req.body.category)
    const newlyAddedService = new Service(req.body);
    try {
        newlyAddedService.contractor_id = req.body.contractor_id;
        await newlyAddedService.save();
        const connectingContractor = await Contractor.findById(req.body.contractor_id);
        connectingContractor.services.push(newlyAddedService);
        await connectingContractor.save();
        res.status(200).json(newlyAddedService);
    }
    catch (err) {
      res.status(400).json(err);
    }
}

async function updateService(req, res){
    // console.log(req.body)
    try {
        Service.findOneAndUpdate(
            { _id: req.body.service_Id }, 
            { $set: {
                category: req.body.category,
                subCategory: req.body.subCategory,
                serviceDescription: req.body.serviceDescription,
                labourCharge: req.body.labourCharge,
                serviceTime: req.body.serviceTime
                }
            },  // update object
            { new: true }  // this will make sure new updated document is sent back
        ).populate(['customer_ids', 'contractor_id'])
        .exec((err, updatedService) => {
            if (err) {
                console.error(err);
            } else {
                if(updatedService){
                    res.status(200).json(updatedService);
                }
                else{
                    res.status(401).json(null);
                }
            }
        });
    }
    catch (err) {
      res.status(400).json(err);
    }
}

async function deleteService(req, res){
    console.log('service id in delete functoin : ' + req.body.service_Id)
    try {
        console.log('in try block')
        // const deletedService = await Service.findByIdAndDelete(req.body.service_Id, function(err) {
        //     if (err){
        //         console.log(err);
        //         return res.status(404).json(err);
        //     }
        //   });

        const deletedService = await Service.findOneAndDelete({ _id: req.body.service_Id });
        if (deletedService) {
            console.log("Successfully deleted service");
            console.log(deletedService);
            return res.status(200).json(deletedService);
        }
    }
    catch (err) {
        console.log(err)
      return res.status(400).json(err);
    }
}

async function getOneService(req, res){
    try {
        Service.find({_id : req.params.serviceId})
        .populate(['contractor_id','customer_ids'])
        .exec(function(err, serviceSearched){
            if(serviceSearched){
                res.status(200).json(serviceSearched);
            }
            else{
                res.status(401).json(null);
            }
        });
        
    }
    catch (err) {
      res.status(400).json(err);
    }
}

async function getAllServices(req, res){
    // console.log('In get all func contrl')
    try {
        const allServices = await Service.find({}).populate('contractor_id');
        if(allServices.length > 0){
            res.status(200).json(allServices);
        }
        else{
            res.status(401).json(null);
        }
    }
    catch (err) {
      res.status(400).json(err);
    }
}

async function addServiceReview(req, res){
    // console.log('Backend Update FUnc Contractor \n')
    console.log(req.body)
    // const updatingService = await Service.findById(req.body.service_id);
    try {
        Service.findById(req.body.service_id)
        .populate(['customer_ids'])
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
                res.status(200).json(serviceSearched);
            }
            else{
                res.status(401).json(null);
            }
        });
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
    getAllServices,
    addServiceReview
}