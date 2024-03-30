import mongoose  from "mongoose";

function connectToDb(url) {
    return mongoose.connect(process.env.MONGO_URL).then(()=>console.log("mongodb is connected"))
}
export default connectToDb;