'use client'
import { usersApi } from "@/helper/apiRoutes";
import { useEffect, useState } from "react";;
import api from "@/helper/api";

export function useUsers() {
  
    const [data, setData] = useState(null);
  
    const currentUser = async () => {
      try {
        const response = await api.get(`${authApi}/currentuser`);
        console.log("CurrentUser LoggedIn =>", response.data);
        return response.data;
      } catch (error) {
        console.log("Error fetching current user:", error.response?.data);
        // console.error(error.response?.data?.error || "User not logged in");
      }
    };
  
    const getAllUsers = async () => {
      try {
        const token = localStorage.getItem('token'); 

        if (!token) {
          throw new Error('No token found');
        }
    

    const response = await api.get(`${usersApi}/allusers`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

        console.log("All Users Fetched =>", response.data);
        setData(response.data.users)
      } catch (error) {
        console.log("Error fetching all users:", error);
        // toast.error(error.response?.data?.error || "Failed to fetch users");
      }
    };

   
    useEffect(() => {
        getAllUsers()
    }, [])
     
    return {
      currentUser,
      getAllUsers,
      data
    };
  }
  