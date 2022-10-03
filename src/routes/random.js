import { Router } from "express";
import { fork } from "child_process";

const randomRouter = Router();

randomRouter.get("/", (req, res) => {
    let { quant } = req.query;
    const child = fork("./src/fork/child.js");
    child.send("start", quant);
    child.on("message", (random) => {
        res.send(random);
    });
});

export default randomRouter;