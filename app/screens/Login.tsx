import {
  Text,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { firebase_auth } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { commonStyles, LoginScreenNavigationProp } from "../../lib/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        firebase_auth,
        email,
        password
      );
      console.log(response);
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={commonStyles.defaultContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={commonStyles.title}>Login</Text>
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
          <TouchableOpacity style={commonStyles.defaultButton} onPress={signIn}>
            <Text style={commonStyles.text}>Login</Text>
          </TouchableOpacity>
          <Text onPress={() => navigation.navigate("Register")}>
            Don't have an account? Register here
          </Text>
        </>
      )}
    </SafeAreaView>
  );
};

export default Login;