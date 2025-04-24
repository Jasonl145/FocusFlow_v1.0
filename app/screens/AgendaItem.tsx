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

const AgendaItem: React.FC<TaskProps & { onPress: () => void }> = ({ item, onPress }) => {
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
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.itemHourText}>{militaryToStandardTime(item.start_time || "")}</Text>
      <Text style={styles.itemDurationText}>{militaryToStandardTime(item.end_time || "")}</Text>
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
  },
  itemHourText: {
    color: "black",
  },
  itemDurationText: {
    color: "grey",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: "black",
    marginLeft: 16,
    fontWeight: "bold",
    fontSize: 16,
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
