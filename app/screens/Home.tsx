import { View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { CalendarProvider, AgendaList } from "react-native-calendars";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import {
  commonStyles,
  Task,
  userTasks,
  defaultTasks,
} from "../../lib/constants";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const Home: React.FC = () => {
  const [items, setItems] = useState<object>({});

  // const loadItems = (day) => {
  //   setTimeout(() => {
  //     for (let i = 0; i < 1; i++) {
  //       const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //       const strTime = timeToString(time);
  //       if (!items[strTime]) {
  //         items[strTime] = [];
  //         const numItems = Math.floor(Math.random() * 3 + 1);
  //         for (let j = 0; j < numItems; j++) {
  //           items[strTime].push({
  //             name: 'Item for ' + strTime + ' #' + j,
  //             height: Math.max(50, Math.floor(Math.random() * 150)),
  //           });
  //         }
  //       }
  //     }
  //     const newItems = {};
  //     Object.keys(items).forEach((key) => {
  //       newItems[key] = items[key];
  //     });
  //     setItems(newItems);
  //   }, 1000);
  // };

  // const loadItems = (day: string) => {
  //   setTimeout(() => {
  //     // Check if userTasks is empty
  //     if (Object.keys(userTasks).length === 0) {
  //       // Populate userTasks with defaultTasks
  //       defaultTasks.forEach((task) => {
  //         if (!userTasks[task.date]) {
  //           userTasks[task.date] = [];
  //         }
  //         userTasks[task.date].push(task);
  //       });
  //     }

  //     // Populate the Agenda with all tasks from userTasks
  //     Object.keys(userTasks).forEach((date) => {
  //       if (!items[date]) {
  //         items[date] = [];
  //       }

  //       userTasks[date].forEach((task) => {
  //         items[date].push({
  //           name: task.name,
  //           height: 50, // Fixed height for tasks
  //         });
  //       });
  //     });

  //     // Create a new items object to trigger a state update
  //     const newItems = {};
  //     Object.keys(items).forEach((key) => {
  //       newItems[key] = items[key];
  //     });
  //     setItems(newItems);
  //   }, 1000);
  // };

  const loadItems = () => {};

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>{item.name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CalendarProvider
        date={new Date().toISOString()}
        onDateChanged={(date) => {
          console.log("Selected date:", date);
        }}
        onMonthChange={(month) => {
          console.log("Selected month:", month);
        }}
      >
        <AgendaList
          sections={[]}
          onMonthChange={(month) => {
            console.log("Selected month:", month);
            loadItems();
          }}
          renderItem={renderItem}
          onDayPress={(day) => {
            console.log("Selected day:", day);
          }}
          pastScrollRange={12}
          futureScrollRange={12}
          theme={{
            agendaDayTextColor: "#5C6BC0",
            agendaDayNumColor: "#5C6BC0",
            agendaTodayColor: "#5C6BC0",
            agendaKnobColor: "#5C6BC0",
          }}
        />
      </CalendarProvider>
      <TouchableOpacity
        style={commonStyles.defaultFloatingButton}
        onPress={() => console.log("Floating button pressed")}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
