import React from "react";
import { useUsers } from "@/hooks/useUsers";
import FriendRequestButton from "../User/FriendRequestButton";
import { useAuth } from "@/context/AuthContext";
import Avatar from '@/assets/avtar.png'
import Image from "next/image";
const SuggestingUsers = () => {
  const { data } = useUsers();
  const { user } = useAuth();

  const SuggestingSomeUsers = data?.filter(
    (friend) => friend?.email !== user?.user?.email
  );

  return (
    <>
     

      {SuggestingSomeUsers?.length === 0 ? (
        <p>No Users to suggest.</p>
      ) : (
        SuggestingSomeUsers &&
        SuggestingSomeUsers.map((friend) => (
          <div
            key={friend._id}
            className="flex items-center justify-between mb-4 flex-col gap-2">
            <div className="flex items-center space-x-4">
              <Image
              src={Avatar}
              width={40}
              height={40}
              alt="user"
              unoptimized
              />
              <div>
                <h3 className="font-medium text-sm text-gray-800">{friend.name}</h3>
              </div>
            <FriendRequestButton
              userId={friend._id} // Target user's ID
              currentUserId={user?.user?._id} // Logged-in user's ID
              isFriend={user?.user?.friends?.includes(friend._id)} // Check if they're already friends
              hasSentRequest={user?.user?.sentRequests?.includes(friend._id)} // Check if the request has already been sent 
              />
            </div>
             
          </div>
        ))
      )}
    </>
  );
};

export default SuggestingUsers;
