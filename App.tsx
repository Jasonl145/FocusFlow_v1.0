import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './app/screens/Login';
import List from './app/screens/List';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { firebase_auth } from './FirebaseConfig';
import Extra from './app/screens/Extra';



const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name='My todos' component={List}/>
      <InsideStack.Screen name="Extras" component={Extra}/>
      
    </InsideStack.Navigator>
  )
}
export default function App() {
  const [user, setUser] = useState<User | null>(null)
  
  useEffect(() => {
    onAuthStateChanged(firebase_auth, (user) => {
      console.log('user', user);
      setUser(user);
    })
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false}}></Stack.Screen>
        ) : (
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false}}></Stack.Screen>
        )}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}


