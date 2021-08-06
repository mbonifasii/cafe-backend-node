'use strict';

const { validationResult } = require("express-validator");

const validateFields = (req, res, next) => {
    let errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        return res.status(400).send(errors);
    }

    next();
}

module.exports = {
    validateFields
}