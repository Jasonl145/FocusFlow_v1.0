import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert
} from "react-native";
import { commonStyles, standardToMilitaryTime } from "../../lib/constants";
import { TaskCreateNavigationProp } from "../../lib/constants";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { db } from "../../FirebaseConfig";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Task } from "../../lib/constants";
import { TaskCreateStackParamList } from "../../lib/constants";

const EditTask: React.FC = () => {
  const route = useRoute<RouteProp<TaskCreateStackParamList, "EditTask">>();
  const { task } = route.params;
  // you need to do this to get the task object from the route params. doesn't just work via parameters.
  const auth = getAuth();
  const user = auth.currentUser;
  console.log("User has been authenticated: ", user);

  const navigation = useNavigation<TaskCreateNavigationProp>();

  // Initialize state with task prop values
  const [taskName, setTaskName] = useState(task.name || "");
  const [taskDate, setTaskDate] = useState(task.date || "");
  const [taskStartTime, setTaskStartTime] = useState(task.start_time || "");
  const [taskEndTime, setTaskEndTime] = useState(task.end_time || "");
  const [taskStrict, setTaskStrict] = useState(task.strict || false);

  const handleSubmit = async () => {
    // Validation (same as before)
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
    const timeRegex = /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/;
    const militaryTimeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if (
      (taskStartTime &&
        taskEndTime &&
        timeRegex.test(taskStartTime) &&
        timeRegex.test(taskEndTime)) ||
      (militaryTimeRegex.test(taskStartTime) &&
        militaryTimeRegex.test(taskEndTime))
    ) {
      // pass
    } else if (taskStartTime || taskEndTime) {
      alert(
        "Please ensure your times are entered properly and in the same format."
      );
      return;
    }

    // Prepare updated task object
    const updatedTask: Partial<Task> = {
      name: taskName,
      date: taskDate,
      start_time:
        taskStartTime !== "" ? standardToMilitaryTime(taskStartTime) : null,
      end_time: taskEndTime !== "" ? standardToMilitaryTime(taskEndTime) : null,
      strict: !taskStartTime || !taskEndTime ? taskStrict : false,
    };

    // Update the task in Firestore
    if (user && task.id) {
      try {
        const taskDoc = doc(db, "tasks", task.id);
        await updateDoc(taskDoc, updatedTask);
        navigation.goBack();
      } catch (e) {
        alert("Failed to update task.");
        console.error("Error updating task: ", e);
      }
    } else {
      alert("No user or task ID found.");
    }
  };

  const handleDelete = async () => {
    Alert.alert( // commenting here to explain what is happening b/c no other area of the code really does this (yet)
      "Delete Task", // header of the alert
      "Are you sure you want to delete this task?", // message
      [
        {
          text: "Cancel",
          style: "cancel", // built in style for cancel
        },
        {
          text: "Delete",
          style: "destructive", // built in style for destructive, aka red text to imply something bad is happening
          onPress: async () => {
            if (user && task.id) {
              try {
                await deleteDoc(doc(db, "tasks", task.id));
                navigation.goBack(); // delete the task if the user is found and the task id is not null by finding the task id in the database and deleting it with DeleteDoc. then navigate back home.
              } catch (e) {
                alert("Failed to delete task.");
                console.error("Error deleting task: ", e);
              }
            } else {
              alert("No user or task ID found."); // this is a fallback in case the task ID is not found, but this should never happen in prod
            }
          },
        },
      ],
      { cancelable: true }
    );
  };


  return (
    <SafeAreaView style={styles.formContainer}>
      <Text style={styles.labelText}>Edit your task</Text>
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
            value={taskStartTime}
          />
        </View>
        <View style={styles.timeInputContainer}>
          <Text style={styles.labelText}>To:</Text>
          <TextInput
            placeholder="Enter time"
            style={styles.timeTextInput}
            onChange={(e) => setTaskEndTime(e.nativeEvent.text)}
            value={taskEndTime}
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
        <Text style={commonStyles.defaultButtonText}>Save changes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          commonStyles.defaultButton,
          { marginTop: 20, backgroundColor: "red" },
        ]}
        onPress={handleDelete}
      >
        <Text style={commonStyles.defaultButtonText}>Delete task</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditTask;

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
    ...commonStyles.defaultTextInput,
    width: "90%",
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
