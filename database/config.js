'use strict';
const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log(`Database online`);
    } catch (error) {
        throw new Error(`Database error: ${err}`);
    }
}

module.exports = {
    dbConnection
}