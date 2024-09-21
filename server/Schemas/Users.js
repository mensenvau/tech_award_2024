const Joi = require('joi');
const Person = require('./Person');

const studentValidationSchema = Person.concat(Address).keys({
  lead_id: Joi.number()
    .integer()
    .min(1)
    .optional()
    .allow(null)
    .messages({
      'number.base': 'Lead ID must be a number',
      'number.integer': 'Lead ID must be an integer',
      'number.min': 'Lead ID must be greater than or equal to 1'
    }),

  group_id: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.base': 'Group ID must be a number',
      'number.integer': 'Group ID must be an integer',
      'number.min': 'Group ID must be greater than or equal to 1',
      'any.required': 'Group ID is required',
    }),

  ielts: IELTSInfo.optional().allow(null),

  guardian: Guardian.optional().allow(null)

});

module.exports = studentValidationSchema;