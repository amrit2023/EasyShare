require ('dotenv').config();
const express =require('express');
const path =require('path');
const cors=require ('cors');
const app=express();


const PORT=process.env.PORT || 3000;
app.use(express.static('pub'));  // without this mime type error
app.use(express.json());
const connectDB=require ('./config/db');

connectDB();
//cors

// const corsOptions = {
// 	origin: process.env.ALLOWED_CLIENTS.split(',')
// }

app.use(cors());
//Template engine
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');
app.use('/files',require('./routes/show'));

//Routes 
app.use('/api/files',require('./routes/files'));
app.use('/files/download',require('./routes/download'));
app.listen(PORT, ()=> {
	console.log(`Listening on port ${PORT}`);
})
