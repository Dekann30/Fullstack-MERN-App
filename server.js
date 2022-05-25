//Dependencies
require('dotenv').config()
//const {PORT = 3000, DATABSE_URL} = process.env
const PORT = process.env.PORT //would not need const PORT and gets rid of process.env on database_url
const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose= require('mongoose')
const cors = require('cors')

//Database Connection
mongoose.connect(process.env.DATABASE_URL)

mongoose.connection
    .on('open', ()=>console.log('Mongo is connected'))
    .on('close', ()=> console.log('Mongo is disconnected'))
    .on('error', (err)=> console.log(err))

//Model
const PeopleSchema= new mongoose.Schema({
    name: String,
    image: String,
    title: String,
})

const People = mongoose.model('People', PeopleSchema)

//Middleware
app.use(express.json()) //same as body parser npm package
app.use(cors())
app.use(morgan('tiny'))

//Routes
app.get('/', (req,res)=>{
    res.send("Hello World")
})

//IDUCS

//Index
app.get('/people', async (req, res)=>{
    try{
        let response = await People.find({})
        res.json(response) //this sytax is juust a little bit slower thanone used for create
    } catch (err) {
        res.status(400).json(err)
    }
})

//Delete
app.delete('/people/:id', async(req,res)=>{
    try{
        res.json(await People.findByIdAndDelete(req.params.id))
    }catch(err){
        res.status(400).json(err)
    }
})

//Update 
app.put('/people/:id', async(req,res)=>{
    try{
        res.json(await People.findByIdAndUpdate(req.params.id, req.body, {new:true}))
    }catch(err){
        res.status(400).json(err)
    }
})

//create
app.post('/people', async (req, res)=>{
    try{
        res.json(await People.create(req.body))
    } catch(error){
        res.status(400).json(error)
    }
})

//Show
app.get('/people/:id', async(req,res)=>{
    try{
        res.json(await People.findById(req.params.id))
    } catch(error){
        res.status(400).json(error)
    }
})

//Listener
app.listen(PORT, ()=>{
    console.log(`Listening on ${PORT}`)
})