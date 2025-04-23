import { SafeAreaView, Text, Button } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native';
import { userTasks } from '../../lib/constants';
import { firebase_auth } from '../../FirebaseConfig';

interface RouterProps{
    navigation: NavigationProp<any,any>;
}

const List = ({ navigation } : RouterProps) => {
  return (
    <SafeAreaView>
      <Button onPress={() => firebase_auth.signOut()} title="Sign Out"/>
      <Button onPress={() => navigation.navigate('Home')} title="Explore"/>
      <Button onPress={() => 
        {
          // Clear all items
          Object.keys(userTasks).forEach((key) => {
            delete userTasks[key];
          });
        }
      } title="Clear all tasks"/> {/*temporary clear items functionality*/}
    </SafeAreaView>
  );
};

export default List