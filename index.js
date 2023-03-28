const { fetchMyIP, fetchCoordsByIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

const ip = process.argv[2];

fetchCoordsByIP(ip, (error,data) =>{
  if (error) {
    console.log("It didn't work!" , error);
  } else {
    console.log('It worked! Returned IP:' , data);
  }
});