import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Task, militaryToStandardTime } from "../../lib/constants";

interface TaskProps {
  item: Task;
  onPress: () => void;
  onCheckmarkPress: () => void;
}

const AgendaItem: React.FC<TaskProps> = ({ item, onPress, onCheckmarkPress }) => {
  if (!item || Object.keys(item).length === 0) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemTimeContainer}>
        <Text style={styles.itemTimeText}>
          {militaryToStandardTime(item.start_time || "")} to{" "}
          {militaryToStandardTime(item.end_time || "")}
        </Text>
      </View>
      <Text style={styles.itemTitleText}>{item.name}</Text>
      <View style={styles.itemButtonContainer}>
        <TouchableOpacity onPress={onPress}>
          {item.isCompleted ? (
            <Ionicons name="checkmark-circle" size={26} color="black" />
          ) : (
            <Ionicons name="ellipse-outline" size={26} color="black" />
          )}
        </TouchableOpacity>
      </View>
      {/* Change the checkmark button above to a complete toggle */}
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
    width: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginRight: -12,
  },
  itemTimeText: {
    fontSize: 12,
    color: "#1A237E",
    textAlign: "left",
  },
  // itemToTimeText: {
  //   fontSize: 12,
  //   color: "grey",
  //   textAlign: "left",
  //   marginLeft: 4,
  //   width: 55,
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
});
