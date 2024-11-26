import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import axios from 'axios';

i

export function useAuthentication() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentUserLoggedIn, setCurrentUserLoggedIn] = useState({});

  const { register, handleSubmit, formState: { errors } } = useForm();

  const login = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/login', data); 
      console.log("response => ", response)
      if (response.data.token) {
        toast.success('Login successful!');
        document.cookie = `token=${response.data.token}; path=/; max-age=86400`;
        // document.cookie = `user=${JSON.stringify(response.data.user)}`;
        router.push('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  const signup = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/register', data); 
      console.log("response => ", response)
      if (response.data.token) {
        toast.success('user register successfull!');
        // document.cookie = `token=${response.data.token}; path=/; max-age=86400`;
        router.push('/auth/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'register failed');
    } finally {
      setLoading(false);
    }
  };

  const currentUser = async () => {
    try {
      const response = await axios.get('/api/auth/currentuser');
      // console.log("CurrentUser LoggedIn => " ,response)
      // setCurrentUserLoggedIn(response.data)
      return response;
    } catch (error) {
      toast.error(error.response?.data?.error || 'User not logged in');
    }
  };

  const logoutUser = async () => {
    try {
      const response = await axios.post('/api/auth/logout');
      if (response.data.message) {
        toast.success('Logged out successfully');
       
        document.cookie = "token=; path=/; max-age=0";
        router.push("/auth/login"); 
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Logout failed');
    }
  };

  

  return {
    register,
    handleSubmit,
    login,
    signup,
    logoutUser,
    errors,
    loading,
    currentUser,
    currentUserLoggedIn,
    setCurrentUserLoggedIn
  };
}
