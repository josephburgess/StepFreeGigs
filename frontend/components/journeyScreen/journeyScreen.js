import React, { useEffect, useState } from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import RouteMap from '../map/map';
import axios from 'axios';
import Leg from '../leg/leg';
import wheelchair from '../../assets/wheelchair-icon.gif';

export default function JourneyScreen({ navigation, route }) {
  const { currentLocation, endLocation } = route.params;
  const [directions, setDirections] = useState(null);
  const [displayType, setDisplayType] = useState('Steps');
  const [isLoading, setIsLoading] = useState(true);
  const viewMap = () => {
    setDisplayType('Map');
  };
  const viewSteps = () => {
    setDisplayType('Steps');
  };

  useEffect(() => {
    const getDirections = async () => {
      try {
        const result = await axios.get(
          'https://step-free-gigs.onrender.com/journey',
          {
            params: {
              start: `${currentLocation.latitude},${currentLocation.longitude}`,
              destination: endLocation,
            },
          }
        );
        setDirections(result.data.directions);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    if (!directions) getDirections();
  }, []);

  return (
    <>
      <View>
        <Button
          title='Steps'
          onPress={viewSteps}
          testID='Steps button'
          size='sm'
          color='#FFA458'
        ></Button>
        <Button
          title='Map'
          onPress={viewMap}
          testID='Map button'
          size='sm'
          color='#FFA458'
        ></Button>
      </View>
      <ScrollView>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Image
              testID='wheelchair'
              source={wheelchair}
              style={styles.wheelchair}
            />
            <Text>Loading... </Text>
          </View>
        ) : displayType === 'Steps' ? (
          directions &&
          directions.journeys[0].legs.map((leg, index) => (
            <Leg
              key={`Journey-${index}`}
              summary={leg.instruction.summary}
              steps={leg.instruction.steps}
            />
          ))
        ) : (
          directions && (
            <View style={styles.map}>
              <Text testID='Map'>Route map:</Text>
              <RouteMap legs={directions.journeys[0].legs} />
            </View>
          )
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  wheelchair: {
    height: 200,
    width: 200,
  },
  loadingContainer: {
    display: 'flex',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
