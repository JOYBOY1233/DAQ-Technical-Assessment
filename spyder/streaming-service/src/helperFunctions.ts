
interface VehicleData {
  battery_temperature: number | string;
  timestamp: number;
}


export function validateData(data: VehicleData) : boolean {

  //check if the batter_temperature key exists
  if (!data.hasOwnProperty('battery_temperature')) {
    return false
  } 

  //checking if the temperature variable in data is a number
  if (typeof data.battery_temperature !== 'number') {
    return false
  }

  return true;
}