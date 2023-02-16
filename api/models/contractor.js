const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const { Schema } = mongoose;

const contractorSchema = new Schema({
  firstname: String,
  lastname: String,
  email: {type: String, required: true, lowercase: true, unique: true},
  password: String,
  companyLicenseNumber: String,
  companyName: String,
  companyRegisterYear: String
}, {
timestamps: true
});

contractorSchema.set('toJSON', {
  // remove the password property when serializing doc to JSON
  transform : function(doc, ret){
      delete ret.password;
      return ret;
  }
})

contractorSchema.pre('save', function(next){
  // this will be set to the current document
  const contractor = this;
  if(!contractor.isModified('password')) 
      return next();
      // password has been changed - salt and hash it    
      bcrypt.hash(contractor.password, SALT_ROUNDS, function(err, hash){
      if(err)
        return next(err);
      contractor.password = hash;
      next();
  });
});

module.exports = mongoose.model('Contractor', contractorSchema);
