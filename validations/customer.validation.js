const { body } = require("express-validator");

exports.createCustomer = [
    body("full_name").notEmpty(),
    body("email").isEmail(),
    body("phone").notEmpty(),
];