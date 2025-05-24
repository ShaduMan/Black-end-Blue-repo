
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
  console.log(err.message, err.code);
  
  let errors = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    year: '',
    general: ''
  };

  // Custom messages for incorrect email/password login
  if (err.message === 'incorrect email') {
    errors.email = "Email not registered";
  }

  if (err.message === 'incorrect password') {
    errors.password = "Password is incorrect";
  }

  // Duplicate email error code from MongoDB
  if (err.code === 11000) {
    errors.email = 'Email already registered';
    return errors;
  }

  // Handle mongoose validation errors for schema fields
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  // Handle custom validation errors from your controller
  if (err.errors) {
    // If errors object contains keys like confirmPassword or general
    if (err.errors.confirmPassword) {
      errors.confirmPassword = err.errors.confirmPassword;
    }
    if (err.errors.general) {
      errors.general = err.errors.general;
    }
  }

  // If you manually passed a general error string in message
  if (err.message && !errors.email && !errors.password && !errors.name) {
    errors.general = err.message;
  }

  return errors;
};

const maxAge = 3*24*3600

const createToken = (id) =>{
    return jwt.sign({id}, 'secret msg', {
        expiresIn: maxAge
    })
}


const signup_get= (req,res)=>{
    res.render('signup')
}

const login_get= (req,res)=>{
    res.render('login')
}


const signup_post = async (req, res) => {
  const { name, email, password, confirmPassword, department, year } = req.body;

  // Basic validation example (you can improve or move to middleware)
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ errors: { general: 'Please fill all required fields' } });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ errors: { confirmPassword: 'Passwords do not match' } });
  }

  // You can also add email domain check here if you want:
  if (!email.endsWith('@iut-dhaka.edu')) {
    return res.status(400).json({ errors: { email: 'Email must be @iut-dhaka.edu' } });
  }

  try {
    // Create user with all fields
    const user = await User.create({ name, email, password, department, year });

    // Create token (assuming createToken is defined elsewhere)
    const token = createToken(user._id);

    // Set cookie
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

    // Respond with created user id
    res.status(201).json({ user: user._id });

  } catch (err) {
    const errors = handleErrors(err); // your existing error handling function
    res.status(400).json({ errors });
  }
}


const login_post= async(req,res)=>{

    const {email,password} = req.body
    // try{
    //     const user = await User.create({email, password})
    // }catch(err){

    // }
    // console.log(email,password)
    // res.send('user login')

    try{
        const user = await User.login(email,password)
        const token = createToken(user._id)
        
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})    
        res.status(200).json({user: user._id})
        
        
    }catch(err){
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }    
}


const logout_get= (req,res)=>{
    res.cookie('jwt', '', {maxAge : 1})
    res.redirect('/')
}


module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post,
    logout_get
}