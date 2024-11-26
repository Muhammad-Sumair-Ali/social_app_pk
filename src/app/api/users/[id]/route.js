import { NextResponse } from "next/server";
import { User } from "@/models/user.model";
import connectDB from "@/db";


// Add friend request
export async function POST(request, { params }) {
  connectDB()
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  // const { id } = params;
  const { currentUserId } = await request.json();

  const userToFollow = await User.findById(id);
  const currentUser = await User.findById(currentUserId);

  if (!userToFollow || !currentUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (currentUser.friends.includes(id)) {
    return NextResponse.json({ error: "Already friends" }, { status: 400 });
  }
  if (currentUser.sentRequests.includes(id)) {
    return NextResponse.json({ error: "Request already sent" }, { status: 400 });
  }

  currentUser.sentRequests.push(id);
  userToFollow.receivedRequests.push(currentUser._id);

  await currentUser.save();
  await userToFollow.save();

  return NextResponse.json({ message: "Friend request sent" });
}




// Accept request 
export async function PUT(request, { params }) {
  connectDB()

  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();


  const { currentUserId } = await request.json();

  const userToAccept = await User.findById(id);
  const currentUser = await User.findById(currentUserId);

  if (!userToAccept || !currentUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (!currentUser.receivedRequests.includes(id)) {
    return NextResponse.json({ error: "No pending request" }, { status: 400 });
  }

  currentUser.friends.push(id);
  userToAccept.friends.push(currentUser._id);

  currentUser.receivedRequests = currentUser.receivedRequests.filter(
    (userId) => userId.toString() !== id
  );
  userToAccept.sentRequests = userToAccept.sentRequests.filter(
    (userId) => userId.toString() !== currentUserId
  );

  await currentUser.save();
  await userToAccept.save();

  return NextResponse.json({ message: "Friend request accepted" });
}


// Decline request
export async function DELETE(request, { params }) {
  connectDB()

  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  const { currentUserId } = await request.json();

  const userToDecline = await User.findById(id);
  const currentUser = await User.findById(currentUserId);

  if (!userToDecline || !currentUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  currentUser.receivedRequests = currentUser.receivedRequests.filter(
    (userId) => userId.toString() !== id
  );
  userToDecline.sentRequests = userToDecline.sentRequests.filter(
    (userId) => userId.toString() !== currentUserId
  );

  await currentUser.save();
  await userToDecline.save();

  return NextResponse.json({ message: "Friend request declined" });
}




export async function GET(request, res) {
  connectDB()

  try {
    
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
  
    // const { id } = params;
    // const { currentUserId } = await request.json();
  
    const usersReqs = await User.findById(id);
    // const currentUser = await User.findById(currentUserId);
  
    if (!usersReqs) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  
  
    return NextResponse.json({ 
     message: "user get success",
      user: usersReqs });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user requests.", error: error.message },
      { status: 500 }
    );
  }

}