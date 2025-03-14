
interface VehicleData {
  battery_temperature: number | string;
  timestamp: number;
}

const MAX_TEMP : number = 80;
const MIN_TEMP : number = 20;


export function validateData(data: VehicleData) : boolean {

  //check if the batter_temperature key exists
  if (!data.hasOwnProperty('battery_temperature')) {
    throw Error(("Data is in the wrong format!"))
  } 

  //checking if the temperature variable in data is a number
  if (typeof data.battery_temperature !== 'number') {
    throw Error("Data is in the wrong format!")
  }

  return true;
}

export function alertFunction(parsedData: VehicleData, exceededTimestamps: number[]) : number[] {

  const temperature = Number(parsedData.battery_temperature)
  
  const currentTimestamp = parsedData.timestamp;

  if (temperature > MAX_TEMP || temperature < MIN_TEMP) {
    exceededTimestamps.push(parsedData.timestamp)
    console.warn(`\nBATTERY TEMP OUT OF SAFE RANGE!!!: ${temperature}°C at time ${currentTimestamp/1000} seconds\n`);
  }
  //filtering out old times
  exceededTimestamps = exceededTimestamps.filter(timestamp => currentTimestamp - timestamp <= 5000);

  if (exceededTimestamps.length > 4) {
    exceededTimestamps = []
    throw Error("\nThe temperature has exceeded the limits more than 3 times within 5 seconds!\n")
  }

  return exceededTimestamps

}