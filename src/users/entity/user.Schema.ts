import Joi = require("joi");

export const userSchema = Joi.object({
  firstName: Joi.string().min(3).max(16).required(),
  lastName: Joi.string().min(3).max(16).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .max(100)
    .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[\\W_]).{6,}$'))
    .messages({
      'string.pattern.base': 'Password too weak',
    })
    .required(),
});
