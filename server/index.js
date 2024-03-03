import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import todomodel from './model/model.js'


const app = express();

app.use(cors())
app.use(express.json())

const mongo_url = "mongodb+srv://harsh:harsh_2003@cluster0.7uaxwx8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

async function db(){
    try {
        await mongoose.connect(mongo_url)
        console.log("database connected successfully")
    } catch (error) {
        console.log(error)
    }
}

db()

app.get('/' , (req,res)=>{
    res.json('helloo this is server side ')
})

// create route
app.post('/create' ,async (req,res)=>{
    const {todo} = req.body
    try {
       const mytodo =  await todomodel.create({todo})
        console.log("created successfully")
        res.json(mytodo)
    } catch (error) {
        console.log(error)
    }
})


// get-all route
app.get('/gettodo' , async(req , res)=>{
try {
    const alltodo = await todomodel.find()
    res.json(alltodo);
} catch (error) {
    console.log(error)
}
})


// delete route
app.delete('/delete/:id',async(req,res)=>{
    const {id} = req.params
    try {
        await todomodel.findByIdAndDelete(id);
        res.json('Deleted successfully');
    } catch (error) {
        console.log(error);
    }
})

// update route
app.put('/update/:id', async(req,res)=>{
    const {id} = req.params
    const {todo} = req.body
    try {
        await todomodel.findByIdAndUpdate(id,{todo})
        res.json('updated dude')
    } catch (error) {
        console.log(error)
    }
})

const port = 4000;

app.listen(port , ()=>{
    console.log("server is running")
})
