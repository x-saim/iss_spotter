const { fetchMyIP,fetchCoordsByIP} = require('./iss');

//constants


// nextISSTimesForMyLocation((error, passTimes) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }

//   fetchMyIP((error, ip) => {
//     if (error) {
//       return console.log("It didn't work!" , error);
      
//     }
//     console.log('It worked! Returned IP:' , ip);
  

//     fetchCoordsByIP(ip, (error,coords) =>{
//       if (error) {
//         return console.log("It didn't work!" , error);
//       }
//       console.log('It worked! Returned IP coordinates:' , coords);
      
    
//     }
    
    
//     });

//     console.log(passTimes);
//   });


//console.log(passTimes);


//fetchMyIP() Implementation

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


  }
  );
  
});

//fetchCoordsByIP() Implementation

// fetchCoordsByIP(`http://ipwho.is/${ip}`, (error,coords) =>{
//   if (error) {
//   console.log("It didn't work!" , error);
//   }
//   console.log('It worked! Returned IP coordinates:' , coords);
  
//   }
// );


//fetchISSFlyOverTimes() Implementation
// const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };
// fetchISSFlyOverTimes(exampleCoords, (error,passes) =>{
//   if (error) {
//     console.log("It didn't work!" , error);
//   } else {
//     console.log('It worked! Returned passes:' , passes);
//   }
// });


/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */

