import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './app/screens/Login';
import List from './app/screens/List';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { firebase_auth } from './FirebaseConfig';
import Extra from './app/screens/Extra';

import {MaterialIcons, Entypo} from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();


function BottomTab() {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#255ec2', // Color for active tab
        tabBarInactiveTintColor: 'gray',  // Color for inactive tabs
      }}
    >
      <Tabs.Screen 
        name="Home" 
        component={List} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="calendar" color={color} size={size} />
          ),
        }}
        />
      <Tabs.Screen 
        name="Extras" 
        component={Extra} 
        options={{ 
          tabBarLabel: 'Extras',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="access-alarm" color={color} size={30} />
          ),
          headerShown: false 
        }} 
        />
    </Tabs.Navigator>
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
          <Stack.Screen name="Tabs" component={BottomTab} options={{ headerShown: false }}></Stack.Screen>
        ) : (
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}></Stack.Screen>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}


