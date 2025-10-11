import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB CONNECTED: ", conn.connection.host);
    } catch (error) {
        console.error("Error connecting to MONGODBL:", error);
        process.exit(1); // Status code 1 = Failed, 0 Success
    }
}

