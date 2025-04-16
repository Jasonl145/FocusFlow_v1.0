import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { commonStyles } from "../../lib/constants";

const getRemainingTime = (time: number) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins, secs };
};


const Timer = () => {
  const [time, setTime] = useState<number>(0); // in seconds!!!
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const hasRun = (time == 0) ? false : true;

  const handleToggleTimer = () => {
    setIsRunning(!isRunning);
  }

  return (
    <SafeAreaView style={commonStyles.defaultContainer}>
      {/*<StatusBar barStyle={"dark-content"}/> We could use this for dark mode (dark mode ? light-content : dark-content), so saving this here*/}
      <Text style={commonStyles.title}>Timer</Text>
      <TouchableOpacity style={commonStyles.defaultButton}>
        <Text style={commonStyles.defaultButtonText}>Start timer</Text>
      </TouchableOpacity>

      {hasRun && (isRunning ? 
      (
        <TouchableOpacity onPress={handleToggleTimer} style={styles.stopButton}>
          <Text style={commonStyles.defaultButtonText}>Stop timer</Text>
        </TouchableOpacity>
      ) : 
      (
        <TouchableOpacity onPress={handleToggleTimer} style={styles.resumeButton}>
          <Text style={commonStyles.defaultButtonText}>Resume timer</Text>
        </TouchableOpacity>
      ))}
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
});
