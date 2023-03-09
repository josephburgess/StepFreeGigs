// const Axios = require('axios');
// const ticketMasterAPIKey = require('../ticketMasterAPIKey');
const axios = require('./axios.js');
const dotenv = require('dotenv');


class TicketmasterClient {
  constructor() {
    this.baseUrl = 'https://app.ticketmaster.com/discovery/v2';
  }

  async getEvents(latlong, radius) {
    const response = await axios.get(`${this.baseUrl}/events`, {
      params: {
        apikey: process.env.TICKET_MASTER_API_KEY,
        latlong,
        radius,
        unit: 'miles',
        sort: 'date,asc',
        classificationId: 'KZFzniwnSyZfZ7v7nJ',
      },
      cache: {
        ttl: 1000 * 60 * 10, // 10 minutes
      }
    });

    let events = []

    if (response.data.hasOwnProperty('_embedded')){
      events = response.data._embedded.events.map((event) => {
        return {
          id: event.id,
          eventName: event.name,
          url: event.url,
          date: event.dates.start.dateTime,
          priceRanges: event.priceRanges
            ? `£${event.priceRanges[0].min} - £${event.priceRanges[1].max}`
            : 'Prices not found!',
          venue: event._embedded.venues[0].name,
          venueAddress: event._embedded.venues[0].address.line1,
          venuePostcode: event._embedded.venues[0].postalCode,
          image: event.images[0].url,
          distance: `${event.distance} miles`,
        };
      });
    }

    return events;
  }
  catch(error) {
    console.error(error);
  }
}

// THIS CAN BE DELETED - Just here to check API keys work
// const client = new TicketmasterClient();
// client
//   .getEvents('51.4919120,-0.1692555', 5)
//   .then((response) => console.log(response));

module.exports = TicketmasterClient;
