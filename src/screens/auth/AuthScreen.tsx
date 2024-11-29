import React, {useEffect, useState} from 'react';
import {
  View,
  Alert,
  Dimensions,
  BackHandler,
  StatusBar,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../constant/color';
import InputField from '../../components/InputField';
import Button from '../../components/Button';

const {width} = Dimensions.get('screen');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AuthScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<{email?: string; password?: string}>({});
  const [btnLoading, setBtnLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  const validateInputs = (): boolean => {
    const errors: {email?: string; password?: string} = {};
    if (!email) errors.email = 'Email is required.';
    else if (!EMAIL_REGEX.test(email)) errors.email = 'Invalid email.';
    else if (!password) errors.password = 'Password is required.';
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setBtnLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      console.log(error);
      // Alert.alert('Login Failed', 'Invalid email or password');
      setErrorMessage('Login failed. Check your credentials.');
    } finally {
      setBtnLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!validateInputs()) return;

    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Success', 'User created successfully!');
    } catch (error: any) {
      setErrorMessage('Email already registered!');
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        BackHandler.exitApp();
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.accentColor} barStyle="dark-content" />
      <View style={styles.innerContainer}>
        <InputField
          placeholder="Email"
          value={email}
          onChangeText={text => {
            setEmail(text);
            setErrorMessage(null);
          }}
          error={error.email}
          keyboardType="email-address"
        />
        <InputField
          placeholder="Password"
          value={password}
          onChangeText={text => {
            setPassword(text);
            setErrorMessage(null);
          }}
          error={error.password}
          secureTextEntry
        />
        {errorMessage && <InputField error={errorMessage} showOnlyError />}

        <Button text="Login" onPress={handleLogin} disabled={btnLoading} />
        <Button
          text="Sign Up"
          onPress={handleSignUp}
          style={{backgroundColor: colors.success}}
          disabled={btnLoading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.accentColor,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default AuthScreen;
