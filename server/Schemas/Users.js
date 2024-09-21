const Joi = require('joi');
const Person = require('./Person');

const studentValidationSchema = Person.concat(Address).keys({
    skills: Joi.string()
    .trim()
    .optional()
    .allow(null)
    .messages({
      'string.base': 'Surname must be a string',
      'string.min': 'Surname must be at least 3 characters long',
      'string.max': 'Surname must be less than or equal to 255 characters',
    }),

    tax_certification_file: Joi.string()
    .trim()
    .optional()
    .allow(null)
    .messages({
      'string.base': 'Surname must be a string',
      'string.min': 'Surname must be at least 3 characters long',
      'string.max': 'Surname must be less than or equal to 255 characters',
    }),
});

module.exports = studentValidationSchema;