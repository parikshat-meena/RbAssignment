import React from 'react';
import {TextInput, Text, StyleSheet, View} from 'react-native';
import {colors} from '../constant/color';

interface InputFieldProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string | null;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
  showOnlyError?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  showOnlyError,
}) => {
  return (
    <>
      {!showOnlyError && (
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, error ? styles.errorBorder : null]}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          placeholderTextColor="#a1a1a1"
        />
      )}

      {error && <Text style={styles.error}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: colors.primaryColor,
  },
  errorBorder: {
    borderColor: colors.danger,
  },
  error: {
    color: colors.danger,
    marginBottom: 10,
  },
});

export default InputField;
