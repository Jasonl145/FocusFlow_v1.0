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
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
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
    console.log("BOMBOCLAAAAAT");
    const dbQuery = query(
      tasksCollection,
      where("user_id", "==", currentUser.uid),
      orderBy("date", "asc")
    );

    const data = await getDocs(dbQuery);
    const tasksData = data.docs.map((doc) => (
      {
      id: doc.id,
      ...doc.data(),
    })) as unknown as Task[];

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
    console.log("________\n",items);
    setLoading(false);
    } 
    catch (error) {
      console.error("Error fetching tasks: ", error);
      setLoading(false);
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
    // Add edit/delete logic here if needed
  };

  const renderItem = ({ item }: { item: Task }) => (
    <AgendaItem item={item} onPress={() => handleItemPress(item)} />
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