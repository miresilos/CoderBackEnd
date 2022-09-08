import express, { json, urlencoded } from 'express';
const PORT = 8080;

import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
import router from './src/Routes/routes.js';

import { dataProd } from "./src/db/dataProd.js";

app.set('view engine', 'ejs');
app.set('views', 'public');
// app.use(express.static("public"));
app.use(json());
app.use(urlencoded({extended: true}));
app.use('/api', router)

io.on('connection', socket => {
  console.log('Cliente conectado', dataProd)
  io.sockets.emit("products", dataProd);

});

httpServer.listen(PORT, (err) => {
    if (err) console.log("Error in server setup")
    console.log(`Listening on port ${PORT}`);
});