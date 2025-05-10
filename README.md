
# FocusFlow

## CSCI 380 Project

### Welcome to our Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).
The template we used was the [`expo-template-blank-typescript`](https://www.npmjs.com/package/expo-template-blank-typescript?activeTab=code).

## Contributors

   1. [Ali Khachab](https://github.com/AliKhachab)
      - Screens (login/register, home page), database testing
   2. [Jason Li](https://github.com/Jasonl145) (me)
      - Firebase auth, Firestore database setup, screens (login/register, home page)
   3. [Luis Rivera](https://github.com/riverwaylui)
      - Tasks screen, CSS styling, database testing
   4. [Alan Yuan](https://github.com/AlanYuan16)
      - Pomodoro timer screen, study mode overlay, debugging

## Setup/User Guide

For the application to work as intended(for development), you will first need a firebase account/api
*Note: if you already have the apk file downloaded from the shared project google drive, refer to the end to use the application*

   1. Create a Firebase account.

   2. Click on the Firebase console and create a new project.

   3. In your project you should see '</>'. Click on it to create an app.

   4. Register the app and store the provided code snippet in a FirebaseConfig.ts file for Firebase setup.
      For this setup you should only save the contents within: 
      const firebaseConfig = {
         //the api keys
      }
      and click continue to console

   5. On the left side of the page, click on "Authentication" to get started on user auth features.

   6. Under Native providers, click 'Email/Password' and toggle/enable Email/password, then save.

   7. Find Firestore Database in the left sidebar and click "Create database". Click "next" on the following prompts.

   8. Once the database is created, find the Rules section of the database configuration and replace the if statement in the rules to be "if request.auth != null;".

   9. Your Firebase Auth and Firestore Database should now be fully working.

For you to test the code for development, download Android Studio and use a tutorial like [this one](https://www.youtube.com/watch?v=8gc5z3aKc6k) to test out the apk on your computer through a simulated android device. Once you have everything installed, clone the repo and open it in Android Studio.

## Downloading the apk file 

   1. Log in/sign up for an [Expo](https://expo.dev/) account in your browser.

   2. Once logged in, run the following command in your console:

   ```bash
   eas build -p android --profile preview
   ```
   3. Continue with the prompts by typing 'y'.

   4. The apk file will start building on [Expo](https://expo.dev/) where the progress will be shown.

   5. Once the built is finished, you can directly download the apk and run in on your android device or from an android emulator (drag and drop the apk file onto the emulated Android phone screen).

## Get started

Once you have the apk installed on the simulated Android device and have the repository opened in Android Studio:

1. Install dependencies by typing this command in the root directory:

   ```bash
   npm install
   ```

2. Start the app:

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Technology Stack

We used the following:
   1. TypeScript
   2. React
   4. Visual Studio Code
   5. Git
   6. GitHub
   7. Node.js
   8. Android studio
   9. Expo Go (mobile app)


## Packages and APIs:

Firebase: Authentication
Firestore: Database

We used Firebase for auth due since it was very easy to set up. Google provides all the functionality, and all we needed to do was link each button press on the login/register page to the Firebase functions. As for database, we used Firestore due to how easy it is to perform CRUD operations on a NoSQL database. Everything being saved as a JSON object meant we did not need to worry about convoluted database calls in other SQL languages, instead only having to interact with Firestore data as if we were using the fetch API.

Main Packages used:
```
1. Firebase packages
   - "@react-native-async-storage/async-storage": "^1.23.1",
   - "@react-native-firebase/app": "^21.13.0",
   - "@react-native-firebase/auth": "^21.13.0",
   - "firebase": "^11.6.0",
2. Navigation/UI
   - "@expo/vector-icons": "^14.0.4",
   - "@react-native-picker/picker": "^2.9.0",
   - "@react-navigation/bottom-tabs": "^7.3.5",
   - "@react-navigation/native": "^7.1.5",
   - "@react-navigation/native-stack": "^7.3.3",
   - "@react-navigation/stack": "^7.2.10",
   - "expo": "~52.0.46",
   - "expo-status-bar": "~2.0.1",
   - "react": "18.3.1",
   - "react-native": "^0.76.9",
   - "react-native-calendars": "^1.1311.0",
   - "react-native-paper": "^5.13.1",
```
