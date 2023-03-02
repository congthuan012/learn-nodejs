const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const AdminSchema = new mongoose.Schema({
      username: {
            type: String,
            required: true,
            unique: true
      },
      email: {
            type: String,
            required: true
      },
      password: {
            type: String,
            required: true
      },
      full_name: {
           type: String,
           maxLength: 255
      },
      role: {
            type: String,
            default: 'employee'
      },
      user_number: {
            type: String,
      }
},
{
      timestamps: true
});

AdminSchema.plugin(mongooseDelete,{
      deletedAt: true,
});

module.exports = mongoose.model('Admin', AdminSchema);