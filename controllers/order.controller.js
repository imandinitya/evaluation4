const pool = require ("../cofig/db");
const{validationResult} = require ("express-validator");

exports.createOrder = async (req, res) => {
    try{
        const errors = validationResult (req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors : errors.array()});
        const {product_name, quantity, price, customerId} =req.body;
        const customer = await pool.query(
            "SELECT * FROM customers WHERE id = $1", [customerId]
        );
        if(!customer.rows.length)
            return res.status(404).json({error: "customer not found"});

        const result = await pool.query(
            `INSERT INTO orders (product_name, quantity, price, customerId) VALUES ($1, $2, $3, $4) RETURNING *`,
            [product_name, quantity, price, customerId]
        );
        res.status(201).json(result.rows[0]);
        
    } catch (err){
        res.status(500).json({error: err.message});
    }
};

exports.getOrdersByCustomerId =  async (req, res) => {
    try{
        const {customerId} = req.params;
        const result = await pool.query(
            "SELECT * FROM orders WHERE customerId = $1", [customerId]
        );

        res.json(result.rows);
    }
    catch (err){
        res.status(500).json({error: err.message});

    }
};

exports.updateOrder = async (req, res) => {
    try { 
        const {orderId} = rep.params;
        const{quantity, price, order_status} = req.body;
        const result =  await pool.query(
            `UPDATE orders SET quantity = $1, price =$2 , order_status = $3 WHERE id = $4 RETURNING *`,
            [quantity, price, order_status, orderId]
        );
        if(!result.rows.length)
            return res.status(404).json({error : "Order not found"});

        res.json(result.rows[0]);


    }catch (err){
        res.status(500).json({error: err.message});

    }
};

exports.deleteOrder = async (req, res) => {
    try{
        const {orderId} = req.params;
        const result = await pool.query(
            "DELETE FROM orders WHERE id = $1 RETURNING *", [orderId]

        );
        if (!result.rows.length)
            return res.status(404).json({error : "order not found"});

    } catch (err){
        res.status(500).json({ error: err.message});
    }
};