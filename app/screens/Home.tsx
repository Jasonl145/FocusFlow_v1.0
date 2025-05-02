import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { CalendarProvider, AgendaList } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import {
  commonStyles,
  Task,
  TaskCreateNavigationProp,
} from "../../lib/constants";
import AgendaItem from "./AgendaItem";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../FirebaseConfig";
import { collection, getDocs, query, where, orderBy, doc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "@firebase/auth";



type sectionElement = {
  title: string;
  data: Task[];
};

const Home: React.FC = () => {
  const navigation = useNavigation<TaskCreateNavigationProp>();
  const [items, setItems] = useState<sectionElement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth();
  const tasksCollection = collection(db, "tasks");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  const fetchTasks = async (currentUser: User) => {
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
      console.log("~~~~~~~~\nSample fetched task:", tasksData[0], "\n~~~~~~~~");

      // Group tasks by date
      const grouped: { [date: string]: Task[] } = {};
      tasksData.forEach((task) => {
        if (!grouped[task.date]) grouped[task.date] = [];
        grouped[task.date].push(task);
      });

      console.log("Grouped Tasks: ", grouped);

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

      setItems(sections);
      console.log("________\n", items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
      setLoading(false);
    }
  };

  const handleCheckmarkPress = async (item: Task) => {
    if (!item.id) return;
    try {
      await updateDoc(doc(db, "tasks", item.id), {
        isCompleted: !item.isCompleted,
      });
      // Optionally, refresh tasks after update
      if (user) fetchTasks(user);
    } catch (e) {
      alert("Failed to update task completion.");
      console.error(e);
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      const fetch = async () => {
        await fetchTasks(user); // fetchTasks will setLoading(false) when done
      };
      fetch();
    } else {
      setItems([]);
      setLoading(false);
    }
  }, [user]);

  const handleItemPress = (item: Task) => {
    // Route to the EditTask screen with the selected task
    navigation.navigate("EditTask", { task: item });
  };

  const renderItem = ({ item }: { item: Task }) => (
    <AgendaItem
      item={item}
      onPress={() => handleItemPress(item)}
      onCheckmarkPress={(e) => {
        e.stopPropagation(); // prevent parent (agendaItem itself) onPress function from opening EditTask component
        handleCheckmarkPress(item);
      }}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CalendarProvider date={new Date().toISOString()}>
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
