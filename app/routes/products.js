const express = require("express");
const Product = require("../controllers/product.controller.js");
const productsRouter = express.Router();
const productsBank = require("../productsBank");

productsRouter.get("/", (req, res) => {
    const products = Product.getAll();
    res.send(products);
});

productsRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const product = productsBank.findOneById(parseInt(id));
    if (!product) {
        res.status(404).send({ error: "Producto no encontrado" });
    } else {
        res.send(product);
    }
});

productsRouter.post("/", (req, res) => {
    const { title, price, thumbnail } = req.body;
    const product = Product.create(title, price, thumbnail);
    res.status(201).send(product);
});

productsRouter.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;
    const product = Product.update(id, title, price, thumbnail);
    res.send(product);
});

productsRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    res.send(productsBank.deleteById(id));
});

module.exports = productsRouter;