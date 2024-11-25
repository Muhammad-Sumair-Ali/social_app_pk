'use client'
import Link from 'next/link'
import LogoutButton from '../reuseable/LogoutButton'



const Navbar = () => {

  return (
    <>

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
              <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 font-medium">
                Login
              </Link>
            <LogoutButton/>
            </div>
          </div>
        </div>
      </nav>
     
    </>
  )
}

export default Navbar
