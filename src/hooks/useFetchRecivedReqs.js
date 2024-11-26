'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '@/context/AuthContext';


const useFetchReceivedRequests = (receivedRequests) => {
  const {user} = useAuth()
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (receivedRequests?.length > 0) {
      fetchAllReceivedRequests();
    }
  }, [receivedRequests]);

  const fetchAllReceivedRequests = async () => {
    setLoading(true);
    setError(null);

    try {
      // const token = localStorage.getItem('token');
      const token = Cookies.get("token");
      // if (!token) {
      //   throw new Error('No token found');
      // }

      // Fetch all users by ID in receivedRequests
      const requests = receivedRequests.map((id) =>
        axios.get(`/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token || user.token}`,
          },
        })
      );
     
      const responses = await Promise.all(requests);
   
      const usersData = responses.map((res) => res.data.user);
      
      setUsers(usersData);

      console.log('Received Requests Users:', usersData);
    } catch (err) {
      setError(err.message || 'Failed to fetch received requests');
      console.error('Error fetching received requests:', err);
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, error };
};

export default useFetchReceivedRequests;
