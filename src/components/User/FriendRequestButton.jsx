'use client'

import { usersApi } from "@/helper/apiRoutes";
import { useState } from "react";
import axios from "axios";

const FriendRequestButton = ({ userId, currentUserId, isFriend, hasSentRequest }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(hasSentRequest ? "Request Sent" : isFriend ? "Friends" : "Send Request");

  const sendRequest = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${usersApi}/${userId}/follow`, {
        currentUserId
      });
      setStatus(response.data.message);  // Update status with response message
    } catch (error) {
      console.error(error.response?.data?.error || "Something went wrong");
      setStatus("Error");
    } finally {
      setLoading(false);
    }
  };

  const acceptRequest = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`${usersApi}/${userId}/follow`, {
        currentUserId
      });
      setStatus(response.data.message);
    } catch (error) {
      console.error(error.response?.data?.error || "Something went wrong");
      setStatus("Error");
    } finally {
      setLoading(false);
    }
  };

  const declineRequest = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`${usersApi}/${userId}/follow`, {
        data: { currentUserId }
      });
      setStatus(response.data.message);
    } catch (error) {
      console.error(error.response?.data?.error || "Something went wrong");
      setStatus("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={sendRequest} 
        disabled={loading || status === "Request Sent"}
      >
        {status === "Send Request" ? "Send Friend Request" : status}
      </button>
      {isFriend && (
        <button onClick={acceptRequest} disabled={loading}>
          Accept Request
        </button>
      )}
      {hasSentRequest && (
        <button onClick={declineRequest} disabled={loading}>
          Decline Request
        </button>
      )}
    </div>
  );
};

export default FriendRequestButton;


// TODO : things for this FriendRequestButton accepting Props 
{/* <FriendRequestButton
  userId="user123"          // Target user
  currentUserId="user456"   // Logged-in user performing the action
  isFriend={false}          // Not friends
  hasSentRequest={false}    // No request sent yet
/>  */}
