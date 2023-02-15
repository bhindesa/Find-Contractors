const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const customerSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {type: String, required: true, lowercase: true, unique: true},
    password: String
}, {
  timestamps: true
})

customerSchema.set('toJSON', {
    // remove the password property when serializing doc to JSON
    transform : function(doc, ret){
        delete ret.password;
        return ret;
    }
})

customerSchema.pre('save', function(next){
    // this will be set to the current document
    const customer = this;
    if(!customer.isModified('password')) 
        return next();
        // password has been changed - salt and hash it    
        bcrypt.hash(customer.password, SALT_ROUNDS, function(err, hash){
        if(err)
            return next(err);
        customer.password = hash;
        next();
    });
});

customerSchema.methods.comparePassword = function(tryPassword, cb){
    bcrypt.compare(tryPassword, this.password, cb);
}

module.exports = mongoose.model('Customer', customerSchema);
