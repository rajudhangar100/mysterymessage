import mongoose from "mongoose";

//to define the type of our variable which we'll use for checking
type connectionObject={
    isConnected?:number
}
//it is our initially empty, after connection to db , db will give us a object , from that object 
//we are going to fetch numerical data and check if numerical data is there then it means db is already connected
const connection: connectionObject={}

async function connectDb():Promise<void>{
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mysterymsg';
    if(connection.isConnected){
        console.log("Database is already Connected");
        return
    }
    try {
        // const db = await mongoose.connect(process.env.MONGODB_URI || "",{});
        const db=await mongoose.connect(uri,{serverSelectionTimeoutMS:30000});//increases timeout to 30 seconds
        connection.isConnected=db.connections[0].readyState;
        console.log("Database connected Successfully");
        return;
    } catch (error) {
        console.log("Database connection Failed");
        process.exit(0);
    }
}
export default connectDb;