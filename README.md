# 🚀🌌International Space Station (ISS) Overhead Pass Time Finder

This Node.js command-line application retrieves the International Space Station (ISS) overhead pass times for the user's current location using APIs from [ipify](https://www.ipify.org/), [IPWHOIS](https://ipwhois.io/) and [ISS-Flyover](https://wheretheiss.at/w/developer). 

## Overview
The application uses four functions that are used in a nested-callback implementation to determine the next 5 upcoming ISS fly overs for the user's current location and provides them as statements:

- fetchMyIP: makes a single API request to retrieve the user's IP address.
- fetchCoordsByIP: makes a single API request to retrieve the latitude and longitude for a given IPv4 address.
- fetchISSFlyOverTimes: makes a single API request to retrieve upcoming ISS flyover times for a given latitude and longitude coordinates.
- nextISSTimesForMyLocation: orchestrates the multiple API requests in order and converts the pass times into date format for better readability.

## Getting Started
- Clone or download the repository.
- Open your terminal or command prompt and navigate to the project directory.
- Run `npm install` to install the required dependencies.

## Usage
In your terminal or command prompt, run the command `node index.js.` This will execute the program.

## Acknowledgments
This application was developed as part of the curriculum for Lighthouse Labs Web Development Bootcamp.