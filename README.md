# Task Manager App 📱

A full-featured mobile task management application built with **React Native** and **Expo**, utilizing **Firebase** for secure authentication and real-time data storage.

## 🚀 Features

*   **User Authentication**: Secure Sign Up and Sign In flows using Firebase Auth.
*   **Real-time Database**: Create, read, update, and delete tasks instantly with Cloud Firestore.
*   **Navigation**: Smooth transitions using React Navigation (Stack & Bottom Tabs).
*   **Secure Implementation**: API keys are managed safely using environment variables.
*   **Cross-Platform**: Runs on both iOS and Android.

## 🛠️ Tech Stack

*   **Frontend**: React Native, Expo
*   **Backend**: Firebase (Auth, Firestore)
*   **State Management**: React Context API
*   **Navigation**: React Navigation (v6/v7)
*   **Styling**: React Native Elements / React Native Styles

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/YOUR_USERNAME/TaskManager.git
    cd TaskManager
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your Firebase configuration:
    ```env
    EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
    EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
    EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```

4.  **Run the App**
    ```bash
    npx expo start --tunnel
    ```

## 📱 Screenshots

<!-- Add screenshots of your app here to impress recruiters! -->
| Sign In | Task List |
|:---:|:---:|
| *(Add Image)* | *(Add Image)* |
## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is [MIT](LICENSE) licensed.
