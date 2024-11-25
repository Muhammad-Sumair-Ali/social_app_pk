import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { usersApi } from '@/helper/apiRoutes';

const FriendRequestButton = ({ userId, currentUserId, isFriend, hasSentRequest }) => {
  const [friendStatus, setFriendStatus] = useState('');

  // Determine the initial status based on props
  useEffect(() => {
    if (isFriend) {
      setFriendStatus('friends');
    } else if (hasSentRequest) {
      setFriendStatus('sentRequest');
    } else {
      setFriendStatus('noRequest');
    }
  }, [isFriend, hasSentRequest]);

  // Function to handle sending a friend request
  const sendFriendRequest = async () => {
    try {
      const response = await axios.post(`${usersApi}/${userId}`, {
        currentUserId,
      });
      setFriendStatus('sentRequest');
      toast.success(response.data.message || 'Friend request sent');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to send request');
    }
  };

  // Function to handle canceling a friend request
  const cancelFriendRequest = async () => {
    try {
      const response = await axios.delete(`${usersApi}/${userId}`, {
        data: { currentUserId },
      });
      setFriendStatus('noRequest');
      toast.success(response.data.message || 'Friend request canceled');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to cancel request');
    }
  };

  return (
    <div>
      {/* Render buttons based on the current friend status */}
      {friendStatus === 'friends' && (
        <button
          className="bg-green-500 text-white text-xs px-2 py-2 rounded-lg cursor-not-allowed"
          disabled
        >
          Friends
        </button>
      )}
      {friendStatus === 'sentRequest' && (
        <button
          className="bg-red-500 text-white text-xs px-2 py-2 rounded-lg hover:bg-red-600 transition"
          onClick={cancelFriendRequest}
        >
          Cancel Request
        </button>
      )}
      {friendStatus === 'noRequest' && (
        <button
          className="bg-indigo-600 text-white text-xs px-2 py-2 rounded-lg hover:bg-indigo-700 transition"
          onClick={sendFriendRequest}
        >
          Add Friend
        </button>
      )}
    </div>
  );
};

export default FriendRequestButton;
