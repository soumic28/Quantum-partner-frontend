import axios from 'axios';
import { BACKEND_URL } from '../../config';

interface User {
  _id: string;
  email: string;
  fullName: string;
  verified: boolean;
}

interface LoginResponse {
  message: string;
  success: boolean;
  data: {
    user: User;
    access_token: string;
  };
}

interface SignUpData {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  state: string;
  city: string;
  pincode: string;
  email: string;
  phoneNumber: string;
}


export const signUp = async (payload: SignUpData): Promise<string> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${BACKEND_URL}/partner/google-login`, // Change to your actual signup endpoint
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data;

    if (!data.success) {
      throw new Error(data.message || 'Signup failed');
    }

    console.log('Response from signup:', data.data);
    localStorage.setItem('accessToken', data.data.access_token);
    return data.data.access_token;
  } catch (error: any) {
    console.error('Error during signup:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw new Error(error.response?.data?.message || error.message || 'Signup failed');
  }
};

// interface LoginData {
//   phoneNumber: string;
// }

export const login = async (data: unknown) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/login`, data);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};



export const updateProfile = async (data: unknown) => { 

  try {
    await axios.put(`${BACKEND_URL}/user/update`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    return true;
  } catch (error) {
    console.error('Error during updateProfile:', error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    console.log('Response from getProfile:', response.data.data);

    return response.data.data;
  } catch (error) {
    console.error('Error during getProfile:', error);
    throw error;
  }
};