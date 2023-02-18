const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const { Schema } = mongoose;

const contractorSchema = new Schema({
  email: {
    type: String, required: true, lowercase: true, unique: true
  },
  password: {
      type: String, required: true
  },
  firstname: {
      type: String, required: true
  },
  lastname: {
      type: String, required: true
  },
  dob: {
      type: Date,
      required: true
  },
  address: {
      type: String, required: true
  },
  phone: {
      type: Number, required: true
  },
  companyLicenseNumber: {
    type: String, required: true
  },
  companyName: {
    type: String, required: true
  },
  companyRegisterYear: {
    type: String, required: true
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    }
  ],
  customer_ids:[
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Customer'
      }
  ],
  reviews: [String],
  stars: [ Number]
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

contractorSchema.methods.comparePassword = function(tryPassword, cb){
  bcrypt.compare(tryPassword, this.password, cb);
}

module.exports = mongoose.model('Contractor', contractorSchema);
