import express from "express";
import Product from "../daos/productos/ProductsDAOFile.js";

const productsRouter = express.Router();
const newProduct = new Product();

productsRouter.get("/", (req, res) => {
    const products = newProduct.listAll();
    res.send(products);
});

productsRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const product = newProduct.findById(id);
    if (!product) {
        res.status(404).send({ error: "Producto no encontrado" });
    } else {
        res.send(product);
    }
});

productsRouter.post("/", (req, res) => {
    const { title, price, thumbnail } = req.body;
    const product = newProduct.add(title, price, thumbnail);
    res.status(201).send(product);
});

productsRouter.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;
    const product = newProduct.updateById(id, title, price, thumbnail);
    res.send(product);
});

productsRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    res.send(newProduct.deleteById(id));
});

export default productsRouter;