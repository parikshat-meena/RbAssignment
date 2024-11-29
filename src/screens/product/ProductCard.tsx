import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ProductData} from '../../model';
import {colors} from '../../constant/color';
type ItemCardProps = {
  item: ProductData;
};

const ProductCard: React.FC<ItemCardProps> = ({item}) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductScreen', {id: item.id})}>
      <Image
        source={{
          uri:
            item.thumbnail ??
            'https://www.shutterstock.com/shutterstock/photos/2421574099/display_1500/stock-vector-attention-icon-set-danger-caution-or-alert-risk-warning-vector-symbol-in-a-black-filled-and-2421574099.jpg',
        }}
        style={styles.thumbnail}
        resizeMode="contain"
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      <View style={styles.row}>
        <Text style={styles.discount}>
          Discount: {item.discountPercentage}%
        </Text>
        <Text style={styles.rating}>Rating: {item.rating}⭐</Text>
      </View>
      <Text style={styles.stock}>
        Stock: {item.stock} ({item.availabilityStatus})
      </Text>
      <ScrollView horizontal>
        {item.tags.map((tag: any, index: any) => (
          <Text key={index} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </ScrollView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primaryColor,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: colors.secondaryColor,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative', // Added to position icons
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: colors.secondaryColorLight,
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.danger,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  discount: {
    fontSize: 14,
    color: colors.success,
  },
  rating: {
    fontSize: 14,
    color: colors.accentColor,
  },
  stock: {
    fontSize: 14,
    color: colors.danger,
  },
  tag: {
    backgroundColor: colors.lightGrey,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginRight: 5,
    fontSize: 12,
    color: colors.darkGrey,
  },
});

export default ProductCard;
