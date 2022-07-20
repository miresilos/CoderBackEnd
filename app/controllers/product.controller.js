const productsBank = require("../productsBank");

class Product {
    static getAll() {
        const products = productsBank.list();
        return products;
    }

    static create(title, price, thumbnail) {
        const product = productsBank.add(title, price, thumbnail);
        return product;
    }

    static update(id, title, price, thumbnail) {
        const product = productsBank.updateById(id, title, price, thumbnail);
        return product;
    }
}

module.exports = Product;