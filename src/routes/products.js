const express = require("express");
const productsRouter = express.Router();
const productsController = require("../controllers/productsController");

productsRouter.get("/", (req, res) => {
    const products = productsController.list();
    res.send(products);
});

productsRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const product = productsController.findOneById(parseInt(id));
    if (!product) {
        res.status(404).send({ error: "Producto no encontrado" });
    } else {
        res.send(product);
    }
});

productsRouter.post("/", (req, res) => {
    const { title, price, thumbnail } = req.body;
    const product = productsController.add(title, price, thumbnail);
    res.status(201).send(product);
});

productsRouter.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;
    const product = productsController.updateById(id, title, price, thumbnail);
    res.send(product);
});

productsRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    res.send(productsController.deleteById(id));
});

module.exports = productsRouter;