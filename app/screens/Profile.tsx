import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { firebase_auth } from "../../FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import AccountIcon from "../../assets/AccountIcon.svg";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

// Profile screen component
const Profile = ({ navigation }: RouterProps) => {
  const [username, setUsername] = useState("Username"); // Editable username
  const userEmail = firebase_auth.currentUser?.email || "No email available"; // Get the user's email
  const [totalTasksDone, setTotalTasksDone] = useState<number>(0); // State for completed tasks

  // Check amount of completed tasks
  const fetchCompletedTasks = async () => {
    const user = firebase_auth.currentUser;
    if (user) {
      try {
        const tasksCollection = collection(db, "tasks");
        const completedTasksQuery = query(
          tasksCollection,
          where("user_id", "==", user.uid),
          where("isCompleted", "==", true)
        );
        const querySnapshot = await getDocs(completedTasksQuery);
        setTotalTasksDone(querySnapshot.size); // Update the total tasks done
      } catch (error) {
        console.error("Error fetching completed tasks: ", error);
      }
    }
  };

  // Re-fetch tasks whenever the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchCompletedTasks();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <AccountIcon width={150} height={150} />
      </View>

      {/* Account Details Section */}
      <View style={styles.accountDetailsContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userEmail}</Text>

        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.usernameInput}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
        />

        {/* Total Tasks Done */}
        <Text style={[styles.label, { marginTop: 20 }]}>Total Tasks Done:</Text>
        <Text style={styles.value}>{totalTasksDone}</Text>
      </View>

      {/* Custom Buttons */}
      <TouchableOpacity
        style={[styles.button, styles.exploreButton]}
        onPress={() => navigation.navigate("HomeTab")} // Navigate to HomeTab
      >
        <Text style={styles.buttonText}>Explore</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.signOutButton]}
        onPress={() => firebase_auth.signOut()} // Signs out user and sends them to the login screen
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Start from the top
    alignItems: "center", // Center horizontally
    paddingTop: 50, // Add padding to move content lower
    backgroundColor: "#7289DA", // Blurple background
  },
  iconContainer: {
    marginBottom: 35, // Space below the icon
  },
  accountDetailsContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "#FFFFFF", // White background for the details section
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A237E",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "#3C4858",
    marginBottom: 15,
  },
  usernameInput: {
    height: 40,
    borderColor: "#E8EAF6",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#3C4858",
  },
  button: {
    width: "90%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  exploreButton: {
    backgroundColor: "#FFFFFF", // Green color for Explore
  },
  signOutButton: {
    backgroundColor: "#FFFFFF", // Red color for Sign Out
  },
  buttonText: {
    color: "#000000", // White text
    fontSize: 16,
    fontWeight: "bold",
  },
});