const Joi = require("joi");
const {
    validateRequest
} = require("../middlewares/validate_request");

const addNasabahValidation = Joi.object().keys({
    Name: Joi.string().required()
});

const addNasabahSchema = (req, res, next) => {
    validateRequest(req, res, next, addNasabahValidation);
}

module.exports = {
    addNasabahSchema
}