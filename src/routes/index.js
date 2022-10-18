import { Router } from "express";
import loginRouter from "./login.js";
import registerRouter from "./register.js";
import logoutRouter from "./logout.js";
import mainRouter from "./main.js";
import infoRouter from "./info.js";
import randomRouter from "./random.js";
import { dataProd } from "../db/dataProd.js";

const router = Router();

router.use("/login", loginRouter);
router.use("/register", registerRouter);
router.use("/logout", logoutRouter);
router.use("/main", mainRouter);
router.use("/info", infoRouter);
router.use("/randoms", randomRouter);

// SESSION
router.get("/", (req, res) => {
    if (req.session.nombre) {
      res.redirect("/api/index");
    } else {
      res.redirect("/api/login");
    }
});
  
router.get("/login-error", (req, res) => {
    res.render("login-error");
});

router.post("/", (req, res) => {
    const { title, price, thumbnail } = req.body;
    const productData = { title: title, price: price, thumbnail: thumbnail };
    dataProd.push(productData);

    res.redirect("/api/main");
});

export default router;