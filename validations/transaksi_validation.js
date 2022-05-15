const Joi = require("joi");
const {
    validateRequest
} = require("../middlewares/validate_request");

const addTransaksiValidation = Joi.object().keys({
    AccountId: Joi.number().required(),
    TransactionDate: Joi.date().required(),
    Description: Joi.string().valid('Setor Tunai', 'Beli Pulsa', 'Bayar Listrik').required(),
    DebitCreditStatus: Joi.string().valid('C', 'D').required(),
    Amount: Joi.number().min(0).required()
});

const getReportValidation = Joi.object().keys({
    AccountId: Joi.number().required(),
    StartDate: Joi.date().required(),
    EndDate: Joi.date().required()
});

const addTransaksiSchema = (req, res, next) => {
    validateRequest(req, res, next, addTransaksiValidation);
}

const getReportSchema = (req, res, next) => {
    validateRequest(req, res, next, getReportValidation);
}

module.exports = {
    addTransaksiSchema,
    getReportSchema
}