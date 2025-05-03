import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { CalendarProvider, AgendaList, Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../FirebaseConfig";
import { collection, getDocs, query, where, orderBy, doc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "@firebase/auth";
import { commonStyles, Task, TaskCreateNavigationProp } from "../../lib/constants";
import AgendaItem from "./AgendaItem";

type sectionElement = {
  title: string;
  data: Task[];
};

const Home: React.FC = () => {
  const navigation = useNavigation<TaskCreateNavigationProp>();
  const [items, setItems] = useState<sectionElement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  ); // Default to today's date

  const auth = getAuth();
  const tasksCollection = collection(db, "tasks");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  const fetchTasks = async (currentUser: User, date?: string) => {
    try {
      const dbQuery = query(
        tasksCollection,
        where("user_id", "==", currentUser.uid),
        orderBy("date", "asc")
      );

      const data = await getDocs(dbQuery);
      const tasksData = data.docs.map((doc) => ({
        id: doc.id, // <-- this adds the Firestore document ID
        ...doc.data(),
      })) as unknown as (Task & { id: string })[];

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

      // Filter tasks for the selected date if provided
      const filteredSections = date
        ? sections.filter((section) => section.title === date)
        : sections;

      setItems(filteredSections);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchTasks(user, selectedDate);
    } else {
      setItems([]);
      setLoading(false);
    }
  }, [user, selectedDate]);

  const handleCheckmarkPress = async (item: Task) => {
    if (!item.id) return;
    try {
      await updateDoc(doc(db, "tasks", item.id), {
        isCompleted: !item.isCompleted,
      });
      if (user) fetchTasks(user, selectedDate);
    } catch (e) {
      alert("Failed to update task completion.");
      console.error(e);
    }
  };

  const handleItemPress = (item: Task) => {
    navigation.navigate("EditTask", { task: item });
  };

  const renderItem = ({ item }: { item: Task }) => (
    <AgendaItem
      item={item}
      onPress={() => handleItemPress(item)}
      onCheckmarkPress={(e) => {
        e.stopPropagation();
        handleCheckmarkPress(item);
      }}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#7289DA" }}>
      <CalendarProvider date={selectedDate}>
        {/* Calendar at the top */}
        <Calendar
          onDayPress={(day: { dateString: string }) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: "#255ec2" },
          }}
          theme={{
            calendarBackground: "#7289DA",
            dayTextColor: "#FFFFFF",
            todayTextColor: "#3B249E",
            selectedDayBackgroundColor: "#255ec2",
            selectedDayTextColor: "#FFFFFF",
            monthTextColor: "#FFFFFF",
            arrowColor: "#FFFFFF",
          }}
        />

        {/* Tasks Header */}
        <View
          style={{
            marginTop: 20,
            paddingVertical: 15,
            backgroundColor: "#506099", // Added background color
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#FFFFFF",
            }}
          >
            Tasks
          </Text>
        </View>

        {/* Task List */}
        <View style={{ marginTop: 20 }}>
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
                color: "#FFFFFF",
              }}
            >
              No tasks available
            </Text>
          )}
        </View>
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