import axios from 'axios';
import CryptoJS from 'crypto-js';

const API_URL = 'http://127.0.0.1:5000';  // Backend URL
const SECRET_KEY = '90cbe710e433bb218c2f167e468789fafc32945ce9eb75a6d2a343b69cd94d99'; // Use a strong secret key

// Function to encrypt data
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

// Function to decrypt data
const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Function to save token to local storage
const saveToken = (token) => {
  const encryptedToken = encryptData(token);
  localStorage.setItem('authToken', encryptedToken);
};

// Function to get token from local storage
const getToken = () => {
  const encryptedToken = localStorage.getItem('authToken');
  if (encryptedToken) {
    return decryptData(encryptedToken);
  }
  return null;
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const token = response.data.token;
    saveToken(token);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error logging in';
  }
};

export const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Error registering');
    } else {
      throw new Error('Network error or server is down');
    }
  }
};

export const logout = async () => {
  // Assuming there's a logout endpoint or simply removing client-side data
  localStorage.removeItem('authToken');
};

// Example function to make an authenticated request
export const fetchData = async () => {
  const token = getToken();
  try {
    const response = await axios.get(`${API_URL}/your-endpoint`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};