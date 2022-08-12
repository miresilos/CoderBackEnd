const express = require("express");
const cartRouter = express.Router();
const cartsController = require("../controllers/cartsController");

cartRouter.get("/", (req, res) => {
    const cart = cartsController.showCarts();
    res.send(cart);
});

cartRouter.get("/:id/productos", (req, res) => {
    const { id } = req.params;
    const cartProducts = cartsController.showCartProducts(id);
    res.send(cartProducts);
});

cartRouter.post("/", (req, res) => {
    const cart = cartsController.addCart();
    res.status(201).send(cart);
});

cartRouter.post("/:id/productos/:id_prod", (req, res) => {
    const { id, id_prod } = req.params;
    const postCartProduct = cartsController.addProductToCart(id, id_prod);
    res.send(postCartProduct);
});

cartRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    res.send(cartsController.deleteCartById(id));
});

cartRouter.delete("/:id/productos/:id_prod", (req, res) => {
    const { id, id_prod } = req.params;
    res.send(cartsController.deleteProductCartById(id, id_prod));
});

module.exports = cartRouter;