const request = require("request");

//fetchMyIP which will asynchronously return our IP Address using an API.
const fetchMyIP = function(callback) {
  //use request to fetch IP address from JSON API
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    
    //error can be set if invalid domain, user is offline, etc.
    if (error) return callback(error,null);

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }

    //parse and extract the IP address using JSON and then pass that through to the callback (as the second argument) if there is no error.
    const extractedIP = JSON.parse(body).ip;
    callback(null,extractedIP);
  }
  );
};

const fetchCoordsByIP = function(ip, callback) {
  request(ip, (error, response, body) => {
    //error handle for request
    if (error) return callback(error,null);

    //error handling for invalild IP Address
    const parsedBody = JSON.parse(body);
    const sucessCheck = JSON.parse(body).success;
    if (sucessCheck === false) {
      callback(Error(`Error: ${JSON.parse(body).message}`), null);
      return;
    }
    
    //accessing only the lat/long key:value pairs from the site's JSON body.
    const { latitude, longitude } = parsedBody;
    callback(null,{ latitude, longitude });
  }
  );
};

const fetchISSFlyOverTimes = (coords, callback) => {
  const searchLink = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(searchLink, (error,response,body) => {

    //error handle for request fail.
    if (error) return callback(error, null);

    //error handle for invalid URL or incorrect coordinates.
    if (response.statusCode !== 200) {
      console.error(`Status Code ${response.statusCode}: Error: ${body}.`);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null,passes);
  }

  );
};


const nextISSTimesForMyLocation = (callback) => {
  //fetchMyIP() nested callback Implementation
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error,null);
    }
    console.log('It worked! Returned IP:' , ip);

    //fetchCoordsByIP() nested callback Implementation
    fetchCoordsByIP(`http://ipwho.is/${ip}`, (error,coords) =>{
      if (error) {
        return callback(error,null);
      }
      console.log('It worked! Returned IP coordinates:' , coords);

      //fetchISSFlyOverTimes() nested callback Implementation
      fetchISSFlyOverTimes(coords, (error,passes) =>{
        if (error) {
          return callback(error,null);
        }
        console.log('It worked! Returned passes:', passes);

        callback(null,passes);

      });
    });

  }
  );
};
  
module.exports = {nextISSTimesForMyLocation};