const mongoose=require("mongoose")

mongoose.set('strictQuery', false);

const connToDB=async()=>{
    try {
        const dbInstance=await mongoose.connect(process.env.MONGO_URI)
        if(dbInstance){
            console.log(`DB connected  successfully | ${dbInstance.connection.host}`);
        }
    } catch (error) {
        console.log("Error in connecting DB!!!");
    }
}

module.exports=connToDB;



