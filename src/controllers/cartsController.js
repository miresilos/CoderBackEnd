const productsController = require("./productsController");

const data = [];
let id = 0;

const showCarts = () => {
    return data;
}

const showCartProducts = (id) => {
    const targetCart = findCartById(id);
    const cartListProducts = targetCart.map (cart => cart.products)
    return cartListProducts;
}

const addCart = () => {
    let timestamp = Date.now();
    const cart = { id: ++id, timestamp, products:[] };
    data.push(cart);
    return cart;
};

const addProductToCart = (idCart, idProd) => {
    if (data.length === 0) {
        idCart = addCart();
    }
    const cart = findCartById(idCart);
    let cartExists = cart.length > 0;
    if (cartExists) {
        const product = productsController.findOneById(idProd);
        cart[0].products.push(product);
        return product;
    } else {
        let cartNotExists = { message: "El carrito indicado no existe" };
        return cartNotExists;
    }
}

const deleteCartById = (id) => {
    data.forEach((cart, i) => {
        if (cart.id == id) data.splice(i, 1);
    });
}

const deleteProductCartById = (idCart, idProd) => {
    const cart = findCartById(idCart);
    cart[0].products.forEach((product, i) => {
        if (product.id == idProd) cart[0].products.splice(i, 1);
    });
}

const findCartById = (id) => {
    const targetCart = data.filter((cart) => cart.id == id);
    return targetCart;
}

module.exports = { showCarts, showCartProducts, addCart, addProductToCart, deleteCartById, deleteProductCartById };