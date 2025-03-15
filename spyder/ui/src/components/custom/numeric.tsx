import {cn} from "@/lib/utils"
interface TemperatureProps {
  temp: any;
}

const getTemperatureColor = (temp: number) => {
    if (temp < 20 || temp > 80) return 'text-red-500';   // too high or too low
    if (temp >= 25 && temp <= 75) return 'text-green-500';  // good range
    if ((temp < 25 && temp>= 20) || temp > 75 && temp <=80 ) return 'text-yellow-500'; // too high
    return 'text-gray-500';  // default color if temp is not set
  }

/**
 * Numeric component that displays the temperature value.
 * 
 * @param {number} props.temp - The temperature value to be displayed.
 * @returns {JSX.Element} The rendered Numeric component.
 */
function Numeric({ temp }: TemperatureProps) {
  // TODO: Change the color of the text based on the temperature
  // HINT:
  //  - Consider using cn() from the utils folder for conditional tailwind styling
  //  - (or) Use the div's style prop to change the colour
  //  - (or) other solution

  // Justify your choice of implementation in brainstorming.md
  const temperatureColor = getTemperatureColor(temp)
  return (
    <div className={cn("text-foreground text-4xl font bold",getTemperatureColor(temp))}>
      {`${temp}°C`}
    </div>
  );
}

export default Numeric;
