import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Importing Picker for dropdowns
import React, { useState, useEffect } from "react";
import { commonStyles } from "../../lib/constants";

const getRemainingTime = (time: number /* in seconds*/) => {
  const hrs = Math.floor(time / 3600);
  const mins = Math.floor((time % 3600) / 60); // Exclude hours portion
  const secs = time % 60; // Correctly calculate remaining seconds
  return { hrs, mins, secs };
};
const formatNumber = (num: number) =>
  num >= 0 && num < 60 ? String(num).padStart(2, "0") : -1; // formats number for time. returns -1 if the number is above 59 or below 0.

const formatTime = (hrs: number, mins: number, secs: number) => {
  // This function formats the time in HH:MM:SS format. If hours are 0, it will show MM:SS format.
  const formattedHrs = formatNumber(hrs);
  const formattedMins = formatNumber(mins);
  const formattedSecs = formatNumber(secs);
  return hrs > 0
    ? `${formattedHrs}:${formattedMins}:${formattedSecs}`
    : `${formattedMins}:${formattedSecs}`;
};
const calculateTimeInSeconds = (hrs: number, mins: number, secs: number) => {
  // calculates the total time in seconds from the given hours, minutes, and seconds.
  return hrs * 3600 + mins * 60 + secs;
};

const createDropdownArrays = (numDistinctTimes: number) => {
  let array = [];
  for (let i = 0; i < numDistinctTimes; i++) {
    array.push(i);
  }
  return array;
};

const secAndMinArray = createDropdownArrays(60); // 0-59, we can re-use this for 0-59 seconds and 0-59 minutes
const hrsArray = createDropdownArrays(24); // 0-23, use this for 0-23 hours

const Timer = () => {
  const [hrs, setHrs] = useState<number>(0);
  const [mins, setMins] = useState<number>(0);
  const [secs, setSecs] = useState<number>(0);
  const [time, setTime] = useState<number>(hrs * 3600 + mins * 60 + secs); // TOTAL TIME IN SECONDS
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const hasRun = time === 0 ? false : true; // Derived state

  const handleToggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const calculateTimeInSeconds = (hrs: number, mins: number, secs: number) => {
    return hrs * 3600 + mins * 60 + secs;
  };

  useEffect(() => {
    // Update the total time in seconds whenever hrs, mins, or secs change
    setTime(calculateTimeInSeconds(hrs, mins, secs));
  }, [hrs, mins, secs]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={commonStyles.title}>Timer</Text>
      {/* {hasRun ? (
        <Text style={styles.time}>
          {`${String(Math.floor(time / 3600)).padStart(2, "0")}:${String(
            Math.floor((time % 3600) / 60)
          ).padStart(2, "0")}:${String(time % 60).padStart(2, "0")}`}
        </Text>
      ) : (
        <View style={styles.setTimeContainer}>
          <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={hrs}
            onValueChange={(itemValue) => setHrs(itemValue as number)}
            mode="dropdown"
          >
            {hrsArray.map((value) => (
              <Picker.Item key={value} label={value.toString()} value={value} />
            ))}
          </Picker>

          <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={mins}
            onValueChange={(itemValue) => setMins(itemValue as number)}
            mode="dropdown"
          >
            {secAndMinArray.map((value) => (
              <Picker.Item key={value} label={value.toString()} value={value} />
            ))}
          </Picker>

          <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={secs}
            onValueChange={(itemValue) => setSecs(itemValue as number)}
            mode="dropdown"
          >
            {secAndMinArray.map((value) => (
              <Picker.Item key={value} label={value.toString()} value={value} />
            ))}
          </Picker>
        </View>
      )}  */}
      <TouchableOpacity
        onPress={() => {}} //Update this later}
        style={commonStyles.defaultButton}
      >
        <Text style={commonStyles.defaultButtonText}>Start timer</Text>
      </TouchableOpacity>

      {hasRun &&
        (isRunning ? (
          <TouchableOpacity
            onPress={handleToggleTimer}
            style={styles.stopButton}
          >
            <Text style={commonStyles.defaultButtonText}>Stop timer</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleToggleTimer}
            style={styles.resumeButton}
          >
            <Text style={commonStyles.defaultButtonText}>Resume timer</Text>
          </TouchableOpacity>
        ))}
    </SafeAreaView>
  );
};

export default Timer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    justifyContent: "center",
  },
  stopButton: {
    width: "90%",
    marginVertical: 15,
    backgroundColor: "red",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5C6BC0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  resumeButton: {
    width: "90%",
    marginVertical: 15,
    backgroundColor: "green",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5C6BC0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  time: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#5C6BC0",
    marginVertical: 20,
  },
  setTimeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    marginVertical: 20,
    padding: 20,
    minHeight: 300,
  },
  picker: {
    flex: 1,
    maxWidth: 300,
    zIndex: 1,
  },
  pickerItem: {
    color: "#fff",
    fontSize: 20,
    ...Platform.select({
      android: {
        marginLeft: 10,
        marginRight: 10,
      },
    }),
  },
});
