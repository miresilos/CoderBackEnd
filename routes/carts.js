import express from "express";
import Cart from "../daos/carritos/CartsDAOFile.js";

const cartRouter = express.Router();
const newCart = new Cart();

cartRouter.get("/", (req, res) => {
    const cart = newCart.listAll();
    res.send(cart);
});

cartRouter.get("/:id/productos", (req, res) => {
    const { id } = req.params;
    const cartProducts = newCart.listProducts(id);
    res.send(cartProducts);
});

cartRouter.post("/", (req, res) => {
    const cart = newCart.add();
    res.status(201).send(cart);
});

cartRouter.post("/:id/productos/:id_prod", (req, res) => {
    const { id, id_prod } = req.params;
    const postCartProduct = newCart.addProduct(id, id_prod);
    res.send(postCartProduct);
});

cartRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    res.send(newCart.deleteById(id));
});

cartRouter.delete("/:id/productos/:id_prod", (req, res) => {
    const { id, id_prod } = req.params;
    res.send(newCart.deleteProduct(id, id_prod));
});

export default cartRouter;