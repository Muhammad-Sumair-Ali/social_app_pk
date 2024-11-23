'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SuggestingFriends from './reuseable/SuggestingFriends';

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">SocialApp</h1>
            </div>
            <div className="flex space-x-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Home
              </Link>
              <Link href="/app/profile" className="text-gray-700 hover:text-blue-600 font-medium">
                Profile
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16 max-w-full  grid grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-4">
        {/* Posts Section */}
        <div className="col-span-1 lg:col-span-3">
          {/* Create Post */}
          <div className="bg-white p-2 mt-2 rounded-lg shadow-md">
            <textarea
              placeholder="What's on your mind?"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Post
            </button>
          </div>

          {/* Posts */}
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
      
      <SuggestingFriends/>
      </div>
    </div>
  );
};

export default HomePage;
