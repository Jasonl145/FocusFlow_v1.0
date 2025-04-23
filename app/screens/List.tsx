import { SafeAreaView, Text, Button } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native';
import { firebase_auth } from '../../FirebaseConfig';

interface RouterProps{
    navigation: NavigationProp<any,any>;
}

const List = ({ navigation } : RouterProps) => {
  return (
    <SafeAreaView>
      <Button onPress={() => firebase_auth.signOut()} title="Sign Out"/>
      <Button onPress={() => navigation.navigate('Home')} title="Explore"/>
    </SafeAreaView>
  );
};

export default List