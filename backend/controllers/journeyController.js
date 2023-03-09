const TFLClient = require('../clients/TFLClient.js');

const tflClient = new TFLClient();

const JourneyController = {
  Index: async (req, res) => {
    try {
      const { start, destination } = req.query;
      if (!start || !destination) {
        res.status(400).send('Bad request');
        return;
      }
      const directions = await tflClient.getDirections(start, destination);

      res.status(200).json({ directions });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  },
};

module.exports = JourneyController;
