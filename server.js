require ("dotenv").config();
const express = require ("express");
const cors = require("cors");

const customerRoutes = require ("./routes/customer.routes");
const orderRoutes = require ("./routes/order.routes");

const app = express ();
app.use(cors());
app.use(express.json());

app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);

app.use((err, req, res, next) => 
{
    console.error(err);
    res.status(500).json({error: "server error"});
});

app.listen(process.env.PORT, () =>
{
    console.log ("server running on port", process.env.PORT);
});