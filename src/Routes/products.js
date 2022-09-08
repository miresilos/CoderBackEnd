import express from "express";
import { dataProd } from "../db/dataProd.js";

const productsRouter = express.Router();
productsRouter.use(express.static("public"));

productsRouter.get("/", (req, res) => {
    res.render("index", { datos: dataProd });
  });
  
productsRouter.post("/", (req, res) => {
const {title, price, thumbnail} = req.body;
dataProd.push({price:price, title:title, thumbnail:thumbnail})
res.redirect("/api/productos");
})

export default productsRouter;