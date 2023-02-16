const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

// function getDefaultDOB() {
//     const date = new Date();
//     date.setFullYear(date.getFullYear() - 18); // set the year to 18 years ago
//     const customDateObject = new Date(date.getFullYear(),
//                                             date.getMonth(),
//                                             date.getDate(),
//                                             date.getHours(),
//                                             date.getMinutes(),
//                                             date.getSeconds()
//                                             )
//     return customDateObject;
//   }


const customerSchema = new mongoose.Schema({
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
        required: true,
        // validate: {
        //     validator: function(value) {  
        //         // const dateValue = new Date(value);
        //         console.log(value.getTime() < getDefaultDOB().getTime())
        //       return value.getTime() < getDefaultDOB().getTime();
        //     },
        //     message: props => `${props.value} is not valid, must be 18 years old to signup.`
        // }
    },
    address: {
        type: String, required: true
    },
    phone: {
        type: Number, required: true
    }
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
