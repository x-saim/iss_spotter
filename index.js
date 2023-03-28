const { fetchMyIP, fetchCoordsByIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

fetchCoordsByIP(`https://ipwho.is/${process.argv[2]}`, (error,data) =>{
  if(error) {
  console.log(error);
  } else {
    console.log(data);
  }
});