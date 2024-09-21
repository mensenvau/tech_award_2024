const Joi = require('joi');

const UserSchema = Joi.object({
    phone_number: Joi.string()
    .trim()
    .pattern(/^\+?[0-9]{9,}$/)
    .required()
    .messages({
      'string.base': 'Phone Number must be a string',
      'string.pattern.base': 'Phone Number must be at least 9 digits long and may start with a + sign',
      'any.required': 'Phone Number is required',
    }),
  
    // password: Joi.string().trim().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{5,30}$')).required().messages({
    //       'string.pattern.base': 'Password must contain at least 5 characters, one uppercase letter, one lowercase letter, and one numeric value or special character',
    //       'string.empty': 'Password cannot be an empty field',
    //       'any.required': 'Password is a required field'
    // })
  });

module.exports = UserSchema;
