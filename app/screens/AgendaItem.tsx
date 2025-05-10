import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Task, militaryToStandardTime } from "../../lib/constants";

interface TaskProps {
  item: Task;
  onPress: () => void;
  onCheckmarkPress: (event: GestureResponderEvent) => void;
}

// AgendaItem component that displays tasks
const AgendaItem: React.FC<TaskProps> = ({
  item,
  onPress,
  onCheckmarkPress,
}) => {
  // Checking if no tasks are in the agenda for date
  if (!item || Object.keys(item).length === 0) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  // Displays task with time and title
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.itemContent}
        onPress={onPress}
        activeOpacity={0.7}
      >
        { item.start_time && item.end_time ? (
        <Text style={styles.itemTimeText}>
          {militaryToStandardTime(item.start_time)} - {militaryToStandardTime(item.end_time)}
        </Text>
        ) : (
          // If no time set, display text
          <Text style={styles.itemTimeText}>No time set</Text>
        )
        }
        <Text style={styles.itemTitleText}>{item.name}</Text>
      </TouchableOpacity>
      <View style={styles.itemButtonContainer}>
        {/* Checkmark button to mark task as completed*/}
        <TouchableOpacity onPress={onCheckmarkPress} activeOpacity={0.7}>
          {item.isCompleted ? (
            <Ionicons name="checkmark-circle" size={26} color="black" />
          ) : (
            <Ionicons name="ellipse-outline" size={26} color="black" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AgendaItem;

// Styles for AgendaItem, including container, text, and button styles
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    width: 120,
  },
  itemTimeText: {
    fontSize: 12,
    color: "#1A237E",
    textAlign: "center",
    marginRight: 12,
    width: 120,
  },
  itemTitleText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    flexShrink: 1,
    marginLeft: -1,
  },
  itemButtonContainer: {
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
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
