// actions/auth.js
import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
import { toast } from 'react-toastify';

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    console.log(data)

    // Lưu dữ liệu vào localStorage
    localStorage.setItem('profile', JSON.stringify(data));

    toast.success('Sign in successful!');
    navigate('/');
  } catch (error) {
    toast.error('Sign in failed! Please check your credentials and try again.');
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });

    // Lưu dữ liệu vào localStorage
    localStorage.setItem('profile', JSON.stringify(data));

    toast.success('Sign up successful!');
    navigate('/');
  } catch (error) {
    toast.error('Sign up failed! Please try again.');
    console.log(error);
  }
};
