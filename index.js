const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});


// for (const key in passes) {
//   const riseTimeDate = new Date(passes.risetime * 1000);
//   const passTimes = `Next pass at ${riseTimeDate} for ${passes.duration} seconds`;
//   callback(null,passTimes);