const { fetchMyIP,fetchCoordsByIP,fetchISSFlyOverTimes} = require('./iss');

//const { nextISSTimesForMyLocation } = require('./iss');
// nextISSTimesForMyLocation((error, passTimes) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }
//   // success, print out the deets!
//   console.log(passTimes);
// });


fetchMyIP((error, ip) => {
  if (error) {
    return console.log("It didn't work!" , error);
  }
  console.log('It worked! Returned IP:' , ip);

  //fetchCoordsByIP() nested callback Implementation
  fetchCoordsByIP(`http://ipwho.is/${ip}`, (error,coords) =>{
    if (error) {
      console.log("It didn't work!" , error);
    }
    console.log('It worked! Returned IP coordinates:' , coords);
  
    //fetchISSFlyOverTimes() nested callback Implementation
   
    fetchISSFlyOverTimes(coords, (error,passes) =>{
      if (error) {
        console.log("It didn't work!" , error);
      } else {
        console.log('It worked! Returned passes:' , passes);
      }
    });

  }
  );
  
});


/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */

