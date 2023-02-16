const Contractor = require('../models/contractor');
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
  console.log(req.body);
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
    console.log(req.body);

    try {
        const contractor = await Contractor.findOne({email : req.body.email});

        console.log(contractor)

        if(!contractor){
            return res.status(401).json({err : 'User Not found! '});
        }
        contractor.comparePassword(req.body.pw, (err, isMatch) => {
            if(isMatch){
                const token = createJWT(contractor);
                res.json({token})
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
    signup,
    login
}