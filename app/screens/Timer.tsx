import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const Timer = () => {
  return (
    <View style={styles.container}>
      <Text>Timer</Text>
      <TouchableOpacity style={styles.startButton}>
        <Text>Start timer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Timer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center'
  },
  startButton: {
    width: '90%',
      marginVertical: 15,
      backgroundColor: '#5C6BC0', // A lighter indigo to complement the title color
      padding: 20,
      borderRadius: 15, // Matching rounded corners for consistency
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#5C6BC0', // Shadow color to match the button for a cohesive look
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 5,
      elevation: 5
  }
});