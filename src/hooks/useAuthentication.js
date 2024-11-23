import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import api from "@/helper/api";
import { authApi } from "@/helper/apiRoutes";

export function useAuthentication() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const login = async (data) => {
    try {
      setLoading(true);
      const response = await api.post(`${authApi}/login`, data); 
      console.log("response => ", response)
      if (response.data.token) {
        toast.success('Login successful!');
        document.cookie = `token=${response.data.token}; path=/; max-age=86400`;
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
      const response = await api.post(`${authApi}/register`, data); 
      console.log("response => ", response)
      if (response.data.token) {
        toast.success('user register successfull!');
        // document.cookie = `token=${response.data.token}; path=/; max-age=86400`;
        router.push('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'register failed');
    } finally {
      setLoading(false);
    }
  };

  const currentUser = async () => {
    try {
      const response = await api.get(`${authApi}/currentuser`);
      console.log("CurrentUser LoggedIn => " ,response)
      return response;
    } catch (error) {
      toast.error(error.response?.data?.error || 'User not logged in');
    }
  };
  const logoutUser = async () => {
    try {
      const response = await api.post(`${authApi}/logout`);
      if (response.data.message) {
        toast.success('Logged out successfully');
       
        document.cookie = "token=; path=/; max-age=0";
        router.push("/login"); 
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
    currentUser
  };
}
