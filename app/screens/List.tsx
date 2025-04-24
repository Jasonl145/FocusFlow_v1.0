import { 
  SafeAreaView, 
  Pressable, 
  Text, 
  StyleSheet,
  Button,
  View,
  Alert
} from 'react-native';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { firebase_auth } from '../../FirebaseConfig';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {
  const handleLockPress = async () => {
    try {
    
      Alert.alert("Locked", "Your phone is now locked to this app.");
    } catch (error) {
      Alert.alert("Error", "Failed to lock screen.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Your existing content */}
      <Button onPress={() => firebase_auth.signOut()} title="Sign Out" />
      <Button onPress={() => navigation.navigate('Home')} title="Explore" />

      {/* Floating Lock Button */}
      <Pressable 
        onPress={handleLockPress}
        style={styles.lockButton}
      >
        <Text style={styles.lockText}>LOCK</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', // Needed for absolute positioning of the lock button
  },
  lockButton: {
    position: 'absolute',
    bottom: 30, // Distance from bottom
    right: 30,  // Distance from right
    width: 70,  // Diameter of the circle
    height: 70,
    borderRadius: 35, // Half of width/height to make it circular
    backgroundColor: '#FF3B30', // Red color
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Shadow (Android)
    shadowColor: '#000', // Shadow (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  lockText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default List;