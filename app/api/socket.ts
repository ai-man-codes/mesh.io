    import { Server } from 'socket.io';

    export default function handler(req:any, res:any) {
      if (!res.socket.server.io) {
        const io = new Server(res.socket.server);
        res.socket.server.io = io;

       io.on('connection', (socket) => {

      console.log('New client connected');

      socket.on('message', (msg) => {
        console.log("the messsage is ",msg);
        io.emit('message', msg);

      });

      socket.on('disconnect', () => {

        console.log('Client disconnected');

      });

    });
      }
      res.end();
    }
