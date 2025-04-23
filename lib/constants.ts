import { StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  title: {
    fontSize: 28, // A bit larger for a more striking appearance
    fontWeight: "800", // Extra bold for emphasis
    marginBottom: 40, // Increased space for a more airy, open feel
    color: "#1A237E", // A deep indigo for a sophisticated, modern look
  },
  text: {
    color: "#FFFFFF", // Maintained white for clear visibility
    fontSize: 18, // Slightly larger for emphasis
    fontWeight: "600", // Semi-bold for a balanced weight
  },
  defaultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA", // A softer white for a modern, minimalist background
  },
  defaultButton: {
    width: "90%",
    marginVertical: 15,
    backgroundColor: "#5C6BC0", // A lighter indigo to complement the title color
    padding: 20,
    borderRadius: 15, // Matching rounded corners for consistency
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5C6BC0", // Shadow color to match the button for a cohesive look
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  defaultButtonText: {
    color: "#FFFFFF", // Maintained white for clear visibility
    fontSize: 18, // Slightly larger for emphasis
    fontWeight: "600", // Semi-bold for a balanced weight
  },
  defaultTextInput: {
    height: 50, // Standard height for elegance and simplicity
    width: "90%", // Full width for a more expansive feel
    backgroundColor: "#FFFFFF", // Pure white for contrast against the container
    borderColor: "#E8EAF6", // A very light indigo border for subtle contrast
    borderWidth: 2,
    borderRadius: 15, // Softly rounded corners for a modern, friendly touch
    marginVertical: 15,
    paddingHorizontal: 25, // Generous padding for ease of text entry
    fontSize: 16, // Comfortable reading size
    color: "#3C4858", // A dark gray for readability with a hint of warmth
    shadowColor: "#9E9E9E", // A medium gray shadow for depth
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, // Slightly elevated for a subtle 3D effect
  },
  defaultFloatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#5C6BC0", // A lighter indigo to complement the title color
    width: 60,
    height: 60,
    borderRadius: 30, // Fully rounded for a modern look
    justifyContent: "center",
    alignItems: "center",
  },
});

export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
// A prop used to assist in login/register navigation

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
}; // All pages needed for login/register navigation. 'Undefined' because the pages do not need any extra parameters

export type Task = {
  id: number;
  user_id: number;
  name: string;
  date: string;
  start_time?: string;
  end_time?: string;
  strict: boolean;
}

type userTasksType = {
  [key: string]: Task[]; // key = date,
}

export const defaultTasks: Task[] = [ // tester tasks, delete later
  {
    id: 1,
    user_id: 1,
    name: "Math exam",
    date: "2025-04-30", // YYYY-MM-DD format
    start_time: "09:00",
    end_time: "10:00",
    strict: false,
  },
  {
    id: 2,
    user_id: 1,
    name: "Go to the gym",
    date: "2025-05-01",
    start_time: "12:00",
    end_time: "13:00", // military time format, we can convert later but this makes it easier to do comparisons by time for sorting
    strict: true,
  },
];

export const userTasks: userTasksType = {}; // change this to be pulled from db later