import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });

        connection.on("error", (err) => {
            console.log("Error connecting to MongoDB:", err);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};

export default dbConnect;
