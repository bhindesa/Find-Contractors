// const Contractor = require('../models/contractor');
// const jwt = require('jsonwebtoken');

// const SECRET = process.env.SECRET;


// /*----- Helper Functions -----*/

// function createJWT(user) {
//     return jwt.sign(
//       {user}, // data payload
//       SECRET,
//       {expiresIn: '24h'}
//     );
// }


// async function signup(req, res) {
//     const customer = new Customer(req.body);
//     try {
//       await customer.save();
//       // Be sure to first delete data that should not be in the token
//       const token = createJWT(customer);
//       res.json({ token });
//     } catch (err) {
//       // Probably a duplicate email
//       res.status(400).json(err);
//     }
// }


// // async function login(req, res){
// //     try {
// //         const user = await User.findOne({email : req.body.email});
// //         console.log('login func ' + user)

// //         if(!user){
// //             return res.status(401).json({err : 'User Not found! '});
// //         }
// //         user.comparePassword(req.body.pw, (err, isMatch) => {
// //             if(isMatch){
// //                 const token = createJWT(user);
// //                 res.json({token})
// //             }
// //             else {
// //                 return res.status(401).json({err: 'bad password'});
// //             }
// //         });
// //       } catch (err) {
// //         // Probably a duplicate email
// //         res.status(400).json(err);
// //       }
// // }
// module.exports = {
//     signup,
//     login
// }