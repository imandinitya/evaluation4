const router = require("express").Router();
const controller = require("../controllers/customer.controller");
const validation = require("../validations/customer.validation");

router.post("/register", validation.createCustomer, controller.registerCustomer);
router.delete("/:id", controller.deleteCustomer);

module.exports = router;