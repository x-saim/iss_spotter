//logic for fetching the data from each API endpoint.

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
    if(error) {
      //pass through the error to the callback if an error occurs when requesting the IP data.
      callback(error,null);
    } else {
      //parse and extract the IP address using JSON and then pass that through to the callback (as the second argument) if there is no error.
      const extractedIP = JSON.parse(body);
      callback(null,extractedIP["ip"]);
    }
  });
};

module.exports = { fetchMyIP };