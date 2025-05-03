import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  ActivityIndicator,
  SectionList,
  StyleSheet,
  View,
} from "react-native";
import { db } from "../../FirebaseConfig";
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "@firebase/auth";
import { Task } from "../../lib/constants";
import AgendaItem from "./AgendaItem";
import { useNavigation } from "@react-navigation/native";
import { TaskCreateNavigationProp } from "../../lib/constants";

type sectionElement = {
  title: string;
  data: Task[];
};

const Tasks: React.FC = () => {
  const [items, setItems] = useState<sectionElement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  const auth = getAuth();
  const tasksCollection = collection(db, "tasks");

  const navigation = useNavigation<TaskCreateNavigationProp>();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  const handleItemPress = (item: Task) => {
    navigation.navigate("EditTask", { task: item });
  };

  const fetchTasks = (currentUser: User) => {
    const dbQuery = query(
      tasksCollection,
      where("user_id", "==", currentUser.uid),
      orderBy("date", "asc")
    );

    const unsubscribe = onSnapshot(dbQuery, (snapshot) => {
        const tasksData = snapshot.docs.map((doc) => ({
          id: doc.id, // <-- this adds the Firestore document ID
          ...doc.data(),
        })) as unknown as (Task & { id: string })[];
    
        // Group tasks by date
        const grouped: { [date: string]: Task[] } = {};
        tasksData.forEach((task) => {
          // Parse the date as a local date to avoid timezone issues
          const localDate = new Date(task.date + "T00:00:00");
          const formattedDate = localDate.toISOString().split("T")[0]; // Ensure consistent YYYY-MM-DD format
          if (!grouped[formattedDate]) grouped[formattedDate] = [];
          grouped[formattedDate].push(task);
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

      setItems(sections);
      setLoading(false);
    });

    return unsubscribe; // Return the unsubscribe function to clean up the listener
  };

  const handleCheckmarkPress = async (item: Task) => {
    if (!item.id) return;
    try {
      await updateDoc(doc(db, "tasks", item.id), {
        isCompleted: !item.isCompleted,
      });
    } catch (e) {
      alert("Failed to update task completion.");
      console.error(e);
    }
  };

  useEffect(() => {
    let unsubscribe: () => void;
    if (user) {
      setLoading(true);
      unsubscribe = fetchTasks(user); // Set up the real-time listener
    } else {
      setItems([]);
      setLoading(false);
    }
    return () => {
      if (unsubscribe) unsubscribe(); // Clean up the listener when the component unmounts
    };
  }, [user]);

  const renderItem = ({ item }: { item: Task }) => (
    <AgendaItem
      item={item}
      onPress={() => handleItemPress(item)}
      onCheckmarkPress={() => handleCheckmarkPress(item)}
    />
  );

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day); // Treat as local date
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long", // Adds the day of the week
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>To-Do List</Text>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#1A237E"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      ) : items.length > 0 ? (
        <SectionList
          sections={items}
          keyExtractor={(item) => item.id || ""}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeaderContainer}>
              <Text style={styles.sectionHeader}>{formatDate(title)}</Text>
            </View>
          )}
          stickySectionHeadersEnabled={true} // Ensures section headers stick to the top
          contentContainerStyle={{ paddingBottom: 20 }} // Adds padding at the bottom
        />
      ) : (
        <Text style={styles.noTasksText}>No tasks available</Text>
      )}
    </SafeAreaView>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7289DA",
    paddingHorizontal: 10,
  },
  header: {
    backgroundColor: "#5B63AE",
    paddingVertical: 20,
    marginBottom: 10,
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  sectionHeaderContainer: {
    backgroundColor: "#506099",
    paddingVertical: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center", // Center the date
  },
  noTasksText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});