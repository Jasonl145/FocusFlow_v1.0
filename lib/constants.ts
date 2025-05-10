import { StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

export const militaryToStandardTime = (time: string): string => {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const standardHours = hours % 12 || 12; // Convert to 12-hour format
  return `${standardHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

export const standardToMilitaryTime = (time: string): string => {
  const [timePart, period] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);
  if (period === "PM" && hours < 12) {
    hours += 12; // Convert PM to military time
  } else if (period === "AM" && hours === 12) {
    hours = 0; // Midnight case
  }
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};

export const commonStyles = StyleSheet.create({
  title: {
    fontSize: 28, 
    fontWeight: "800", 
    marginBottom: 40, 
    color: "#1A237E", 
  },
  text: {
    color: "#FFFFFF", 
    fontSize: 18, 
    fontWeight: "600", 
  },
  defaultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA", 
  },
  defaultButton: {
    width: "90%",
    marginVertical: 15,
    backgroundColor: "#5C6BC0", 
    padding: 20,
    borderRadius: 15, 
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5C6BC0", 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  defaultButtonText: {
    color: "#FFFFFF", 
    fontSize: 18, 
    fontWeight: "600", 
  },
  defaultTextInput: {
    height: 50, 
    width: "90%", 
    backgroundColor: "#FFFFFF", 
    borderColor: "#E8EAF6", 
    borderWidth: 2,
    borderRadius: 15, 
    marginVertical: 15,
    paddingHorizontal: 25, 
    fontSize: 16, 
    color: "#3C4858", 
    shadowColor: "#9E9E9E", 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, 
  },
  defaultFloatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#5C6BC0", 
    width: 60,
    height: 60,
    borderRadius: 30, 
    justifyContent: "center",
    alignItems: "center",
  },
});

export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;
// A prop used to assist in login/register navigation

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
}; // All pages needed for login/register navigation. 'Undefined' because the pages do not need any extra parameters

export type TaskCreateNavigationProp = StackNavigationProp<TaskCreateStackParamList, "Home">;

export type TaskCreateStackParamList = {
  Home: undefined;
  CreateTask: undefined;
  EditTask: { task: Task }; // Pass the task object to the EditTask screen
};

export type Task = {
  id?: string;
  user_id: number;
  name: string;
  date: string;
  start_time?: string | null;
  end_time?: string | null;
  strict: boolean;
  isCompleted?: boolean; // Optional property to indicate if the task is completed
};

type userTasksType = {
  [key: string]: Task[]; // key = date,
};

export const defaultTasks: Task[] = [
  {
    id: "1",
    user_id: 1,
    name: "Math exam",
    date: "2025-04-30", // YYYY-MM-DD format
    start_time: "09:00",
    end_time: "10:00",
    strict: false,
  },
  {
    id: "2",
    user_id: 1,
    name: "Go to the gym",
    date: "2025-05-01",
    start_time: "12:00",
    end_time: "13:00", // military time format, we can convert later but this makes it easier to do comparisons by time for sorting
    strict: true,
  },
  {
    id: "3",
    user_id: 1,
    name: "Doctor's appointment",
    date: "2025-05-01",
    start_time: "15:00",
    end_time: "16:00",
    strict: false,
  },
  {
    id: "4",
    user_id: 1,
    name: "Grocery shopping",
    date: "2025-05-02",
    start_time: "10:00",
    end_time: "11:00",
    strict: true,
  },
];

export const userTasks: userTasksType = {}; // Change this to be pulled from the database later
