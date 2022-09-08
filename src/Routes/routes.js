import express from "express";
import productsRouter from "./products.js";
import productsTestRouter from "./products-test.js";

const { Router } = express;
const router = Router();

// return all products
router.use("/productos", productsRouter);
router.use("/productos-test", productsTestRouter);

export default router;