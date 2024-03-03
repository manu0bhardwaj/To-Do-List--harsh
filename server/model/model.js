import mongoose from "mongoose";

const todoschema = mongoose.Schema({
todo : String
})

const todomodel = mongoose.model('todo' , todoschema);

export default todomodel;