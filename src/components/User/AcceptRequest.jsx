'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import useFetchReceivedRequests from '@/hooks/useFetchRecivedReqs';

const FriendAcceptRequestButton = ({ userId, currentUserId, hasReceivedRequest }) => {
  const [friendStatus, setFriendStatus] = useState(''); // 'receivedRequest', 'friends', or 'declined'
  const { user } = useAuth();

  const receivedRequests = user?.user?.receivedRequests; // Array of IDs
  const friendsCurrentUser = user?.user?.friends; // Array of friends
  // receivedRequests pe map chalana hoga phir check karn ahoga ke userId ka koi user hai \ Accepy ya Decline

  // friendsCurrentUser pe map chalana hoga phir check karn ahoga ke userId ka koi user hai \ Already friends agar hai tou 



  
  useEffect(() => {
      if (hasReceivedRequest) {
          setFriendStatus('receivedRequest');
        }
    }, [hasReceivedRequest]);
    
  // Accept Friend Request
  const acceptFriendRequest = async () => {
    try {
      const response = await axios.put(`/api/users/${userId}`, {
        currentUserId,
      });
      setFriendStatus('friends');
      toast.success('Friend request accepted!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to accept request');
    }
  };

  // Decline Friend Request
  const declineFriendRequest = async () => {
      try {
          const response = await axios.delete(`/api/users/${userId}`, {
              data: { currentUserId },
            });
            setFriendStatus('declined');
            toast.success('Friend request declined!');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to decline request');
        }
    };

  return (
    <>
    <div>
  
      {friendStatus === 'receivedRequest' && (
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={acceptFriendRequest}
          >
            Accept Friend Request
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            onClick={declineFriendRequest}
          >
            Decline Friend Request
          </button>
        </div>
      )}

      {friendStatus === 'friends' && (
          <button className="bg-green-500 text-white p-2 rounded-md" disabled>
          You are now friends
        </button>
      )}

      {friendStatus === 'declined' && (
          <button className="bg-gray-400 text-white p-2 rounded-md" disabled>
          Request Declined
        </button>
      )}
    </div>
      </>
  );
};

export default FriendAcceptRequestButton;

//  TODO : currentUser.recivedReq ke andar UserId ka Koi Request  hai tou Us ko accept ya decline karo so agar nahi hai waha 
//  Or Woh UserId [Friends] ke array mai hai tou  hum pehle se friends hai we are friends   