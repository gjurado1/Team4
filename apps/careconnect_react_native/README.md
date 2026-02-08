CareConnect – React Native App

CareConnect is a cross-platform healthcare mobile application built with React Native (Expo).
It supports caregiver and patient roles and includes accessibility-focused features such as theme switching, text scaling, and assistive options. This application was built with the help of AI(chatgpt).

🚀 Getting Started
Prerequisites

Node.js (v18+ recommended)

npm

Expo CLI (optional)

Install Expo CLI (optional):

npm install -g expo-cli

📦 Install Dependencies

From the project directory:

cd apps/careconnect_react_native
npm install

▶️ Run the App

Start the development server:

npm start


or

expo start


Then:

Press i for iOS simulator (Mac)

Press a for Android emulator

Or scan the QR code with Expo Go

🧪 Run Tests

Run all tests:

npm test


Generate coverage report:

npm test -- --coverage


Coverage report is generated at:

coverage/lcov-report/index.html


Minimum required coverage: 60%

🏗 Tech Stack

React Native (Expo)

TypeScript

React Navigation

AsyncStorage

Jest

React Native Testing Library

♿ Accessibility Features

Light / Dark / System themes

High contrast mode

Adjustable text size

Reduced motion

Large touch targets

Screen reader support

Voice feature toggles