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

const CreateTask: React.FC = () => {
  const navigation = useNavigation<TaskCreateNavigationProp>();
  const [strictMode, setStrictMode] = useState(false);

  return (
    <SafeAreaView style={styles.formContainer}>
      <Text style={styles.labelText}>What task do you have?</Text>
      <TextInput
        style={commonStyles.defaultTextInput}
        placeholder="Enter task name"
      />
      <Text style={styles.labelText}>When do you want to do it?</Text>
      <TextInput
        style={commonStyles.defaultTextInput}
        placeholder="Enter date"
      />
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
          thumbColor={strictMode ? "#FAFAFA" : "#FAFAFA"}
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
