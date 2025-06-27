const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema(
    {

        //adding this field for testing purposes
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: 'user' }, // 'user' or 'admin'  
    },
    {
        timestamps: true
    }
);
const Users = mongoose.model('Users',usersSchema);
module.exports = Users;