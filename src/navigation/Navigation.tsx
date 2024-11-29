import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../model';
import HomeScreen from '../screens/home/HomeScreen';
import ProductScreen from '../screens/product/ProductScreen';
import AuthScreen from '../screens/auth/AuthScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Navigation = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user: any) => {
      // console.log(user, 'user info');
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProductScreen"
            component={ProductScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
