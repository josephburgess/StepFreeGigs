import axios from 'axios';
const API_KEY = '7elxdku9GGG5k8j0Xm8KWdANDgecHMV0';

class TicketmasterClient {
  constructor() {
    this.baseUrl = 'https://app.ticketmaster.com/discovery/v2';
  }

  async getEvents(latlong, radius) {
    const response = await axios.get(`${this.baseUrl}/events`, {
      params: {
        apikey: API_KEY,
        latlong,
        radius,
        unit: 'miles',
        sort: 'date,asc',
        classificationId: 'KZFzniwnSyZfZ7v7nJ',
      },
    });

    const events = response.data._embedded.events.map((event) => {
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
      };
    });
    return events;
  }
  catch(error) {
    console.error(error);
  }
}

export default TicketmasterClient;
