import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import Step from '../step/step';

export default function Leg({ summary, steps }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <View style={styles.legContainer}>
        <Text style={styles.legHeading} testID='Leg'>
          {summary?.replace('Walk', 'Travel')}
        </Text>

        {steps && steps.length > 0 && (
          <Button
            onPress={() => {
              setIsExpanded(!isExpanded);
            }}
            title={isExpanded ? 'Hide steps' : 'Show steps'}
            size='sm'
            color='#FFA458'
            testID='showSteps'
          />
        )}

        {isExpanded &&
          steps &&
          steps.map((step, key) => <Step key={key} step={step} />)}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  legContainer: {
    backgroundColor: '#D3D3D3',
    padding: 15,
    paddingBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 6,
  },
  legHeading: {
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 8,
  },
});
