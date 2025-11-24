import { Server } from 'socket.io';
let io;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, { cors: { origin: '*' } });
  io.on('connection', (socket) => {
    console.log('Socket conectado', socket.id);
  });
  return io;
};

export const getIO = () => io;