const {body} = require("express-validator");

exports.createOrder =[
    body("product_name").notEmpty(),
    body("quantity").isInt({ min: 1 }),
    body("customerId").notEmpty()
];