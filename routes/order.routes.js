const router = require("express").Router();
const controller = require ("../controllers/order.controller");
const validation = require("../validations/order.validation");

router.post("/add-order", validation.createOrder, controller.createOrder);
router.get("/get-my-orders/:customerId", controller.getOrdersByCustomerId);
router.put("/update-order/:orderId", validation.updateOrder, controller.updateOrder);
router.delete("/delete-order/:orderId", controller.deleteOrder);

