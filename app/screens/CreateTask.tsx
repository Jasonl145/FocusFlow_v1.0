import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";
import { commonStyles, standardToMilitaryTime } from "../../lib/constants";
import { TaskCreateNavigationProp } from "../../lib/constants";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { db } from "../../FirebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Task } from "../../lib/constants";

// CreateTask component
const CreateTask: React.FC = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const tasksCollection = collection(db, "tasks");

  // Creating task in the database
  const createTodo = async (task: Task) => {
    if (user) {
      try {
        // Document added to task collection with user ID and timestamp
        const docRef = await addDoc(tasksCollection, {
          ...task,
          user_id: user.uid,
          created_at: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      console.log("No user logged in");
      // this else should never happen, but just in case
    }
  };
  // State variable for creating a task
  const navigation = useNavigation<TaskCreateNavigationProp>();
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskStartTime, setTaskStartTime] = useState("");
  const [taskEndTime, setTaskEndTime] = useState("");
  const [taskStrict, setTaskStrict] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);

  // Functions for entering task details
  const handleSubmit = () => {
    // first, verify inputs
    if (taskName === "") {
      alert("Please enter a task name");
      return;
    }
    if (taskDate === "") {
      alert("Please enter a task date");
      return;
    }
    // Accept only YYYY-MM-DD format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(taskDate)) {
      alert("Please enter a valid date in YYYY-MM-DD format");
      return;
    }
    if (
      (taskStartTime === "" && taskEndTime !== "") ||
      (taskStartTime !== "" && taskEndTime === "")
    ) {
      alert("Please enter both start and end times or leave them blank");
      return;
    }
    // parse for military time and for AM/PM
    const timeRegex = /^(1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm])$/;
    const militaryTimeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

if (taskStartTime === "" && taskEndTime === "") {
    // allow, do nothing
  } else if (
    (taskStartTime === "" && taskEndTime !== "") ||
    (taskStartTime !== "" && taskEndTime === "")
  ) {
    alert("Please enter both start and end times or leave them blank");
    return;
  } else {
    // Both are filled, check if both are military or both are standard
    const startIsMilitary = militaryTimeRegex.test(taskStartTime);
    const endIsMilitary = militaryTimeRegex.test(taskEndTime);
    const startIsStandard = timeRegex.test(taskStartTime);
    const endIsStandard = timeRegex.test(taskEndTime);

    if (
      (startIsMilitary && endIsMilitary) ||
      (startIsStandard && endIsStandard)
    ) {
      // pass
    } else {
      alert(
        "Please ensure both times are in the same format (either both 24-hour or both AM/PM)."
      );
      return;
    }
  }

    // create task object
    const task: Task = {
      user_id: user ? parseInt(user.uid) : 0, // replace with actual user ID from authentication
      name: taskName,
      date: taskDate, // now in YYYY-MM-DD format
      start_time:
        taskStartTime !== "" && taskStartTime !== null ? standardToMilitaryTime(taskStartTime) : null,
      end_time: taskEndTime !== "" && taskEndTime !== null ? standardToMilitaryTime(taskEndTime) : null,
      strict: !taskStartTime || !taskEndTime ? taskStrict : false, // strict mode only applies if start and end times are provided otherwise false
      isCompleted: false, // default false
    };
    // create task in database
    createTodo(task);
    // route to home screen
    navigation.navigate("Home");
  };

  return (
    //UI for CreateTask screen
    <SafeAreaView style={styles.formContainer}>
      <Text style={styles.labelText}>What task do you have?</Text>
      <TextInput
        style={commonStyles.defaultTextInput}
        placeholder="Enter task name"
        onChange={(e) => setTaskName(e.nativeEvent.text)}
        value={taskName}
      />
      <Text style={styles.labelText}>When do you want to do it?</Text>
      <TextInput
        style={commonStyles.defaultTextInput}
        placeholder="YYYY-MM-DD"
        onChange={(e) => setTaskDate(e.nativeEvent.text)}
        value={taskDate}
      />
      <Text style={styles.labelText}>
        Start and end times (24-hour or AM/PM work)
      </Text>
      <View style={styles.timeInputRow}>
        <View style={styles.timeInputContainer}>
          <Text style={styles.labelText}>From:</Text>
          <TextInput
            placeholder="Enter time"
            style={styles.timeTextInput}
            onChange={(e) => setTaskStartTime(e.nativeEvent.text)}
          />
        </View>
        <View style={styles.timeInputContainer}>
          <Text style={styles.labelText}>To:</Text>
          <TextInput
            placeholder="Enter time"
            style={styles.timeTextInput}
            onChange={(e) => setTaskEndTime(e.nativeEvent.text)}
          />
        </View>
      </View>
      <View
        style={[
          styles.checkboxContainer,
          { alignSelf: "flex-start", marginLeft: "7%" },
        ]}
      >
        <Switch
          value={taskStrict}
          onValueChange={setTaskStrict}
          trackColor={{ false: "#9E9E9E", true: "#1A237E" }}
          thumbColor={"#FAFAFA"}
          disabled={!taskStartTime || !taskEndTime}
        />
        <Text
          style={[
            styles.checkboxLabel,
            { color: taskStartTime && taskEndTime ? "#1A237E" : "red" },
          ]}
        >
          {!taskStartTime || !taskEndTime
            ? "Enter start and end times \nto toggle strict mode"
            : "Strict mode"}
        </Text>
      </View>
      <TouchableOpacity
        style={commonStyles.defaultButton}
        onPress={handleSubmit}
      >
        <Text style={commonStyles.defaultButtonText}>Create task</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateTask;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#FAFAFA",
  },
  labelText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A237E",
    marginBottom: 3,
  },
  timeInputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 20,
  },
  timeInputContainer: {
    flex: 1,
    alignItems: "center",
  },
  timeTextInput: {
    ...commonStyles.defaultTextInput, // Use the same styles as defaultTextInput
    width: "90%", // Adjust width to fit within the container
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
});