import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Button,
  Dimensions,
  View,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import Event from '../event/event';
import logo from '../../assets/stepfreegigs-logo.png';
import wheelchair from '../../assets/wheelchair-icon.gif';

export default function SearchScreen({ navigation, route }) {
  const { currentLocation } = route.params;
  const events = useRef([]);
  const [eventsStatus, setEventsStatus] = useState('Unloaded');

  const getEvents = async () => {
    try {
      const eventsData = await axios.get(
        `https://step-free-gigs.onrender.com/events`,
        {
          params: {
            latlong: `${currentLocation?.latitude},${currentLocation?.longitude}`,
            radius: '5',
          },
        }
      );
      events.current = eventsData.data.accessibleEvents;
      setEventsStatus('Loaded');
    } catch (error) {
      console.log('Error retrieving events:', error);
    }
  };

  const renderClearButtonAndEvents = () => {
    return (
      <>
        <Button
          title='clear'
          testID='clearButton'
          size='sm'
          color='#FFA458'
          onPress={() => {
            setEventsStatus('Unloaded');
          }}
        />
        {events.current.map((data, index) => (
          <Event
            currentLocation={currentLocation}
            eventData={data}
            key={index}
            navigation={navigation}
            testID='Event'
          />
        ))}
      </>
    );
  };

  const renderLoadingAnimation = () => {
    return (
      <View style={styles.loadingContainer}>
        <Image
          testID='wheelchair-loading'
          source={wheelchair}
          style={styles.wheelchair}
        />
        <Text>Loading... </Text>
      </View>
    );
  };

  const renderLogo = () => {
    return (
      <>
        <View style={styles.logoContainer}>
          <Image testID='logo' source={logo} style={styles.logo} />
        </View>
      </>
    );
  };

  return (
    <ScrollView testID='SearchScreen'>
      <Button
        onPress={() => {
          getEvents(), setEventsStatus('Loading');
        }}
        title='Find events near me!'
        testID='search-button'
        size='sm'
        color='#FFA458'
      />
      {eventsStatus === 'Loaded'
        ? renderClearButtonAndEvents()
        : eventsStatus === 'Loading'
        ? renderLoadingAnimation()
        : renderLogo()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 400,
    height: 400,
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 'auto'
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
