const Contractor = require('../models/contractor');
const Service = require('../models/service');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

function createJWT(contractor) {
    return jwt.sign(
      {contractor}, // data payload
      SECRET,
      {expiresIn: '24h'}
    );
}


async function signup(req, res) {
  // console.log(req.body);
    const contractor = new Contractor(req.body);
    console.log(contractor)
    try {
      await contractor.save();
      // Be sure to first delete data that should not be in the token
      const token = createJWT(contractor);
      res.json({ token });
    } catch (err) {
      res.status(400).json(err);
    }
}


async function login(req, res){

    try {
        const contractor = await Contractor.findOne({email : req.body.email});
        if(!contractor){
            return res.status(401).json({err : 'User Not found! '});
        }
        contractor.comparePassword(req.body.pw, (err, isMatch) => {
            if(isMatch){
                const token = createJWT(contractor);
                res.json({token});
            }
            else {
                return res.status(401).json({err: 'bad password'});
            }
        });
      } catch (err) {
        res.status(400).json(err);
      }
}



async function getOneContractor(req, res){
  console.log('In get one func contrl \n')
  console.log(req.params.contractor_id)
  try {
      // const serviceSearched = 
      Contractor.find({_id : req.params.contractor_id})
      .populate(['services','customer_ids'])
      .exec(function(err, contractorSearched){
          if(contractorSearched){
              res.status(200).json(contractorSearched);
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

async function addContractorReview(req, res){
  // console.log('Backend Update FUnc Contractor \n')
  console.log(req.body)
  // const updatingService = await Service.findById(req.body.service_id);
  try {
      Contractor.findById(req.body._id)
      .populate(['services', 'customer_ids'])
      .exec(async function(err, constractorSearched){
          if(constractorSearched){
              for (let key in req.body) {
                  if(key === 'customer_ids' || key === 'reviews' || key === 'stars' || key === 'services'){
                    constractorSearched[key].push(req.body[key])
                  }
                  else{
                    constractorSearched[key] = req.body[key];
                  }
              }
              await constractorSearched.save();
              res.json(constractorSearched);
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

async function updateContractor(req, res){
  console.log(req.body)
  console.log('Backend Update FUnc')
  try {

      Contractor.findOneAndUpdate(
          { _id: req.body.contractor_Id }, 
          { $set: {
              email: req.body.email,
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              dob: req.body.dob,
              address: req.body.address,
              phone: req.body.phone,
              companyName: req.body.companyName,
              companyLicenseNumber: req.body.companyLicenseNumber,
              companyRegisterYear: req.body.companyRegisterYear
              }
          },  // update object
          { new: true }  // this will make sure new updated document is sent back
      ).populate(['customer_ids', 'contractor_id'])
      .exec((err, updatedContractor) => {
          if (err) {
              console.error(err);
          } else {
              if(updatedContractor){
                  res.json(updatedContractor);
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

async function deleteContractor(req, res){
  console.log(req.body.contractor_Id)

  try {
      await Service.deleteMany({ contractor_id : req.body.contractor_Id });
      const deletedContractor = await Contractor.findOneAndDelete({ _id: req.body.contractor_Id });
      if(deletedContractor) {
        console.log("Successfully deleted contractor and related services");
        console.log(deletedContractor);
        return res.status(200).json(deletedContractor);
      }
      else{
        res.status(404).json({err : "Could not find Contractor"});
      }
  }
  catch (err) {
    res.status(400).json(err);
  }
}


module.exports = {
    signup,
    login,
    getOneContractor,
    addContractorReview,
    updateContractor,
    deleteContractor
}