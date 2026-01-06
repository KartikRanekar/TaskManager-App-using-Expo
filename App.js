import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Provider as AuthProvider} from './src/Context/AuthContext';
import { navigationRef } from './src/navigationRef';
// Screens
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import TaskLists from './src/screens/TaskLists';
//import TaskCreate from './src/screens/TaskCreate';
import NewTask from './src/screens/NewTask';
import TaskDetail from './src/screens/TaskDetail';
import Account from './src/screens/Account';  
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { TaskProvider } from './src/Context/TaskContext';
// Navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LoginStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="SignUp" component={SignUp} options={ {headerShown : false} }/>
    <Stack.Screen name="SignIn" component={SignIn} options={ {headerShown : false} } />
  </Stack.Navigator>
);

const TaskStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="TaskLists" component={TaskLists} options = {{ headerShown : false }} />
    <Stack.Screen name="NewTask" component={NewTask} options = {{ headerShown : true}}/>
    <Stack.Screen name= "TaskDetail" component={TaskDetail}  options = {{ headerShown : true}}/>
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="TaskListTab" component={TaskStack} options = {{ headerShown : false }} />
    <Tab.Screen name="Account" component={Account} options = {{ headerShown : false }} />
  </Tab.Navigator>
);

const App = () => (
  <NavigationContainer ref = {navigationRef}>
    <Stack.Navigator initialRouteName='ResolveAuth' screenOptions={{ headerShown: false }}>
       <Stack.Screen name="ResolveAuth" component={ResolveAuthScreen} />
      <Stack.Screen name="Login" component={LoginStack} />
      <Stack.Screen name="Main" component={MainTabs} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default ()=> {
  return (
    <TaskProvider>
    <AuthProvider>
        <App/>
    </AuthProvider>
    </TaskProvider>
  );
};
