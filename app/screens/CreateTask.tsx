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
import { commonStyles } from "../../lib/constants";
import { TaskCreateNavigationProp } from "../../lib/constants";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const user = auth.currentUser;

const CreateTask: React.FC = () => {
  const navigation = useNavigation<TaskCreateNavigationProp>();
  const [strictMode, setStrictMode] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskStartTime, setTaskStartTime] = useState("");
  const [taskEndTime, setTaskEndTime] = useState("");
  const [taskStrict, setTaskStrict] = useState(false);


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
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/; // MM/DD/YYYY format
    if (!dateRegex.test(taskDate)) {
      alert("Please enter a valid date in MM/DD/YYYY format");
      return;
    }
    if ((taskStartTime === "" && taskEndTime !== "") || (taskStartTime !== "" && taskEndTime === "")) {
      alert("Please enter both start and end times or leave them blank");
      return;
    }
    // parse for military time and for AM/PM
    const timeRegex = /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/; 
    const militaryTimeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if (timeRegex.test(taskStartTime) && timeRegex.test(taskEndTime)) {
      // pass
    } else if (militaryTimeRegex.test(taskStartTime) && militaryTimeRegex.test(taskEndTime)) {
      // pass
    } else {
      alert("Please ensure your times are entered properly and in the same format.");
      return;
    }

    
  }
  

  return (
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
        placeholder="Enter date (MM/DD/YYYY)"
        onChange={(e) => setTaskDate(e.nativeEvent.text)}
        value={taskDate}
      />
      <Text style={styles.labelText}>Start and end times (24-hour or AM/PM work)</Text> 
      <View style={styles.timeInputRow}>
        <View style={styles.timeInputContainer}>
          <Text style={styles.labelText}>To:</Text>
          <TextInput placeholder="Enter time" style={styles.timeTextInput} />
        </View>
        <View style={styles.timeInputContainer}>
          <Text style={styles.labelText}>From:</Text>
          <TextInput placeholder="Enter time" style={styles.timeTextInput} />
        </View>
      </View>
      <View style={[styles.checkboxContainer, { alignSelf: "flex-start", marginLeft: "7%" }]}>
        <Switch
          value={strictMode}
          onValueChange={setStrictMode}
          trackColor={{ false: "#9E9E9E", true: "#1A237E" }}
          thumbColor={"#FAFAFA"}
        />
        <Text style={styles.checkboxLabel}>Is this task strict?</Text>
      </View>
      <TouchableOpacity style={commonStyles.defaultButton}>
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
    color: "#1A237E",
    marginLeft: 8,
  },
});
