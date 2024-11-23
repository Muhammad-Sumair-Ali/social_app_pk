import { NextResponse } from "next/server";
import { User } from "@/src/models/user.model";

export async function POST(request, { params }) {
  const { id } = params;
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

export async function PUT(request, { params }) {
  const { id } = params;
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

export async function DELETE(request, { params }) {
  const { id } = params;
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
