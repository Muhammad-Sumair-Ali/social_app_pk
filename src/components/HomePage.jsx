'use client';

import React from 'react';
import Link from 'next/link';
import SuggestingUsers from './reuseable/SuggestingUsers';
import ReceivedRequest from './reuseable/ReceivedRequest';

const HomePage = () => {
  return (
    <>
    <div className="bg-gray-100 min-h-screen pt-10">
      {/* Main Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 px-4 sm:px-6 lg:px-8 py-8">
        {/* Left Sidebar */}
        <div className="hidden md:block md:col-span-3 bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-800">Quick Links</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/profile">
                <span className="block text-gray-600 hover:text-blue-600 transition cursor-pointer">
                  Profile
                </span>
              </Link>
            </li>
            <li>
              <Link href="/friends">
                <span className="block text-gray-600 hover:text-blue-600 transition cursor-pointer">
                  Friends
                </span>
              </Link>
            </li>
            <li>
              <Link href="/settings">
                <span className="block text-gray-600 hover:text-blue-600 transition cursor-pointer">
                  Settings
                </span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Posts Section (Middle Column) */}
        <div className="col-span-1 md:col-span-6">
          {/* Create Post Section */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <textarea
              placeholder="What's on your mind?"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Post
            </button>
          </div>

          {/* Posts Section */}
          <div className="space-y-4 mt-6">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <h2 className="font-medium text-gray-800">John Doe</h2>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">
                  This is an example post. Users can write something here to share with their
                  friends.
                </p>
                <div className="flex justify-between mt-4 text-gray-500">
                  <button className="hover:text-blue-600">Like</button>
                  <button className="hover:text-blue-600">Comment</button>
                  <button className="hover:text-blue-600">Share</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden md:block md:col-span-3 bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-900">Received Requests</h2>
          <div className="mt-4 mb-4">
           <ReceivedRequest/>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Friend Suggestions</h2>
          <div className="mt-4">
            <SuggestingUsers />
          </div>
        </div>
      </div>
    </div>
    </>

  );
};

export default HomePage;
