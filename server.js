const express = require('express');
const PORT = 8080;

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const { mariaDBOptions } = require("./options/mariaDB");
const { sqliteOptions } = require("./options/sqliteDB");
const mariaDBKnex = require("knex")(mariaDBOptions);
const sqliteKnex = require("knex")(sqliteOptions);
const knexMemory = require("./controller/knexMemory");

app.use(express.static("public"));

const comments = [];
const products = [];

io.on("connection", (socket) => {
    console.log("Un cliente se ha conectado");
    socket.emit("products", products);
    socket.emit("comments", comments);

    socket.on("new-product", (data) => {
        products.push(data);
        knexMemory.insert(mariaDBKnex, "products", data);
        io.sockets.emit("products", products);
    });

    socket.on('new-comment', (data) => {
        comments.push(data);
        knexMemory.insert(sqliteKnex, "comments", data);
        io.sockets.emit("comments", comments);
    });
});

httpServer.listen(PORT, (err) => {
    if (err) console.log("Error in server setup")
    console.log(`Listening on port ${PORT}`);
});