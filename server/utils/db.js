require('dotenv').config();
const mongoose = require("mongoose");
const config = require("../config/keys");

mongoose.set("strictQuery", false);

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to the database.");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
};

module.exports = { connectToDatabase };
