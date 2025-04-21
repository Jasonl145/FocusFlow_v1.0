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
// const formatNumber = (num: number) =>
//   num >= 0 && num < 60 ? String(num).padStart(2, "0") : -1; // formats number for time. returns -1 if the number is above 59 or below 0.

const createDropdownArrays = (numDistinctTimes: number) => {
  // create arrays for the picker menus
  let array = [];
  for (let i = 0; i < numDistinctTimes; i++) {
    array.push(i.toString()); // toString() for the picker
  }
  return array;
};

const secAndMinArray = createDropdownArrays(60); // 0-59, we can re-use this for 0-59 seconds and 0-59 minutes
const hrsArray = createDropdownArrays(24); // 0-23, use this for 0-23 hours


const Timer = () => {
  const [hourTime, setHourTime] = useState<number>(0);
  const [minTime, setMinTime] = useState<number>(0);
  const [secTime, setSecTime] = useState<number>(0);
  // hour, minute, second State

  const calculateTimeInSeconds = (hrs: number, mins: number, secs: number) => {
    return hrs * 3600 + mins * 60 + secs;
  };

  const [time, setTime] = useState<number>(
    calculateTimeInSeconds(hourTime, minTime, secTime)
  ); // Time State (IN SECONDS)

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);

  const handleRunning = (val: boolean) => {
    setIsRunning(val);
  };

  const createPicker = (
    dropdownArray: string[],
    timeVariable: number,
    setTimeVariable: React.Dispatch<React.SetStateAction<number>>, // this means the type is a setter function
    timeAbbreviation: string
  ) => {
    return (
      <Picker
        style={styles.picker}
        selectedValue={timeVariable.toString()}
        onValueChange={(itemValue) => setTimeVariable(Number(itemValue))}
      >
        {dropdownArray.map((timeUnit) => (
          <Picker.Item
            key={timeUnit}
            value={timeUnit}
            label={timeUnit + timeAbbreviation}
          />
        ))}
      </Picker>
    );
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
  
    if (isRunning && !paused) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval!); // stop the timer when it hits 0
            setIsRunning(false); // set isRunning to false
            return 0; // ensure the time doesn't go below 0
          }
          return prevTime - 1; // decrease time by 1 second
        });
      }, 1000); // run every 1 second
    } else if (!isRunning && interval) {
      clearInterval(interval); // clear the interval if the timer is stopped
    }
  
    return () => {
      if (interval) clearInterval(interval); // cleanup on unmount or when isRunning changes
    };
  }, [isRunning, paused]);



  useEffect(() => {

    // Update the total time in seconds whenever hrs, mins, or secs change
    setTime(calculateTimeInSeconds(hourTime, minTime, secTime));
  }, [hourTime, minTime, secTime]);

  return (
    <SafeAreaView style={commonStyles.defaultContainer}>
      <Text style={commonStyles.title}>Timer</Text>
      {isRunning ? (
        <>
          <Text>paused: {paused.toString()}</Text>
          <Text>isRunning: {isRunning.toString()}</Text>
          <Text style={styles.time}>
            {
              `${String(Math.floor(time / 3600)).padStart(2, "0")}:${String(
                Math.floor((time % 3600) / 60)
              ).padStart(2, "0")}:${String(time % 60).padStart(2, "0")}`
              /* THE ABOVE IS A FORMATTED VERSION OF THE TIME HH:MM:SS*/
            }
          </Text>
          <TouchableOpacity
            style={styles.resumeButton}
            onPress={() => {
              setPaused(!paused);
              handleRunning(true);
            }}
          >
            <Text style={commonStyles.defaultButtonText}>
              {paused ? "Resume timer" : "Pause timer"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.stopButton}
            onPress={() => {
              setPaused(!paused);
              handleRunning(false);
              setHourTime(0); // Reset the hour picker
              setMinTime(0); // Reset the minute picker
              setSecTime(0); // Reset the second picker
            }}
          >
            <Text style={commonStyles.defaultButtonText}>Cancel timer</Text>
          </TouchableOpacity>
        </>
      ) : (
        // Hours picker, minute picker, seconds picker in order
        <>
          <View style={styles.setTimeContainer} aria-label="Set time">
            {createPicker(hrsArray, hourTime, setHourTime, "h")}
            <Text style={[commonStyles.title, styles.pushColonsDown]}>:</Text>
            {createPicker(secAndMinArray, minTime, setMinTime, "m")}
            <Text style={[commonStyles.title, styles.pushColonsDown]}>:</Text>
            {createPicker(secAndMinArray, secTime, setSecTime, "s")}
          </View>
          <TouchableOpacity
            style={commonStyles.defaultButton}
            onPress={() => {
              if (time !== 0) {
                handleRunning(true);
                setPaused(false);
              } else {
                alert("Please set a valid time");
              }
            }}
          >
            <Text style={commonStyles.defaultButtonText}>Start timer</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default Timer;

const styles = StyleSheet.create({
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
  pushColonsDown: {
    marginTop: 30,
  },
});
