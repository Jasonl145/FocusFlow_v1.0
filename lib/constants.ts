import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  title: {
    fontSize: 28, // A bit larger for a more striking appearance
    fontWeight: "800", // Extra bold for emphasis
    marginBottom: 40, // Increased space for a more airy, open feel
    color: "#1A237E", // A deep indigo for a sophisticated, modern look
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
});
