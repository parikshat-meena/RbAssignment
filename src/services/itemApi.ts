import axios from 'axios';
import {UserParams} from '../model';

const API_URL = 'https://dummyjson.com/products'; // Replace with your API endpoint

export const getItems = async (): Promise<UserParams[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};
