require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const taskRoutes = require('./routes/tasks')
const userRoutes = require('./routes/user')
const cors = require('cors'); // Import the cors package
const PORT = process.env.PORT || 4000

// clear    To clear the terminal
// cancle process in terminal : ctrl + c

// npm install dotenv
// npm install -g nodemon     *ONLY ONCE*
// in shell : Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
//  nodemon server.js            ---- dynamic node change

// cd backend
// OR just do (after installing nodemon) : npm run dev


// fire up the express app
const app = express()

app.use(
    cors({
      origin: ["http://localhost:4000", "https://taskbuddy.onrender.com"],
    })
  );  

// middleware
app.use(express.json()) // parse and attach to the req object

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/tasks', taskRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) =>{
        console.log(error)
    })


// get the .env file
process.env