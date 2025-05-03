import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
import List from "./app/screens/List";
import Home from "./app/screens/Home";
import Timer from "./app/screens/Timer";
import CreateTask from "./app/screens/CreateTask";
import EditTask from "./app/screens/EditTask";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { firebase_auth } from "./FirebaseConfig";
import { OverlayProvider } from "./app/screens/components/OverlayContext";

import { Entypo, MaterialIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="CreateTask"
        component={CreateTask}
        options={{ title: "Create Task" }}
      />
      <HomeStack.Screen
        name="EditTask"
        component={EditTask as React.FC}
        options={{ title: "Edit Task" }}
      />
    </HomeStack.Navigator>
  );
}

// Bottom Tab Navigator
function BottomTab() {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#255ec2", // active tab
        tabBarInactiveTintColor: "gray", // inactive tabs
      }}
    >
      <Tabs.Screen
        name="HomeTab" // different name since HomeStackNavigator uses Home
        component={HomeStackNavigator} // use the Home stack navigator here
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="calendar" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Timer"
        component={Timer}
        options={{
          tabBarLabel: "Timer",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="access-alarm" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="List"
        component={List}
        options={{
          tabBarLabel: "List",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="list" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(firebase_auth, (user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);

  return (
    <OverlayProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {user ? (
            <Stack.Screen
              name="Tabs"
              component={BottomTab}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ title: "Register" }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </OverlayProvider>
  );
}