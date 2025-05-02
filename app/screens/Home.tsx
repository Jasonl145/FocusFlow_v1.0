import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  SectionListData,
  ActivityIndicator,
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
import { db } from "../../FirebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { getAuth } from "@firebase/auth";

type sectionElement = {
  title: string;
  data: Task[];
};

const Home: React.FC = () => {
  const navigation = useNavigation<TaskCreateNavigationProp>();

  const [items, setItems] = useState<sectionElement[]>([]); // state for sections array
  const [loading, setLoading] = useState<boolean>(true); // state for loading indicator

  const auth = getAuth();
  const user = auth.currentUser;
  const tasksCollection = collection(db, "tasks");

  const fetchTasks = async () => {
    setLoading(true);
    if (user) {
      const dbQuery = query(
        tasksCollection,
        where("user_id", "==", user.uid),
        orderBy("date", "asc")
      );

      const data = await getDocs(dbQuery);
      const tasksData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as unknown as Task[];

      // Group tasks by date
      const grouped: { [date: string]: Task[] } = {};
      tasksData.forEach((task) => {
        if (!grouped[task.date]) grouped[task.date] = [];
        grouped[task.date].push(task);
      });

      // Convert to sectionElement[] and sort tasks by start_time
      const sections: sectionElement[] = Object.entries(grouped).map(
        ([date, tasks]) => ({
          title: date,
          data: tasks.sort((a, b) => {
            // Compare start_time as strings (assumes format "HH:MM" or "HH:MM AM/PM")
            if (!a.start_time) return 1;
            if (!b.start_time) return -1;
            return a.start_time.localeCompare(b.start_time);
          }),
        })
      );

      // Sort sections by date ascending
      sections.sort(
        (a, b) => new Date(a.title).getTime() - new Date(b.title).getTime()
      );

      setItems(sections);
    } else {
      console.log("No user logged in");
      throw new Error("No user logged in");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
    setLoading(false);
  }, [user]);

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
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#1A237E"
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          />
        ) : items.length > 0 ? (
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
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
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

// dummy code for when we used local array instead of database to test tasks
// const loadItems = () => {

//   setLoading(true);
//   console.log("Loading items...");
//   setTimeout(() => {
//     const sections: sectionElement[] = [];

//     if (Object.keys(userTasks).length === 0) {
//       defaultTasks.forEach((task) => {
//         if (!userTasks[task.date]) {
//           userTasks[task.date] = [];
//         }
//         userTasks[task.date].push(task);
//       });
//     }

//     Object.keys(userTasks).forEach((date) => {
//       if (userTasks[date] && userTasks[date].length > 0) {
//         sections.push({
//           title: date,
//           data: userTasks[date],
//         });
//       }
//     });

//     sections.sort(
//       (a, b) => new Date(a.title).getTime() - new Date(b.title).getTime()
//     );
//     console.log("Sections before setItems:", sections);
//     setItems(sections);
//     setLoading(false);
//   }, 1000);
//   // this function simulates a fetch call with a 1 second delay. we need to rewrite this to async await when we get the chance.
// };

// useEffect(() => {
//   loadItems(); // Load items when the component mounts
// }, []);
