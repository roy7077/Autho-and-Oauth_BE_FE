const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => {
            console.log("Database connected successfully");
        })
        .catch((error) => {
            console.error("Error in connecting to the database:", error.message);
        });
};

module.exports = dbConnect;
