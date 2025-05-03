import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  SectionListData,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { CalendarProvider, AgendaList } from "react-native-calendars";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import {
  commonStyles,
  Task,
  userTasks,
  defaultTasks,
  TaskCreateNavigationProp,
} from "../../lib/constants";
import AgendaItem from "./AgendaItem";
import { useNavigation } from "@react-navigation/native";

const timeToString = (time: string) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

type sectionElement = {
  title: string;
  data: Task[];
};

const Home: React.FC = () => {
  const navigation = useNavigation<TaskCreateNavigationProp>();

  const [items, setItems] = useState<sectionElement[]>([]); // State for sections array

  const loadItems = () => {
    console.log("Loading items...");
    setTimeout(() => {
      const sections: sectionElement[] = [];

      if (Object.keys(userTasks).length === 0) {
        defaultTasks.forEach((task) => {
          if (!userTasks[task.date]) {
            userTasks[task.date] = [];
          }
          userTasks[task.date].push(task);
        });
      }

      Object.keys(userTasks).forEach((date) => {
        if (userTasks[date] && userTasks[date].length > 0) {
          sections.push({
            title: date,
            data: userTasks[date],
          });
        }
      });

      sections.sort(
        (a, b) => new Date(a.title).getTime() - new Date(b.title).getTime()
      );
      console.log("Sections before setItems:", sections);
      setItems(sections);
    }, 1000);
  };

  useEffect(() => {
    loadItems(); // Load items when the component mounts
  }, []);

  const handleItemPress = (item: Task) => {
    console.log("Item pressed");
    // add edit/delete screen later
  };

  const renderItem = ({ item }: { item: Task }) => {
    return (
      <AgendaItem
        item={item}
        onPress={() => {
          handleItemPress(item);
        }}
      />
    );
  };

  // const renderSectionHeader = ({ section }: { section: SectionListData<Task> }) => {
  //   return (
  //     <View style={{ backgroundColor: "#f4f4f4", padding: 10 }}>
  //       <Text style={{ fontWeight: "bold", color: "#5C6BC0" }}>
  //         {section.title}
  //       </Text>
  //     </View>
  //   );
  // };

  // console.log("AgendaList sections:", items);

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
        {items.length > 0 ? (
          <AgendaList
            sections={items}
            renderItem={renderItem}
            // renderSectionHeader={renderSectionHeader}
            theme={{
              agendaDayTextColor: "#5C6BC0",
              agendaDayNumColor: "#5C6BC0",
              agendaTodayColor: "#5C6BC0",
              agendaKnobColor: "#5C6BC0",
            }}
          />
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No tasks available
          </Text>
        )}
      </CalendarProvider>
      <TouchableOpacity
        style={commonStyles.defaultFloatingButton}
        onPress={() => navigation.navigate("CreateTask")}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
