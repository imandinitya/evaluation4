const pool = require ("../config/db");
const {validationResult} = require ("express-validator");
require("express-validator");

exports.registerCustomer = async (req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        const {full_name, email, phone} = req.body;

        const exists = await pool.query (
            "SELECT * FROM customers WHERE email = $1", [email]
        );
        
        if (exists.row.length) 
            return res.status(409).json({ error : "email already exists"})

        const redult = await pool.query (
            `INSERT INTO customers (full_name,email,phone) VALUES ($1, $2, $3) RETURNING *`
            [full_name,email, phone]
        );

        res.status(201).json( result.rows[0]);
    }
    catch(err){
        res.status(500).json({ error : err.message});
    }
};

exports.deleteCustomer = async (Request, res) => {
    try{
        const { id } = req.params;
        const result = await pool.query (
            "DELETE FROM customers WHERE id = $1 RETURNING *", [id]  
        );
        if(result.rows.length)
            return res.status(404).json({error: "Custoer not found"});

        res.json({message: "customer deleted successfully"});
    }catch (err){
        res.status(500).json({error: err.message})
    }
};