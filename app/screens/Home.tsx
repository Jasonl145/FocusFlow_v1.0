import { View, SafeAreaView, Text, TouchableOpacity, SectionListData } from "react-native";
import React, { useCallback, useState } from "react";
import { CalendarProvider, AgendaList } from "react-native-calendars";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import {
  commonStyles,
  Task,
  userTasks,
  defaultTasks,
} from "../../lib/constants";
import AgendaItem  from "./AgendaItem";

const timeToString = (time: string) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

type sectionElement = {
    title: string;
    data: Task[];
}

const Home: React.FC = () => {
    const [items, setItems] = useState<sectionElement[]>([]); // State for sections array
  
    const loadItems = () => {
      setTimeout(() => {
        const sections: sectionElement[] = [];

        // Update this for when db functionality works
        if (Object.keys(userTasks).length === 0) {
          // Populate userTasks with defaultTasks
          defaultTasks.forEach((task) => {
            if (!userTasks[task.date]) {
              userTasks[task.date] = [];
            }
            userTasks[task.date].push(task);
          });
        }
  
        // Populate sections with tasks from userTasks
        Object.keys(userTasks).forEach((date) => {
          sections.push({
            title: date, // The date as the section title
            data: userTasks[date], // The tasks for that date
          });
        });
  
        // Sort sections by date
        sections.sort((a, b) => new Date(a.title).getTime() - new Date(b.title).getTime());
  
        setItems(sections); // Update the state with the sections array
      }, 1000);
    };
  
    // const renderItem = ({ item }: { item: Task }) => {
    //   return (
    //     <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
    //       <Card>
    //         <Card.Content>
    //           <View
    //             style={{
    //               flexDirection: "row",
    //               justifyContent: "space-between",
    //               alignItems: "center",
    //             }}
    //           >
    //             <Text>{item.name}</Text>
    //           </View>
    //         </Card.Content>
    //       </Card>
    //     </TouchableOpacity>
    //   );
    // };

    const handlePress = (item: Task) => {
        console.log("Task pressed:", item.name);
        // Handle the task press event here
    }

    const renderItem = ({ item }: { item: Task }) => {
      return (
        <AgendaItem
          item={item}
          onPress={() => {handlePress(item)}}
        />
      );
    };

    const renderSectionHeader = ({ section }: { section: SectionListData<Task> }) => {
      return (
        <View style={{ backgroundColor: "#f4f4f4", padding: 10 }}>
          <Text style={{ fontWeight: "bold", color: "#5C6BC0" }}>{section.title}</Text>
        </View>
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
            sections={items} // Pass the sections array
            onMonthChange={(month) => {
              console.log("Selected month:", month);
              loadItems();
            }}
            renderItem={renderItem} // Render each task
            renderSectionHeader={renderSectionHeader} // Render section headers (dates)
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