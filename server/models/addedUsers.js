const mongoose = require('mongoose');

const AddedUser = new mongoose.Schema({
   name: {
       type: String,
       required: true
   },
   email: {
       type: String,
       required: true,
       unique: true
   },
   phone: {
       type: String,
       required: true
   }
});

module.exports = mongoose.model('AddedUser', AddedUser);
