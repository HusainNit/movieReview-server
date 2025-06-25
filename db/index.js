const mongoose = require('mongoose');
const chalk = require('chalk');
require('dotenv').config();

const connect = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`${chalk.green('✅ Successfully connected to MongoDB database')}`);
    } catch (error) {
        console.error(`${chalk.red('❌ Connection Error!, ')}${chalk.red( error.message)}`);
    }
    
};

connect();
module.exports = mongoose.connection;