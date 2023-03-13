# StepFreeGigs

StepFreeGigs is a mobility app that allows users to find, buy tickets for, and travel to events happening near them at venues in London with wheelchair accessibility. The app has been built with React Native and Expo for the front-end, Node.js and Express on the back-end, and has been tested throughout with Jest.

## Features

- [x] User can see a list of nearby wheelchair-accessible events using their device's geolocation features
- [x] User can see the price, distance, name and venue for each event
- [x] User can click a link to buy tickets to each event
- [x] User can see a list of step-free directions to reach the venue 
- [x] User can see those directions visualised on a map

## App demo

<p align="center">
<img width="300" src="https://user-images.githubusercontent.com/4661986/224706113-f53c1130-d2f5-4d7a-8a73-414ab5b45a4b.gif"/>
</p>

## Presentation

At the end of the project, the team presented to the rest of our cohort, coaches, friends and family, as well as prospective Makers students at the Makers Demo Day. Here we detailed our team values and our approach, the tech used, and reflections, as well as a demo of the app. Click the image to access the slides.

<p align="center">
<a href="https://www.canva.com/design/DAFcskqfKt0/7QwtNvJiBgAxgrFqSo7bnQ/view">
<img width="400" alt="image" src="https://user-images.githubusercontent.com/4661986/224707330-658897f0-01ba-4df6-b269-dc997abd5d9c.png">
</a>
</p>

## How to try the project

### Setup

1. Clone the repo
2. Install Node.js dependencies

   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install

   ```

### Running

_To run on your desktop, you will need [Android Studio](https://developer.android.com/studio/) or [Xcode](https://developer.apple.com/xcode/), to run on your personal device you will need the [Expo](https://expo.dev/) app for [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) or [iOS](https://apps.apple.com/us/app/expo-go/id982107779)._

1.  Start the metro bundler:

   ```bash
   cd frontend
   npm start
   ```

2.  To open the app on your device, make sure your device is on the same WiFi network as your terminal running the bundler and scan the QR code using the Expo app.

3.  To open the app in an android emulator, first set up and and run a device using the Virtual Device Manager in Android Studio, before pressing `a` in the terminal session.

4. To open the app in an iOS emulator, press `i` (you will need [Xcode](https://developer.apple.com/xcode/) installed)


## Testing

We used Jest for testing both the front-end and back-end, with 100% of our 64 tests passing. You can run the tests with the `jest` command in both the front and back end respectively.

## APIs used

The bulk of the complexity with this app lay in the several API calls being made. The process on the backend is outlined below:

1. User location is determined by the `expo-location` package and stored as a latitude/longitude value
2. Location is sent to [Ticketmaster Discovery API](https://developer.ticketmaster.com/api-explorer/v2/) which returns a list of nearby events filtered by the music category.
3. Events are iterated through with venue names being sent to the [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview) which then returns venue information.
4. Given some limitations with the Google Places API, the Place ID returned in step 3 needed to be sent back to the Google Places API for it to return the wheelchair accessibility information.
5. If a venue is wheelchair accessible, the Event is added to the list until 10 are found which are then displayed to the user.
6. If a user wishes to travel to a venue, the user's current location, along with the venue location, are sent to the [Transport For London Journey Planner API](http://jpapi.tfl.gov.uk/ticc/XSLT_TRIP_REQUEST2?language=en)
7. The TFL API returns step-free routing information for the venue, which is then rendered as both text-based instructions and also plotted on a `react-native-maps` interface using the coordinates provided by TFL with Polyline and Marker components.

## Challenges

In the brainstorming process we realised we would probably have to rely on several APIs to achieve our MVP. With this in mind the first hurdle was to ensure we could find appropriate APIs that would return the required information and also ensure that these could all work in tandem. We first found that Wheelchair Accessibility data from Ticketmaster was unreliable, so we had to add the Google Places API call to get this information.

We had also hoped that, given that Google Maps can display step-free directions in the App, that the API would have similar functionality. However, this was not the case... We had the same realisation with the CityMapper API, which also natively supports step-free routing but did not have an API query for the same functionality. When we finally settled on the TFL API which would, in fact, offer this information, we realised there would be extra work to be done to translate the steps and coordinates provided by TFL into information displayed on a map. 

Another issue we ran into was in choosing the correct testing framework for the front-end. We all had experience with Cypress and found it to be an excellent platform for front-end development, however it transpired that it was not cut out for component testing on mobile platforms so we had to scrap Cypress and learn how to use Jest for testing React-Native front-ends.

## Reflections

Overall, we are extremely pleased with the outcome of this project. It was our first time working in a large group where there were no prescribed instructions or requirements for the project and we had full freedom. This presented new challenges in how we work but we found it to be extremely rewarding. We are very proud with the amount of functionality and polish achieved despite using unfamiliar technologies and having just 7-8 days to create a finished product.
