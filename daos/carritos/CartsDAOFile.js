import { promises as fs } from "fs";
import MemoryContainer from "../../containers/MemoryContainer.js";
import Product from "../productos/ProductsDAOFile.js";

class Cart extends MemoryContainer {
    constructor() {
        super("./db/carts.txt")
    };

    async listProducts(id) {
        try {
            const targetCart = await this.findById(id);
            const cartListProducts = targetCart.products;
            
            return cartListProducts;    
        } catch (err) {
            console.log(`There has been an error: ${err}`);
        }
    };

    async add() {
        try {
            let content = await fs.readFile(this.route, "utf8");
            let timestamp = Date.now();
            const defaultState = "[]";
            const cart = { timestamp, products:[] };

            if (content == "") {
                await fs.writeFile(this.route, defaultState);
                content = "[]";
            }
            const data = await JSON.parse(content);
            if (data.length > 0) {
                data.push({ ...cart, id: data[data.length - 1].id + 1 });
            } else {
                data.push({ ...cart, id: 1 });
            }

            await fs.writeFile(this.route, JSON.stringify(data, null, 2));
        } catch (err) {
            console.log(`There has been an error: ${err}`);
        }
    };

    async addProduct(idCart, idProd) {
        try {
            const content = await fs.readFile(this.route, "utf-8");
            const data = await JSON.parse(content);
            const productSelected = new Product;
    
            const cart = await this.findById(idCart);
            if (cart !== undefined) {
                const product = await productSelected.findById(idProd);
                await cart.products.push(product);
            } else {
                let cartNotExists = { message: "El carrito indicado no existe" };
                
                return cartNotExists;
            }

            const index = await data.findIndex((elem, i) => {
                if(elem.id == idCart) {
                    return true;
                }
            });
            
            data[index] = cart;
            await fs.writeFile(this.route, JSON.stringify(data, null, 2));
        } catch (err) {
            console.log(`There has been an error: ${err}`);
        }
    }

    async deleteProduct(idCart, idProd) {
        try {
            const content = await fs.readFile(this.route, "utf-8");
            const data = await JSON.parse(content);

            const cart = await this.findById(idCart);
            await cart.products.forEach((product, i) => {
                if (product.id == idProd) cart.products.splice(i, 1);
            });

            const index = await data.findIndex((elem, i) => {
                if(elem.id == idCart) {
                    return true;
                }
            });
            
            data[index] = cart;
            await fs.writeFile(this.route, JSON.stringify(data, null, 2));
        } catch (err) {
            console.log(`There has been an error: ${err}`);
        }
    };
};

export default Cart;