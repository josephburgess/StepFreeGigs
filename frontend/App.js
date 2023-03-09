import { StyleSheet, View } from 'react-native';

import SearchScreen from './components/searchScreen/searchScreen';
import JourneyScreen from './components/journeyScreen/journeyScreen';
import * as Location from 'expo-location';

import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function App() {
  const [currentLocation, setCurrentLocation] = useState({
    //default location random spot in london
    latitude: 51.537187,
    longitude: 0.050094,
  });

  console.log(currentLocation);
  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        console.log('Error getting location', error);
      }
    };
    getLocation();
  }, []);

  return (

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Search'
        screenOptions={{
          contentStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      >

        <Stack.Screen
          name='Search'
          component={SearchScreen}
          initialParams={{ currentLocation }}
          options={{
            headerStyle: {
              backgroundColor: '#FFA458',
            },
            headerTintColor: '#FFA458',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            // additional styles for the SearchScreen component can go here
          }}
        />
        <Stack.Screen name='Journey' component={JourneyScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
