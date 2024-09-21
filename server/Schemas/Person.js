const Joi = require('joi');

const personSchema = Joi.object({
  first_name: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'First name must be a string',
      'string.min': 'First name must be at least 3 characters long',
      'string.max': 'First name must be less than or equal to 255 characters',
      'any.required': 'First name is required',
    }),

  last_name: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'Last name must be a string',
      'string.min': 'Last name must be at least 3 characters long',
      'string.max': 'Last name must be less than or equal to 255 characters',
      'any.required': 'Last name is required',
    }),

  surname: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .optional()
    .allow(null)
    .messages({
      'string.base': 'Surname must be a string',
      'string.min': 'Surname must be at least 3 characters long',
      'string.max': 'Surname must be less than or equal to 255 characters',
    }),

  email_address: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .max(255)
    .optional()
    .allow(null)
    .messages({
      'string.base': 'Email Address must be a string',
      'string.email': 'Email Address must be a valid email',
      'string.max': 'Email Address must be less than or equal to 255 characters',
    }),

  phone_number: Joi.string()
    .trim()
    .pattern(/^\+?[0-9]{9,}$/)
    .required()
    .messages({
      'string.base': 'Phone Number must be a string',
      'string.pattern.base': 'Phone Number must be at least 9 digits long and may start with a + sign',
      'any.required': 'Phone Number is required',
    }),

  birthdate: Joi.date()
    .optional()
    .allow(null)
    .messages({
      'date.base': 'Birthdate must be a valid date',
    }),

  gender: Joi.string()
    .trim()
    .optional()
    .allow(null)
    .valid('Male', 'Female')
    .messages({
      'string.base': 'Surname must be a string',
      'string.min': 'Surname must be at least 3 characters long',
      'string.max': 'Surname must be less than or equal to 255 characters',
    }),

    skills: Joi.string()
    .trim()
    .optional()
    .allow(null)
    .messages({
      'string.base': 'Surname must be a string',
      'string.min': 'Surname must be at least 3 characters long',
      'string.max': 'Surname must be less than or equal to 255 characters',
    }),
});

module.exports = personSchema;