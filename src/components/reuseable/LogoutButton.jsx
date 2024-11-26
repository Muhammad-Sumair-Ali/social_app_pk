'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';


const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
     
      localStorage.removeItem('token');
      
      await axios.post(`/api/auth/logout`);
      
      router.push('/auth/login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
