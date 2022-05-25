//Dependencies
require('dotenv').config()
const PORT = process.env.PORT
const express = require('express')
const morgan = require('morgan')
const app = express()


//Routes
app.get('/', (req,res)=>{
    res.send("Hello World")
})

//Listener
app.listen(PORT, ()=>{
    console.log(`Listening on ${PORT}`)
})