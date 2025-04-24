import {
  Text,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { firebase_auth } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { LoginScreenNavigationProp, commonStyles } from "../../lib/constants";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<LoginScreenNavigationProp>(); // The prop we made now tells the code that we can access either Login or Register with no extra parameters needed.

  const signUp = async () => {
    setLoading(true);
    try {
      if (password === confirmPassword && password.length < 7) {
        Alert.alert('Error', 'Please make your password 7 characters or longer.');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
      const response = await createUserWithEmailAndPassword(
        firebase_auth,
        email,
        password
      );
      console.log(response);
      alert("Check your email!");
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={commonStyles.defaultContainer}>
      <Text style={commonStyles.title}>Sign up</Text>
      <TextInput
        style={commonStyles.defaultTextInput}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={commonStyles.defaultTextInput}
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={commonStyles.defaultTextInput}
        placeholder="confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TouchableOpacity style={commonStyles.defaultButton} onPress={signUp}>
            <Text style={commonStyles.text}>Create account</Text>
          </TouchableOpacity>
          <Text onPress={() => navigation.navigate("Login")}>Have an account? Log in here</Text>
        </>
      )}
    </SafeAreaView>
  );
};

export default Register;