require ('dotenv').config();
const mongoose =require('mongoose'); 

const connectDB=async ()=>{
	try{
		const URL=process.env.MONGO_CONNECTION_URL;
		await mongoose.connect(URL, {
			useNewUrlParser:true,
			useUnifiedTopology:true,
			// useCreateIndex:true,------> do not
		});
		console.log("Database connection successful");
	} catch (err) {
		console.log("Error,while connecting MOngoDB",err);
	}
}

module.exports=connectDB;