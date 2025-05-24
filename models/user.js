const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: [true, 'Please enter your full name']
    },
    email : {
        type : String,
        required : [true, 'Please enter an email'],
        unique : true,
        lowercase : true,
        validate: {
    validator: function(email) {
      // Check if it's a valid email AND ends with @iut-dhaka.edu
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email) && email.endsWith('@iut-dhaka.edu');
    },
    message: 'Email must be a valid @iut-dhaka.edu address'
  }
    },

    password : {
        type : String,
        required: [true, 'Please enter an password'],
        minlength : [6, 'Minimum length is 6']
    },
    department: {
    type: String,
    default: '' // optional field, can be empty string
  },
  program: {
    type: String,
    default: '' // optional field, can be empty string
  },
  year: {
    type: String,
    default: '' // optional field, e.g. "3rd"
  },
  number: {
    type: String,
    default: '' // optional field
  },
  address: {
    type: String,
    default: '' // optional field
  },
  fullname:{
    type: String,
    default: '' // optional field
  },
  username:{
    type: String,
    default: '' // optional field
  },


})

//fire a function after doc saved to db

userSchema.post('save',function(doc,next){
    console.log('new user created and saved', doc)
    next()
})

//fire a function before doc saved to db
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {  // Only hash if password is new/modified
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});



//static method to login

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email})
    if(user){
       const auth = await bcrypt.compare(password, user.password)
       if(auth){
        return user
       }
       throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

const User = mongoose.model('user', userSchema)

module.exports = User