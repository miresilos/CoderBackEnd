const express = require("express");
const router = express.Router();
const productsRouter = require("./products");

router.use("/productos", productsRouter);

module.exports = router;