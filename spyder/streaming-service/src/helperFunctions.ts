import net from "net";
import { WebSocket, WebSocketServer } from "ws";

interface VehicleData {
  battery_temperature: number | string;
  timestamp: number;
}

const MAX_TEMP : number = 80;
const MIN_TEMP : number = 20;


export function validateData(data: VehicleData) : boolean {

  //check if the batter_temperature key exists
  if (!data.hasOwnProperty('battery_temperature')) {
    console.warn(("Data is in the wrong format!"))
    return false

  } 

  //checking if the temperature variable in data is a number
  if (typeof data.battery_temperature !== 'number') {
    
    console.warn("Data is in the wrong format!")
    return false;
    
  }

  return true;
}

export function alertFunction(parsedData: VehicleData, exceededTimestamps: number[], websocketserver: WebSocketServer) : number[] {

  const temperature = Number(parsedData.battery_temperature)
  
  const currentTimestamp = parsedData.timestamp;

  if (temperature > MAX_TEMP || temperature < MIN_TEMP) {
    exceededTimestamps.push(parsedData.timestamp)
    console.warn(`\nBATTERY TEMP OUT OF SAFE RANGE!!!: ${temperature}°C at time ${currentTimestamp/1000} seconds\n`);
  }
  //filtering out old times
  exceededTimestamps = exceededTimestamps.filter(timestamp => currentTimestamp - timestamp <= 5000);

  if (exceededTimestamps.length > 3) {
    exceededTimestamps.length = 0;
    console.warn("\nThe temperature has exceeded the limits more than 3 times within 5 seconds!\n")


    //send warning to frontend server when there is more than 3 alerts in 5 seconds
    websocketserver.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: 'alert',
            message: `Battery temperature exceeded the safe limits more than 3 times within the last 5 seconds!`
          })
        );
      }
    })



  }

  


  return exceededTimestamps

}