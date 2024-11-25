'use client'
import { usersApi } from "@/helper/apiRoutes";
import { useEffect, useState } from "react";;
import api from "@/helper/api";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";

export function useUsers(id) {
    const {user} = useAuth()
    const [data, setData] = useState(null);
  
    const currentUser = async () => {
      try {
        const response = await api.get(`${authApi}/currentuser`);
        console.log("CurrentUser LoggedIn =>", response.data);
        
    
        return response.data;
      } catch (error) {
        console.log("Error fetching current user:", error.response?.data);
      
      }
    };
  
    const getAllUsers = async () => {
      try {
        const token = Cookies.get("token");
    
        // if (!token) {
        //   throw new Error('No token found');
        // }
    
        const response = await api.get(`${usersApi}/allusers`, {
          headers: {
            Authorization: `Bearer ${ user.token || token}`,
          },
        });
    
       
        // const suggestingSomeFriends = response.data.users?.filter(
        //   (friend) => friend.email != user?.user?.email 
        // );
    
        console.log("All Users Fetched =>", response.data.users);
        // setData(suggestingSomeFriends); 
        setData(response.data.users); 
    
    
      } catch (error) {
        console.log("Error fetching all users:", error);
      
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
  