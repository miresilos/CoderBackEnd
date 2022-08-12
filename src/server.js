const express = require('express');
const app = express();
const router = require("./routes");
process.env.PORT = 8080;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.listen(process.env.PORT, (err) => {
    if (err) console.log(`Error in server setup: ${err} - ${err.message}`)
    console.log(`Server listening on Port ${process.env.PORT}`);
});