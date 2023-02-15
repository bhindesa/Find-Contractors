const Customer = require('../models/customer');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

function createJWT(customer) {
    
    const newJSONWebToken = jwt.sign(
      {customer}, // data payload
      SECRET,
      {expiresIn: '24h'}
    );
    // console.log(newJSONWebToken)
    return newJSONWebToken;

}

// function puppyList(req, res){
//     Puppy.find()
//     .then((puppies) => {
//         res.status(200).json(puppies);
//     })
// }


// function searchPuppy(req, res){
//     console.log(req.params.searchItem)
//     res.status(200).json(req.params.searchItem);
// }

async function createCustomer(req, res){
    console.log(req.body)
    const customer = new Customer(req.body);

    try {
        customer.save(function(){
            console.log('customer Saved')
            // Be sure to first delete data that should not be in the token
            const token = createJWT(customer);
            console.log(token)
        
            res.json(token);
        });
        
    } catch (err) {
      // Probably a duplicate email
      res.status(400).json(err);
    }
}

async function login(req, res){
        try {
            const customer = await Customer.findOne({email : req.body.email});
            console.log('login func ' + customer)
    
            if(!customer){
                return res.status(401).json({err : 'User Not found! '});
            }
           customer.comparePassword(req.body.pw, (err, isMatch) => {
                if(isMatch){
                    const token = createJWT(customer);
                    res.json(token)
                }
                else {
                    return res.status(401).json({err: 'bad password'});
                }
            });
          } catch (err) {
            // Probably a duplicate email
            res.status(400).json(err);
          }
    }
module.exports = {
    createCustomer,
    login
}