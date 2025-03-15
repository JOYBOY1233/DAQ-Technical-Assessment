import net from "net";
import { WebSocket, WebSocketServer } from "ws";
import { alertFunction, validateData } from "./helperFunctions";

interface VehicleData {
  battery_temperature: number | string;
  timestamp: number;
}

const TCP_PORT = 12000;
const WS_PORT = 8080;
const tcpServer = net.createServer();
const websocketServer = new WebSocketServer({ port: WS_PORT });

//an array to keep track of the timestamps at which the temp exceeded the allowable range
let exceededTimestamps: number[] =  [];

tcpServer.on("connection", (socket) => {
  console.log("TCP client connected");

  socket.on("data", (msg) => {

    const message: string = msg.toString();    
    const parsedData : VehicleData = JSON.parse(message)

    console.log(`Received: ${message}`);
    

    //Function to conduct a check for the correct format of the msg data received
    if (validateData(parsedData)) {
      //Round the temperature to 3 decimal places
      const roundedTemperature = Math.round(Number(parsedData.battery_temperature) * 1000) / 1000;
      parsedData.battery_temperature = roundedTemperature;

      //Function to check if the limit is exceeded 
      exceededTimestamps = alertFunction(parsedData, exceededTimestamps,websocketServer)
      
      // Send JSON over WS to frontend clients
      websocketServer.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          //converitng the object to a string here
          client.send(JSON.stringify(parsedData));
        }
      });

    }

  });

  socket.on("end", () => {
    console.log("Closing connection with the TCP client");
  });

  socket.on("error", (err) => {
    console.log("TCP client error: ", err);
  });
});

websocketServer.on("listening", () =>
  console.log(`Websocket server started on port ${WS_PORT}`)
);

websocketServer.on("connection", async (ws: WebSocket) => {
  console.log("Frontend websocket client connected");
  ws.on("error", console.error);
});

tcpServer.listen(TCP_PORT, () => {
  console.log(`TCP server listening on port ${TCP_PORT}`);
});
