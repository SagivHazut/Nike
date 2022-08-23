const Joi = require("joi");

function validateCard(card) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(256).required(),
    lastName: Joi.string().min(2).max(256).required(),
    email: Joi.string().min(6).max(255).required().email(),
    state: Joi.string().min(2).max(256).required(),
    country: Joi.string().min(2).max(1024).required(),
    address: Joi.string().min(2).max(256).required(),
    zip: Joi.string().min(4).max(8),
    cardName: Joi.string().min(2).max(256).required(),
    expiration: Joi.string().min(1).max(256),
    cardNumber: Joi.string().min(2).max(12),
    cvv: Joi.string().min(3).max(3),
    cartItems: Joi.array(),
  });
  return schema.validate(card);
}
exports.validateCard = validateCard;
