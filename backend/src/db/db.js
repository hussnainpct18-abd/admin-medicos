const mongoose=require('mongoose');


async function connectDB(){
    try{
        const db= await mongoose.connect(process.env.MONGO_DB)
        if(db){
            console.log("Connected to database successfully")
        }
    }catch(e){
        throw new Error("Error Connecting to the Database ...");      
    }
}

module.exports=connectDB

