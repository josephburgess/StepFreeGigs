import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Button } from '@rneui/themed';
import Collapsible from 'react-native-collapsible';
import BuyTicketsButton from '../buyTicketsButton/buyTicketsButton';
import Venue from '../../assets/arena.png';
import Distance from '../../assets/distance.png';
import Pound from '../../assets/pound-symbol.png';

export default function Event({ eventData, navigation, currentLocation }) {
  const { eventName, priceRanges, venue, url, distance, venuePostcode, image } =
    eventData;
  const [isExpanded, setExpanded] = useState(false);

  const onPress = () => {
    setExpanded(!isExpanded);
  };
  return (
    <View style={styles.eventContainer}>
      <TouchableOpacity onPress={onPress} testID='eventButton'>
        <View style={styles.eventHeader}>
          <View style={styles.eventHeaderLeft}>
            <View style={styles.nameContainer}>
              <Image source={{uri: image}} style={styles.thumbnail} />
              <Text style={styles.eventName}>{eventName}</Text>
            </View>
            <View style={styles.venueContainer}>
              <Image source={Venue} style={styles.venueImage} />
              <Text style={styles.eventVenue}>{venue}</Text>
            </View>
          </View>
          {/* <Text>{date}</Text> */}
          <View style={styles.eventHeaderRight}>
            <View style={styles.pricesContainer}>
              <Image source={Pound} style={styles.poundImage} />
              { priceRanges && 
                <Text style={styles.eventPrice}>{priceRanges.replace(/£/g, '')}</Text>
              }
            </View>
            <View style={styles.distanceContainer}>
              <Image source={Distance} style={styles.distanceImage} />
              { distance &&
                <Text style={styles.eventDistance}>{distance.replace('miles', 'mi')}</Text>
              }
            </View>
          </View>
        </View>
        <Collapsible collapsed={!isExpanded}>
          <View
            style={styles.eventFooter}
            testID='collapsible'
            isCollapsed={!isExpanded}
          >
            <BuyTicketsButton url={url} />
            <Button
              onPress={() => {
                navigation.push('Journey', {
                  currentLocation: currentLocation,
                  endLocation: venuePostcode,
                });
              }}
              size='sm'
              color='#FFA458'
              testID='journeyButton'
            >
              View Route
            </Button>
          </View>
        </Collapsible>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  eventContainer: {
    backgroundColor: '#D3D3D3',
    padding: 15,
    paddingBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 6,
    borderRadius: 10,
    position: 'relative'
  },
  eventHeader: {
    Width: '95%',
    minHeight: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventHeaderLeft: {
    maxWidth: '80%',
  },
  eventHeaderRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '20%',
  },
  pricesContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  poundImage: {
    width: 18,
    height: 18,
    marginRight: 5
  },
  eventPrice: {
    fontSize: 15,
    textAlign: 'left',
    maxWidth: 45,
    fontSize: 13,
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10
  },
  eventName: {
    fontWeight: 700,
    fontSize: 18,
    maxWidth: '75%',
  },
  distanceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  distanceImage: {
    width: 18,
    height: 18,
    marginRight: 4
  },
  eventDistance: {
    textAlign: 'right',
    marginTop: 8,
    fontSize: 13,
    fontWeight: 300
  },
  eventVenue: {
    fontSize: 16,
  },
  eventFooter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
    minHeight: 30,
  },
  venueContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  venueImage: {
    width: 18,
    height: 18,
    marginRight: 5
  },
});
