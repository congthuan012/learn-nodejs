const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const UserSchema = new mongoose.Schema({
      username: {
            type: String,
            required: true
      },
      password: {
            type: String,
            required: true
      },
      active: {
            type: Boolean,
            default: true
      },
},
{
      timestamps: true
});

UserSchema.plugin(mongooseDelete)

module.exports = mongoose.model('User', UserSchema);