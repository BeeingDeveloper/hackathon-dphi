const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5900




// SETUP MIDDLE---------------------------------------------------------------------------------------
app.use(cors());
app.use(express.json());
// ---------------------------------------------------------------------------------------------------





// DATABASE CONNECTION--------------------------------------------------------------------------------
const uri = process.env.ATLAS_URI;
mongoose.set('strictQuery', false)

mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true});

mongoose.connection.once('open', ()=>{
    console.log('Connection to MongoDB established...');
});
// ---------------------------------------------------------------------------------------------------




//ROUTES----------------------------------------------------------------------------------------------
const userRouter = require('./routes/userRouter');
app.use('/api/user/', userRouter)

const hackathonRouter = require('./routes/hackathonRouter');
app.use('/api/hackathon/', hackathonRouter);



app.listen(port, ()=>{
    console.log(`Connection to server established on the port number: ${port}`);
})