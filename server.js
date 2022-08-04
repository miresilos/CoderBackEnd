const express = require('express');
const PORT = 8080;

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("public"));

const comments = [
    { username: "juanitoacaiga@gmail.com", text: "El producto llegó en muy buen estado. Recomendado." },
    { username: "pipes@gmail.com", text: "¿Tienen stock de Esperando a Godot?" },
    { username: "bateadorbateadorbatea@gmail.com", text: "Apa ¿Qué rompimos?" }
];

const products = [
    {title: "Ecce homo", price: "1800", thumbnail: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQmyuNsR7Ps_Fc1wk4AhyyBV7MkKqNs5XlKpT_x-1bsLemtXDqpNHukd51R4ZrUYEIv49g7LLOhetvR&usqp=CAc"},
    {title: "El extranjero", price: "1600", thumbnail: "https://http2.mlstatic.com/D_NQ_NP_965901-MLA44938805710_022021-V.webp"},
    {title: "Esperando a Godot", price: "800", thumbnail: "https://caletadelibros.cl/wp-content/uploads/2021/01/22133/portada_esperando-a-godot_samuel-beckett_201801112258.jpg"}
];

io.on("connection", (socket) => {
    console.log("Un cliente se ha conectado");
    socket.emit("products", products);
    socket.emit("comments", comments);

    socket.on("new-product", (data) => {
        products.push(data);
        io.sockets.emit("products", products);
    });

    socket.on('new-comment', (data) => {
        comments.push(data);
        io.sockets.emit("comments", comments);
    });
});

httpServer.listen(PORT, (err) => {
    if (err) console.log("Error in server setup")
    console.log(`Listening on port ${PORT}`);
});

