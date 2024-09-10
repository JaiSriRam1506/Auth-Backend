const express = require("express");
const userRoutes = require("./userRoutes");
// const productsRoutes = require("./productRoutes");
// const orderRoutes = require("./orderRoutes");

const router = express.Router();

router.use("/user", userRoutes);

// router.use("/product", productsRoutes);

// router.use("/order", orderRoutes);

module.exports = router;

// http://localhost:4000 + /api + /v1 + /user + /getInfo
// http://localhost:4000/api/v1/user/register
// http://localhost:4000/api/v1/user/login
// http://localhost:4000/api/v1/user/logout
// http://localhost:4000/api/v1/product/getProduct

// http://localhost:4000/api/v1/order/orderStatus

// http://localhost:4000/api/v1/payment/paymentStatus

// http://localhost:4000/api/v1/coupan/currentOffer
// http://localhost:4000/api/v1/brand/famousBrand
