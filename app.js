const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const requireAuth = require('./middleware/authMiddleware')
const app = express()


// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://yellowflickerbeat:yellowflickerbeat@mernapp.fryhs1l.mongodb.net/?retryWrites=true&w=majority&appName=MERNapp'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', requireAuth.checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/market', requireAuth.requireAuth, (req, res) => res.render('market'))

app.use(authRoutes);