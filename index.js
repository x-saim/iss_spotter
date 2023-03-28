const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = (passTimes) => {
  for (const e of passTimes) {

    //We pass the risetime value as an argument to the Date constructor after multiplying it by 1000. This is because risetime is in Unix timestamp format, which is in seconds since January 1, 1970, whereas Date works with Unix timestamp format in milliseconds.

    const riseTimeDate = new Date(e.risetime * 1000);
    const printStatement = `Next pass at ${riseTimeDate} for ${e.duration} seconds!`;
    console.log(printStatement);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  printPassTimes(passTimes);
});