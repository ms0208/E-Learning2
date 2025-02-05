import dotenv from 'dotenv'
dotenv.config() // to availabe from .env file.
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/connectiondb.js';
import userRoutes from './routes/userroutes.js'
const app = express()

const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

app.use(cors())
app.use(bodyParser.json())
connectDB(DATABASE_URL)

app.use(express.json())

// Load routes

app.use("/api/user", userRoutes);
app.listen(port, ()=>{
    console.log(`Server is listening at http://127.0.0.1:${port}`)
})