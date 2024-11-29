import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, RouteProp} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constant/color';
import {ProductData} from '../../model';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import InfoItem from './InfoItem';

type ProductScreenProps = {
  route: RouteProp<{params: {id: number}}, 'params'>;
};

const ProductScreen: React.FC<ProductScreenProps> = ({route}) => {
  const {id} = route.params;
  const productData = useSelector((state: RootState) => state.products);
  const [product, setProduct] = useState<ProductData | undefined>();
  const navigation = useNavigation();

  useEffect(() => {
    const selectedProduct = productData.find(ele => ele.id === id);
    setProduct(selectedProduct);
  }, [id, productData]);

  const renderReview = ({item}: {item: ProductData['reviews'][0]}) => (
    <View style={styles.review}>
      <Text style={styles.reviewText}>"{item.comment}"</Text>
      <Text>Rating: {item.rating}/5</Text>
      <Text>By: {item.reviewerName}</Text>
    </View>
  );

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text>Product not found!</Text>
      </View>
    );
  }

  const details = [
    {label: 'Category', value: product.category},
    {
      label: 'Dimensions',
      value: `${product.dimensions.width}x${product.dimensions.height}x${product.dimensions.depth} cm`,
    },
    {label: 'Weight', value: `${product.weight} kg`},
    {label: 'SKU', value: product.sku},
    {label: 'Return Policy', value: product.returnPolicy},
    {label: 'Warranty', value: product.warrantyInformation},
    {label: 'Shipping', value: product.shippingInformation},
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.secondaryColor} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
      </View>

      {/* Product Image */}
      <Image source={{uri: product.thumbnail}} style={styles.thumbnail} />

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.brand}>Brand: {product.brand}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.status}>
          Availability: {product.availabilityStatus} ({product.stock} left)
        </Text>
        <Text style={styles.description}>{product.description}</Text>

        {/* Additional Product Information */}
        <Text style={styles.sectionTitle}>Details:</Text>
        <FlatList
          data={details}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <InfoItem label={item.label} value={item.value} />
          )}
        />

        {/* Reviews */}
        <Text style={styles.sectionTitle}>Reviews:</Text>
        <FlatList
          data={product.reviews}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderReview}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentColor,
    padding: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: colors.secondaryColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  thumbnail: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  brand: {
    fontSize: 16,
    color: colors.secondaryColorLight,
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    color: colors.pink,
    marginVertical: 8,
  },
  status: {
    fontSize: 14,
    color: colors.accentColor,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginVertical: 8,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: colors.accentColor,
    padding: 5,
    borderRadius: 5,
  },
  review: {
    marginVertical: 8,
    padding: 10,
    backgroundColor: colors.primaryColorLight,
    borderRadius: 8,
  },
  reviewText: {
    fontStyle: 'italic',
    marginBottom: 4,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductScreen;
