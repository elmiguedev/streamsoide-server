import express, { Express, Request, Response } from 'express';
import http from "http";
import { Server, Socket } from "socket.io";

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});


io.on("connection", (socket: Socket) => {
  console.log("Socket connected: " + socket.id);
  socket.on("comment:show", (comment) => {
    io.emit("comment:show", comment);
  })
  socket.on("comment:clear", () => {
    io.emit("comment:clear");
  })
})


server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});