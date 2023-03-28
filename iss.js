/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

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
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    //error handle for request
    if (error) return callback(error,null);

    //error handling for invalild IP Address
    const parsedBody = JSON.parse(body);
    const sucessCheck = JSON.parse(body).success;
    if (sucessCheck === false) {
      callback(Error(`Error: ${JSON.parse(body).message}`), null);
      return;
    }
      
    const { latitude, longitude } = parsedBody;
    callback(null,{latitude, longitude});
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

const fetchISSFlyOverTimes = (cords, callback) => {
  const searchLink = `https://iss-flyover.herokuapp.com/json/?lat=${cords.latitude}&lon=${cords.longitude}`;

  request(searchLink, (error,response,body) => {

  //error handle for request fail
  if(error) return callback(error, null)

  //error handle for invalid URL
  if (response.statusCode !== 200) {
    console.error(`Error: Invalid URL: ${searchLink}`);
    return;
  }

  const flyoverDataParse = JSON.parse(body).response;
  console.log(flyoverDataParse);


  }


)};


module.exports = { fetchMyIP, fetchCoordsByIP,fetchISSFlyOverTimes };