import React from "react";
import {
  StyleSheet,
  Alert,
  View,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Task, militaryToStandardTime } from "../../lib/constants";

interface TaskProps {
  item: Task;
}

const AgendaItem: React.FC<TaskProps & { onPress: () => void }> = ({
  item,
  onPress,
}) => {
  const isEmpty = (item: any) => {
    return !item || Object.keys(item).length === 0;
  };

  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity style={[styles.item]} onPress={onPress}>
      <View style={styles.itemTimeContainer}>
        <Text style={styles.itemFromTimeText}>
          {militaryToStandardTime(item.start_time || "")} to{" "}
          {militaryToStandardTime(item.end_time || "")}
        </Text>
        {/* <Text style={styles.itemToTimeText}>{militaryToStandardTime(item.end_time || "")}</Text> */}
      </View>
      <Text style={styles.itemTitleText}>{item.name}</Text>
      <View style={styles.itemButtonContainer}>
        <Ionicons name="checkmark-circle" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
};

export default AgendaItem;

const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    flexDirection: "row",
    alignItems: "center",
  },
  itemTimeContainer: {
    width: 130, // Adjust as needed for time format
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginRight: -10,
  },
  itemFromTimeText: {
    fontSize: 12,
    color: "black",
    textAlign: "left",
    width: 125, // Adjust as needed
  },
  // itemToTimeText: {
  //   fontSize: 12,
  //   color: "grey",
  //   textAlign: "left",
  //   marginLeft: 0,
  //   width: 70, // Adjust as needed
  // },
  itemTitleText: {
    color: "black",
    marginLeft: 16,
    fontWeight: "bold",
    fontSize: 16,
    flexShrink: 1,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  emptyItemText: {
    color: "lightgrey",
    fontSize: 14,
  },
  completedItem: {
    backgroundColor: "#E0E0E0",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    flexDirection: "row",
    alignItems: "center",
  }
});
