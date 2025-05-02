import { StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  Text, 
  SafeAreaView, 
  View, 
  TouchableWithoutFeedback,
  
 } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from '../../FirebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, serverTimestamp, orderBy } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {
  CalendarProvider,
  ExpandableCalendar,
  AgendaList,
} from 'react-native-calendars';
import { commonStyles } from '../../lib/constants';
import { Ionicons } from '@expo/vector-icons';
import Popup from '../../components/Popup';





const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};
const Home = () => {
  const [selectedDate, setSelectedDate] = useState(timeToString(Date.now()));
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState('');
  const [editTaskText, setEditTaskText] = useState('');
  
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<any>([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const todosCollection = collection(db, 'todos');


  useEffect(() => {
    fetchTodos();
  }, [user, selectedDate]);

  


  const fetchTodos = async () => {
    if (user) {
      const q = query(todosCollection, 
        where("userId", "==", user.uid),
        where("date", "==", selectedDate),
        orderBy("createdAt", "asc")
      );
      const data = await getDocs(q);
      // Log raw documents from Firestore
      console.log("Raw Firestore documents:");
      data.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
      });
      // Process the data
      const todosData = data.docs.map((doc) => ({ 
        ...doc.data(), 
        id: doc.id, 
        createdAt: doc.data().createdAt?.toDate()
      }));
      console.log("Processed todos data:");
      console.log(todosData);

      setTodos(todosData);
    } else {
      console.log("No user logged in");
    }
  };

  const addTodo = async () => {
    if (user) {
      await addDoc(todosCollection, { task, completed: false, userId: user.uid, date: selectedDate, createdAt: serverTimestamp()});
      setTask('');
      setPopUpVisible(false);
      fetchTodos();
    } else {
      console.log("No user logged in");
    }
  };

  const updateTodo = async (id: string, completed: any) => {
    const todoDoc = doc(db, 'todos', id);
    await updateDoc(todoDoc, { completed: !completed });
    fetchTodos();
  };

  const editTodo = async () => {
    if (user && editTaskId) {
      const todoDoc = doc(db, 'todos', editTaskId);
      await updateDoc(todoDoc, { task: editTaskText });
      setEditTaskId('');
      setEditTaskText('');
      setIsEditing(false);
      fetchTodos();
    }
  };

  const deleteTodo = async (id: string) => {
    const todoDoc = doc(db, 'todos', id);
    await deleteDoc(todoDoc);
    fetchTodos();
  };

 



  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };

  const handleTaskPress = (task: any) => {
    setSelectedTask(task);
 
  };

  const closePopup = () => {
    setPopUpVisible(false);
  };

  // This allows touches to pass through the popup's transparent areas
  const handleOverlayPress = () => {
    closePopup();
  };

  

  const renderTodoItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setEditTaskId(item.id);
          setEditTaskText(item.task);
          setIsEditing(true);
        }}
      >
        <View style={styles.todoContainer}>
          <View>
            <Text style={{ 
              textDecorationLine: item.completed ? 'line-through' : 'none', 
              flex: 1 
            }}>
              {item.task}
            </Text>
          </View>
          <View style={styles.buttonGroup}>
          <TouchableOpacity 
            style={styles.testflatbutton} 
            onPress={() => updateTodo(item.id, item.completed)}
          >
            <Text style={styles.buttonText}>
              {item.completed ? <Ionicons name='refresh'></Ionicons> : <Ionicons name='checkmark-circle-outline'></Ionicons>}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.testflatbutton} 
            onPress={() => deleteTodo(item.id)}
          >
            <Ionicons name='trash'></Ionicons>
          </TouchableOpacity>
          </View>

        </View>
      </TouchableOpacity>

    );
  };
 

  return (
    <View style={styles.container}>
      <CalendarProvider 
        date={timeToString(Date.now())}
      >
        <ExpandableCalendar
          // Optional props
          pastScrollRange={12}
          futureScrollRange={12}
          firstDay={1} // Start week on Monday
          // Other customization props
          onDayPress={day => {
            setSelectedDate(day.dateString);
            console.log(day);
          }}
        
        />

        <SafeAreaView style={styles.safeArea}>
          <View style={styles.testflatcontainer}>
            
            <FlatList
              data={todos}
              renderItem={renderTodoItem}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <Text style={{ textAlign: 'center', marginTop: 20 }}>
                  No todos found for this date
                </Text>
              }
            />
          </View>
        </SafeAreaView>


        
      </CalendarProvider>
      
      <Popup
        visible={popUpVisible || isEditing}
        onClose={() => {
          if (isEditing) {
            setIsEditing(false);
            setEditTaskId('');
            setEditTaskText('');
          } else {
            setPopUpVisible(false);
          }
        }}
        onSubmit={isEditing ? editTodo : addTodo}
        value={isEditing ? editTaskText : task}
        onChangeText={(text) => isEditing ? setEditTaskText(text) : setTask(text)}
      />
              
      <TouchableOpacity style={commonStyles.defaultFloatingButton}
          onPress={() => setPopUpVisible(true)}
        >
          <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  popupContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'box-none', // Allows touches to pass through
  },
  popup: {
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#00adf5',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  safeArea: {
    flex: 1,
  },
  testflatcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10, // Adjust spacing as needed
    color: '#333', // Choose a color that fits your app theme
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    flex: 1, // Adjusted to take available space
    marginRight: 10, // Add margin to separate input and button
  },
  addButton: {
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFA726', // Use a distinct color for the add button
    shadowColor: '#FFA726',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 1,
    width: '100%',
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  testflatbutton: {
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5C6BC0',
    shadowColor: '#5C6BC0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    marginLeft: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  
  
});