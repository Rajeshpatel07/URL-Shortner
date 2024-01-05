import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config('./links.js');

mongoose.connect( process.env.DBURI )

const linkSchema = new mongoose.Schema({
    URL: {
        type: String,
        required: true
    },
    short: {
        type: String,
        unique: true
    }
})

const db=new mongoose.model("url",linkSchema)

export default db