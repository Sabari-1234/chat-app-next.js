import { createServer } from 'node:http';
import next from 'next';
import { Server as SocketIOServer } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = dev ? 'localhost' : '0.0.0.0'; // Use localhost for dev, 0.0.0.0 for production
const port = process.env.PORT || 3000; // Default to 3000 if PORT is not set


const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    return handle(req, res);
  });

  const io = new SocketIOServer(httpServer);
  const connectedClients = {}; // Object to store connected clients and their email IDs
  const updateOnlineStatus = async (data,email) => {
    try {
      console.log(process.env.NEXT_PUBLIC_SERVER_URL)
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${email}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Failed to update online status:", error);
    }
  };
  io.on('connection', (socket) => {
    console.log('Client connected');
    //on registration
    socket.on('registerEmail', (email) => {
      // Store the client's email with their socket ID
      connectedClients[socket.id] = email;
      console.log(`Client registered with email: ${email}`);
  });

    

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
    //edit msg

     //edit event handler
     socket.on('editData1', (data) => {
      console.log('Received from client:', data);
      io.emit('editData2', data);
    });
     //delete event handler
     socket.on('deleteDataId1', (data) => {
      console.log('Received from client:', data);
      io.emit('deleteDataId2', data);
    });
    // Handle disconnect
    socket.on('disconnect', () => {
      const email = connectedClients[socket.id]; // Get the email ID from the connected clients object
      if (email) {
          console.log(`Client disconnected: ${email}`);
          const now = new Date(Date.now());

          // Format the date and time
          const formattedDate = now.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true // Set to true if you want 12-hour format
          });
          io.emit('online2', { sender: email, text: "Last Seen at"+" "+formattedDate });
          const updateStatus=async()=>{
            await updateOnlineStatus({ status: "Last Seen at"+" "+formattedDate},email);
            delete connectedClients[socket.id]; 
          }
          updateStatus();
      }
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
