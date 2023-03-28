const request = require("request");


/**
 * fetchMyIP makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

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

/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */

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

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
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

    //fetchCoordsByIP() nested callback Implementation
    fetchCoordsByIP(`http://ipwho.is/${ip}`, (error,coords) =>{
      if (error) {
        return callback(error,null);
      }

      //fetchISSFlyOverTimes() nested callback Implementation
      fetchISSFlyOverTimes(coords, (error,passes) =>{
        if (error) {
          return callback(error,null);
        }

        callback(null,passes);

      });
    });

  }
  );
};
  
module.exports = {nextISSTimesForMyLocation};