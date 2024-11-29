import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface InfoItemProps {
  label: string;
  value: string | number | undefined;
}

const InfoItem: React.FC<InfoItemProps> = ({label, value}) => {
  if (!value) return null; // Render nothing if value is undefined
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  value: {
    flex: 1,
    color: '#555',
  },
});

export default InfoItem;
