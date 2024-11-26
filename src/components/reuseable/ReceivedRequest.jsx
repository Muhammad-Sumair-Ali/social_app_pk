'use client'
import { useUsers } from "@/hooks/useUsers";
import { useAuth } from "@/context/AuthContext";
import Avatar from '@/assets/avtar.png'
import Image from "next/image";
import FriendAcceptRequestButton from "../User/AcceptRequest";
import useFetchReceivedRequests from "@/hooks/useFetchRecivedReqs";
const ReceivedRequest = () => {

  const { data } = useUsers();
  const { user } = useAuth();

  const receivedRequests = user?.user?.receivedRequests; // Array of IDs

  const { users, loading, error } = useFetchReceivedRequests(receivedRequests);


  return (
    <>


<div>
     
      {users?.length > 0 ? (
        users?.map((friend) => (
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
            <FriendAcceptRequestButton
              userId={friend._id} // Target user's ID
              currentUserId={user?.user?._id} // Logged-in user's ID
              isFriend={user?.user?.friends?.includes(friend._id)} // Check if they're already friends
              hasSentRequest={user?.user?.sentRequests?.includes(friend._id)} // Check if the request has already been sent 
              />
            </div>
             
          </div>
        ))
      ) : (
        <p>No friend requests found!!</p>
      )}
    </div>
     

     
    </>
  );
};

export default ReceivedRequest;
