import app from "./app";
import {Server} from "http";
import config from "./config";
import mongoose from "mongoose";


let server: Server
const port = process.env.PORT || 3000;

async function main() {
    try {
        
         // Connect to MongoDB Atlas using Mongoose
        await mongoose.connect(config.db_url as string);
        console.log('Connected to MongoDB Atlas Using Mongoose');

        const server = app.listen(port, () => {
            console.log(`BookBase Server Running On Port ${port}`);
        })
        
    } catch (error) {
        console.error("Error on Running BookBase Server:", error);
    }
}
main();

