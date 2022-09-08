import express from "express";
import { faker } from "@faker-js/faker";
import { dataProd } from "../db/dataProd.js";

const productsTestRouter = express.Router();
productsTestRouter.use(express.static("public"));



productsTestRouter.get("/", (req, res) => {
    for (let i = 0; i < 5; i++) {
        const elem = {
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.abstract(),
        };
        dataProd.push(elem)
    }
    res.render("index", { datos: dataProd });
});

export default productsTestRouter;