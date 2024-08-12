import { createServer } from 'node:http';
import next from 'next';
import { Server as SocketIOServer } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    return handle(req, res);
  });

  const io = new SocketIOServer(httpServer);

  io.on('connection', (socket) => {
    console.log('Client connected');

   
    

    //message event handler
    socket.on('message1', (data) => {
      console.log('Received from client:', data);
      io.emit('message2', data);
    });

     // typing event handler
     socket.on('typing1', (data) => {
      console.log('Received from client:', data);
      io.emit('typing2', data);
    });
     // online event handler
     socket.on('online1', (data) => {
      console.log('Received from client:', data);
      io.emit('online2', data);
    });
    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  httpServer
    .once('error', (err) => {
      console.error('Error occurred:', err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
