import { SafeAreaView, Text, Button, View, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { NavigationProp } from '@react-navigation/native';
import { firebase_auth } from '../../FirebaseConfig';
import { OverlayContext } from './components/OverlayContext'; 

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {
  const { toggleOverlay } = useContext(OverlayContext);

  return (
    <SafeAreaView>
      <Button onPress={() => firebase_auth.signOut()} title="Sign Out" />
      <Button onPress={() => navigation.navigate('Home')} title="Explore" />
      <Button 
        onPress={toggleOverlay} 
        title="Toggle Overlay" 
        color="#8a2be2" //Purple color for the button
      />
    </SafeAreaView>
  );
};

export default List;