import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface ButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  style?: object;
  textStyle?: object;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  disabled = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled ? styles.disabled : null, style]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: '#1779ba',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  disabled: {
    backgroundColor: '#a1a1a1',
  },
});

export default Button;
