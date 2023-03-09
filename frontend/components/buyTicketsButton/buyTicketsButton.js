import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Alert,
  Linking,
} from 'react-native';
import { Button } from '@rneui/themed';

export default function BuyTicketsButton({ url }) {
  const handlePress = async () => {
    const validURL = await Linking.canOpenURL(url);
    validURL
      ? await Linking.openURL(url)
      : Alert.alert(`Cannot open URL: ${url}`);
  };

  return (
    <Button 
      onPress={handlePress} 
      testID='Buy Tickets button'
      size='sm'
      color='#FFA458'
    >
      Buy Tickets
    </Button>
  );
}
