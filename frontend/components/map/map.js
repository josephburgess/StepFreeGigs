import React, { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

export default RouteMap = ({ legs }) => {
  const [mapLayout, setMapLayout] = useState(null);
  const mapViewRef = useRef(null);
  const onMapLayout = (event) => {
    setMapLayout(event.nativeEvent.layout);
  };

  const startMarker = (
    <Marker
      key={0}
      coordinate={{
        latitude: legs[0].departurePoint.lat,
        longitude: legs[0].departurePoint.lon,
      }}
      title={`Start at ${legs[0].departurePoint.commonName}`}
      description={legs[0].instruction.summary?.replace('Walk', 'Travel')}
      numberOfLines={2}
      pinColor='#009688'
      testID='start-marker'
    />
  );

  const markers = [startMarker].concat(
    legs.map((leg, index) => {
      const nextLeg = legs.slice(index + 1, index + 2)[0];
      const title =
        nextLeg?.instruction.summary?.replace('Walk', 'Travel') ||
        `Arrive at ${leg.arrivalPoint.commonName}`;
      const description = nextLeg
        ? `from ${nextLeg.departurePoint.commonName}`
        : '';

      return (
        <Marker
          key={index + 1}
          coordinate={{
            latitude: leg.arrivalPoint.lat,
            longitude: leg.arrivalPoint.lon,
          }}
          title={title}
          description={description}
          pinColor='#f7a45f'
          testID='marker'
        />
      );
    })
  );

  const polylines = legs.map((leg, index) => {
    const polylineCoords = JSON.parse(leg.path.lineString);
    const polylineObjects = polylineCoords.map((coord) => ({
      latitude: coord[0],
      longitude: coord[1],
    }));

    return (
      <Polyline
        key={index}
        coordinates={polylineObjects}
        strokeColor='#2196f3'
        strokeWidth={3}
        testID='polyline'
      />
    );
  });

  let region = null;
  if (mapLayout && legs.length > 0) {
    const start = legs[0].departurePoint;
    const end = legs[0].arrivalPoint;
    const coords = [start, end];

    region = {
      latitude: (start.lat + end.lat) / 2,
      longitude: (start.lon + end.lon) / 2,
      latitudeDelta: Math.abs(start.lat - end.lat) * 1.5,
      longitudeDelta: Math.abs(start.lon - end.lon) * 1.5,
    };

    mapViewRef.current.fitToCoordinates(coords, {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: false,
    });
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        style={styles.map}
        region={region}
        onLayout={onMapLayout}
        testID='map-view'
      >
        {markers}
        {polylines}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
