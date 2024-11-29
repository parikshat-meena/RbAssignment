import {DrawerActions, useNavigation} from '@react-navigation/native';
import {Icon, Input, SearchBarProps} from '@rneui/themed';
import React from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '../constant/color';

type SearchCampIProps = {
  onClear?: () => void;
  focused?: boolean;
  onCancel?: () => void;
  header?: boolean;
} & SearchBarProps;

const SearchComp: React.FC<SearchCampIProps> = props => {
  const navigation = useNavigation();

  const {
    value,
    rightIcon,
    onClear,
    onCancel,
    focused,
    header,
    leftIcon,
    style,
    ...rest
  } = props;

  const toggleDrawer = () => [
    navigation.dispatch(DrawerActions.toggleDrawer()),
  ];

  return (
    <Input
      returnKeyType="search"
      placeholder="Search"
      value={value}
      {...rest}
      inputContainerStyle={styles.inputContainerStyle}
      style={[styles.font, style]}
      rightIcon={
        value && value.length !== 0 ? (
          <Icon
            size={20}
            onPress={onClear}
            name="close"
            type="material-community"
            style={{paddingHorizontal: 10}}
          />
        ) : (
          rightIcon
        )
      }
      containerStyle={{height: 50}}
      leftIcon={
        leftIcon ? (
          leftIcon
        ) : focused ? (
          <Icon
            onPress={onCancel}
            name="chevron-left"
            type="material-community"
            color={colors.blue}
            size={24}
            style={{paddingHorizontal: 10}}
          />
        ) : header ? (
          <Icon
            size={22}
            onPress={toggleDrawer}
            name="menu"
            type="material-community"
            style={{paddingHorizontal: 10}}
          />
        ) : (
          <Icon
            size={22}
            // onPress={toggleDrawer}
            name="search"
            type="material-icon"
            color={colors.blue}
            style={{paddingHorizontal: 10}}
          />
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    padding: 10,
  },
  inputContainerStyle: {
    borderBottomColor: colors.primaryColor,
    borderBottomWidth: 0,
    // paddingHorizontal: 15,
    borderRadius: 5,
    elevation: 1,
    backgroundColor: colors.primaryColor,
  },
  font: {
    fontSize: 14,
    paddingHorizontal: 5,
  },
});
export default SearchComp;
