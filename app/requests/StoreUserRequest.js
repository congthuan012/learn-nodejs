const { validateEmail } = require('../helpers/helpers');
module.exports = (body) => {
      const errors = {};

      const { username, email, password, full_name, user_number } = body;

      if(!username) {
            errors['username'] = 'Username is required';
      }

      if(!email){
            errors['email'] = 'Email is required';
      }else if(!validateEmail(email)){
            errors['email'] = 'Invalid Email';
      }

      if(!password){
            errors['password'] = 'Password is required';
      }

      if(!full_name){
            errors['full_name'] = 'Full Name is required';
      }

      if(!user_number){
            errors['user_number'] = 'User Number is required';
      }

      if(Object.keys(errors).length){
            return errors;
      }

      return null;
      
}