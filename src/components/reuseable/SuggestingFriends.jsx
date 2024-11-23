import React, { useEffect, useState } from 'react';
import { useUsers } from '@/hooks/useUsers'; 

const SuggestingFriends = () => {
  const { data:friends } = useUsers(); 
//   const [friends, setFriends] = useState([]); 
  const [loading, setLoading] = useState(true); 


  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="font-medium text-gray-800 mb-4">Friend Suggestions</h2>

      {friends?.length === 0 ? (
        <p>No friends to suggest.</p>
      ) : (friends && 
        friends.map((friend) => (
          <div key={friend._id} className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div>
                <h3 className="font-medium text-gray-800">{friend.name}</h3>
                <p className="text-sm text-gray-500">{friend.email}</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
              Add Friend
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default SuggestingFriends;
