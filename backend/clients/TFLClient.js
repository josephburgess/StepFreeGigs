
// const tflAPIKey = require('../tflAPIKey');
// const tflAPIId = require('../tflAPIId');
const axios = require('./axios.js');
const dotenv = require('dotenv');


class TFLCLient {
  constructor() {
    this.baseUrl = 'https://api.tfl.gov.uk/journey/journeyresults';
  }

  async getDirections(start, destination) {
    const response = await axios.get(

      `${this.baseUrl}/${start}/to/${destination}?accessibilityPreference=StepFreeToVehicle&app_key=${process.env.TFL_API_KEY}&app_id=${process.env.TFL_API_ID}`, {
        cache: {
          ttl: 1000 * 60 * 10, // 10 minutes
        }
      }

    );

    const directions = {
      journeys: response.data.journeys,
      lines: response.data.lines,
    };

    return directions;
  }
  catch(error) {
    console.error(error);
  }
}

// const client = new TFLCLient();
// client
//   .getDirections('SW3 3QF', 'SW99SL')
//   .then((response) => console.log(response.journeys[0].legs));

module.exports = TFLCLient;
