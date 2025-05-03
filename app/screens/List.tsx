import { SafeAreaView, Text, Button, View, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { NavigationProp } from '@react-navigation/native';
import { firebase_auth } from '../../FirebaseConfig';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {

  return (
    <SafeAreaView style={{marginTop:100}}>
      <Button onPress={() => firebase_auth.signOut()} title="Sign Out" />
      <Button onPress={() => navigation.navigate('Home')} title="Explore" />
    </SafeAreaView>
  );
};

export default List;