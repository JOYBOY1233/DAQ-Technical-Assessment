# Brainstorming

This file is used to document your thoughts, approaches and research conducted across all tasks in the Technical Assessment.

## Firmware

## Spyder
Step 1:
 - I added the nodemon execution for only the dev script whenever the dev script is run.

Step 2:
- I created a new helper function called validateData which checks whether or not the data received from dataEmulator is a number and also is in the right object form.
- Everytime that invalid data is passed i print to the terminal that invalid data was passed and the time at which it was passed similar to how it displays when valid data is passed.

Step 3:
- I added a helper function called alertFunciton that monitors the temperature of the battery and warns the user when the temp exceeds the limits 3 times within a 5 second window. 

Step 4: 
- I added readyState to the dependency array of the hook in page.tsx in order for the hook to run every time the state of readyState changes. Now the status of the connection updates. 

Step 5: 
- I used the Math.round function to round the temperature in the server.ts file
- I added the conditional colouring of the number using the cn() function in the numeric.tsx file

Note:
- I decided to not use error but warnings because the temp limit exceeding isnt really an error, but more a warning.
- for some reason i need to run npm run-dev in the ui directory for the wesbite updating step to happen (i.e for connecting to change to connected and for overall changes to code to be reflected on the website). But the docker file in ui does not do this therefore i modified the docker.yml file in the spyder directory to do "npm run dev" for building the ui. Im not sure why i need to do this however so this needs to be investigated. But for now it allows for hot reloading and also updates the conncection status.

## Cloud