const express = require("express");
const app = express();
const router = require("./routes")
const PORT = 8080;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.listen(PORT, (err) => {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port " + PORT);
});