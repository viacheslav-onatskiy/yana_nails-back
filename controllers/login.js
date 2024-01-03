import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/userModel.js';

export const loginUser = async (request, response) => {
  // check if email exists

  UserModel.find().then((users) => {
    const user = users.filter((user) => user.email === request.body.email);
  });
  UserModel.findOne({ email: request.body.email })
    // if email exists
    .then((user) => {
      console.log('user123', user);

      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {
          // check if password matches
          if (!passwordCheck) {
            return response.status(400).send({
              message: 'Passwords does not match',
              error
            });
          }

          // create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email
            },
            'RANDOM-TOKEN',
            { expiresIn: '24h' }
          );

          //   return success response
          response.status(200).send({
            message: 'Login Successful',
            email: user.email,
            token
          });
        })
        // catch error if password does not match
        .catch((error) => {
          response.status(400).send({
            message: 'Passwords does not match',
            error
          });
        });
    })
    // catch error if email does not exist
    .catch((error) => {
      response.status(404).send({
        message: 'Email not found',
        error
      });
    });
};
