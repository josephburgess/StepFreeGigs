const TicketMasterClient = require('../clients/ticketMasterClient.js');
const GooglePlacesClient = require('../clients/googlePlacesClient.js');

const client = new TicketMasterClient();
const googleClient = new GooglePlacesClient();

const EventsController = {
  Index: async (req, res) => {
    try {
      const { latlong, radius } = req.query;
      if (!latlong || !radius) {
        res.status(400).send('Bad request');
        return;
      }

      const events = await client.getEvents(latlong, radius);
      const accessibleEvents = await getAccessibleEvents(events, googleClient);

      res.status(200).json({ accessibleEvents });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  },
};

const getAccessibleEvents = async (events, googleClient) => {
  const accessibleEvents = [];
  for (const event of events) {
    if (accessibleEvents.length === 10) break;

    const venueName = event.venue;
    const placeId = await googleClient.getPlaceId(venueName);
    if (!placeId) continue;

    const venueDetails = await googleClient.getVenueDetails(placeId.placeId);
    if (venueDetails && venueDetails.wheelchair_accessible_entrance) {
      accessibleEvents.push(event);
    }
  }

  return sortEventsByDistance(accessibleEvents);
};

const sortEventsByDistance = (events) => {
  return events.sort((a, b) => {
    const aDistance = parseFloat(
      a.distance.slice(0, a.distance.indexOf(' miles'))
    );
    const bDistance = parseFloat(
      b.distance.slice(0, b.distance.indexOf(' miles'))
    );
    return aDistance - bDistance;
  });
};

module.exports = EventsController;
