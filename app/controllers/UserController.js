const User = require('../models/User');

const UserController = {
      index: async (req, res, next) => {
            try{
                  const users = await User.find({});
                  return res.json({users});
            }catch(err){
                  return res.status(500).json({message: err.message});
            }
      },
      store: (req, res, next) => {
            res.json({
              message: 'User Store'
            })
      },
      update: (req, res, next) => {
            res.json({
              message: 'User Update'
            })
      },
      delete: async (req, res, next) => {
            const { username } = req.body;

            if(!username){
                  return res.status(422).json({message: 'Username is required'});
            }

            try{
                  const user = await User.findOne({username});

                  if(!user) {
                        return res.status(404).json({message: 'User not found'});
                  }

                  user.delete()

                  return res.json({message: 'User deleted'});
            }catch(err){
                  return res.status(500).json({message: err.message});
            }
      },
}

module.exports = UserController;