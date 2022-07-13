const express = require('express');
const fs = require("fs").promises;

const app = express();

const PORT = 8080;

class Container {
    constructor(fileName) {
        this.name = "./" + fileName + ".txt";
    }

    async save(obj) {
        try {
            const defaultState = "[]";
            let content = await fs.readFile(this.name, "utf-8");
    
            if (content == "") {
                await fs.writeFile(this.name, defaultState);
                content = "[]";
            }
            const data = await JSON.parse(content);
            if (data.length > 0) {
                data.push({ ...obj, id: data[data.length - 1].id + 1 });
            } else {
                data.push({ ...obj, id: 1 });
            }
            await fs.writeFile(this.name, JSON.stringify(data, null, 2));
            return data[data.length - 1].id;
        } catch (err) {
            console.log(`There has been an error: ${err}`);
        }
    }

    async getAll() {
        try {
            const content = await fs.readFile(this.name, "utf-8");
            const data = await JSON.parse(content);

            return data;
        } catch (err) {
            console.log(`There has been an error: ${err}`);
        }
    }

    async getAtRandom() {
        try {
            const content = await fs.readFile(this.name, "utf-8");
            const data = await JSON.parse(content);
            const randomProduct = await data[Math.floor(Math.random() * data.length)];

            return randomProduct;
        } catch (err) {
            console.log(`There has been an error: ${err}`);
        }
    }

    async removeById(id) {
        try {
            const content = await fs.readFile(this.name, "utf-8");
            const data = await JSON.parse(content);
            const filteredContent = await data.filter((element) => element.id !== id);

            await fs.writeFile(this.name, JSON.stringify(filteredContent));
        } catch (err) {
            console.log(`There has been an error: ${err}`);
        }
    }

    async deleteAll() {
        try {
            const content = await fs.readFile(this.name, "utf-8");
            const data = await JSON.parse(content);
            data.splice(0, data.length);

            await fs.writeFile(this.name, data);
        } catch (err) {
            console.log(`There has been an error: ${err}`);
        }
    }
}

const product = new Container("products");

app.get("/", (req, res) => {
    res.send(`<span>ve a "/products" o a "/randomProduct", o este mensaje malvado robará tus códigos</span>`);
});

app.get("/products", (req, res, next) => {
    (async () => {
        const products = await product.getAll()
        return res.send(products);
    })().catch(next);
});

app.get("/randomProduct", (req, res, next) => {
    (async () => {
        const randomProduct = await product.getAtRandom()
        return res.send(randomProduct);
    })().catch(next);
});


const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando el puerto ${PORT}`);
});
server.on("error", (err) => console.log((`Error en servidor ${err}`)));