

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Home from './screens/Home';
import Search from './screens/Search';
import CountryDetails from './screens/CountryDetails';
import Favorite from './screens/Favorite';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
const Stack = createStackNavigator();


function App() {
  const config = {
    animation: 'timing',
    config: {
      duration:100,
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  }
  return (
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName='Home' 
          screenOptions={{
            headerShown:false
        }}>
          <Stack.Screen 
            name="Home" 
            component={Home} />

          <Stack.Screen 
            name="Search" 
            component={Search}
            initialParams={{query:''}}
            options={{
              transitionSpec: {
                open: config,
                close: config,
            }}}/>

          <Stack.Screen 
            name="Details" 
            component={CountryDetails}
            options={{
              transitionSpec: {
                open: config,
                close: config,
              }}}/>
          <Stack.Screen 
            name="Favorite" 
            component={Favorite}
            options={{
              transitionSpec: {
                open: config,
                close: config,
              }}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
