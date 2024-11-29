type UserParams = {
  id: string;
  name: string;
};

type ProductData = {
  availabilityStatus: 'Low Stock' | 'In Stock' | 'Out of Stock';
  brand: string;
  category: string;
  description: string;
  dimensions: {
    depth: number;
    height: number;
    width: number;
  };
  discountPercentage: number;
  id: number;
  images: string[];
  meta: {
    barcode: string;
    createdAt: string; // ISO Date string
    qrCode: string;
    updatedAt: string; // ISO Date string
  };
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: string;
  reviews: {
    comment: string;
    date: string; // ISO Date string
    rating: number;
    reviewerEmail: string;
    reviewerName: string;
  }[];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  weight: number;
};

type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  ProductScreen: undefined;
  OtpScreen: undefined;
  BottomTabs: undefined;
};

type ReduxModel = {
  ProductData: ProductData[];
};

type ApiState = {
  products: ProductData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};
export type {UserParams, ProductData, RootStackParamList, ReduxModel, ApiState};
