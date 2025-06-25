const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema(
    {
        
        role: { type: String, default: 'user' }, // 'user' or 'admin'
        
    },
    {
        timestamps: true
    }
);
const Users = mongoose.model('Users',usersSchema);
module.exports = Users;