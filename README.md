
# FocusFlow
CSCI 380 Project
=======
# Welcome to our Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).
The template we used was the [`expo-template-blank-typescript`](https://www.npmjs.com/package/expo-template-blank-typescript?activeTab=code).

## Contributors

   1. [Ali Khachab](https://github.com/AliKhachab)
      - Register page, todo list, Database setup
   2. [Jason Li](https://github.com/Jasonl145)(me)
      - Firebase auth/Firestore setup, todo list prototype, Navigation
   3. [Luis Rivera](https://github.com/riverwaylui)
      - Frontend, Calendar, Database testing
   4. [Alan Yuan](https://github.com/AlanYuan16)
      - Pomodoro timer, Study mode overlay, Debugging

## Setup/User Guide

For the application to work as intended(for development), you will first need a firebase account/api
*Note: if you already have the apk file downloaded from the shared project google drive, refer to the end to use the application*

   1. Create a firebase account 

   2. Click in to firebase console and create a project

   3. In your project you should see '</>', click in to it to create an app

   4. register the app and store the provide code snippet for firebase setup.
      For this setup you should only save the contents within: 
      const firebaseConfig = {
         //the api keys
      }
      and click continue to console

   5. Check the side bar of the web page and click in to 'Authentication' and click get started

   6. Under Native providers, click 'Email/Password' and toggle/enable Email/password and save

   7. Find Firestore Database in the sidebars and click Create database and click next for the next few prompts

   8. Find the Rules section of the database configuration and replace the if statement in the rules to be "if request.auth != null;"

   9. Now both the authencation and database of our project should be working as the configuration files are already present

   For you to test the code for development, download android studio and follow any youtube tutorial on getting your prefered android device emulated

   Clone the repo, and follow the steps in 'Get started'

## Downloading the apk file 

   For the most convenient process of downloading the apk file once everything is set up and working:

   1. Log in/sign up for an [Expo](https://expo.dev/) account in your browser

   2. Once log in, run the following command in your console

   ```bash
   eas build -p android --profile preview
   ```
   3. Continue with the prompts by typing 'y'

   4. The apk file will start building on [Expo](https://expo.dev/) where the progress will be shown.

   5. Once the built is finished, you can directly download the apk and run in on your android device or from an android emulator(drag and drop the apk file in to the emulated screen)

## Get started

Once finished with the first part of the Setup Guide:

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Technology Stack

We used the following:
   1. Windows OS
   2. VScode
   3. Git
   4. Node.js
   5. Android studio
   6. Expo Go(mobile app)


## Packages and APIs:

Firebase: Authentication and Database(Firestore)

Main Packages used:

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

We used Firebase authentication because it was the most straight forward way to setup users/user accounts and kept the other packages simple so there was less conflicts/bugs to consider. We used Firestore because it was the easiest way to dynamically grab user specific data using Nosql database and was convenient to implement with the Firebase authentication.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
>>>>>>> e804fc0 (Initial commit)
