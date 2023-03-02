const Admin = require('../models/Admin');
const storeUserRequest = require('../requests/StoreUserRequest');
const AdminController = {
      index: async (req, res, next) => {
            try{
                  const admins = await Admin.find({deletedAt:{$eq: null}});
                  return res.json({admins});
            }catch(err){
                  return res.status(500).json({message: err.message});
            }
      },
      store: async (req, res, next) => {

            //validate
            const invalid = storeUserRequest(req.body);

            if(invalid){
                  return res.status(422).json(invalid);
            }

            const { username, email, password, full_name, user_number } = req.body;

            try{

                  //check duplicates username
                  const duplicate = await Admin.findOne({username});

                  if(duplicate){
                        return res.status(409).json({message: 'Username already exists'});
                  }

                  const admin = await Admin.create({
                        username,
                        email,
                        password,
                        full_name,
                        user_number
                  });

                  return res.status(201).json({
                        message: 'User created', 
                        admin: admin
                  });
            }catch(err){
                  return res.status(500).json({message: err.message});
            }
      },
      update: async (req, res, next) => {
            //validate
            const invalid = storeUserRequest(req.body);

            if(invalid){
                  return res.status(422).json(invalid);
            }

            const { username, email, password, full_name, user_number } = req.body;

            try{

                  //check is exits admin
                  const adminObj = await Admin.findOne({username});

                  if(!adminObj){
                        return res.status(409).json({message: 'Admin is not exists'});
                  }

                  await Admin.updateOne({username},{
                        email,
                        password,
                        full_name,
                        user_number
                  });

                  return res.status(201).json({
                        message: 'User updated'
                  });
            }catch(err){
                  return res.status(500).json({message: err.message});
            }
      },
      delete: async (req, res, next) => {
            const { username } = req.body;

            if(!username){
                  return res.status(422).json({message: 'Username is required'});
            }

            try{
                  const admin = await Admin.findOne({username});


                  if(!admin) {
                        return res.status(404).json({message: 'Admin not found'});
                  }

                  admin.delete()

                  return res.json({message: 'User deleted'});
            }catch(err){
                  return res.status(500).json({message: err.message});
            }
      },
}

module.exports = AdminController;