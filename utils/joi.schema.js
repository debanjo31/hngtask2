const Joi = require('joi');

// const dynamicFieldSchema = Joi.object().pattern(
//   /./, // Regular expression to match any field name
//   Joi.string().required() // Validation for the field value
// );

const nameSchema = Joi.string()
  .min(2)
  .max(50)
  .regex(/^[A-Za-z\s]*$/)
  .required()
  .error(new Error('Name is invalid'));

module.exports = { nameSchema };
