'use client'
import React from 'react'
import { useAuthentication } from '@/hooks/useAuthentication'
import Link from 'next/link';

const Register = () => {

  const { register, handleSubmit, signup, errors, loading } = useAuthentication();
  
  const onSubmit = (data) => {
    signup(data); 
  };



  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <Image alt="" src="htsa" className="mx-auto h-10 w-auto" /> */}
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Register a new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  {...register('name', { required: 'Full Name is required' })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  {...register('email', { required: 'Email is required' })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div>
            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
              Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  {...register('password', { required: 'Password is required' })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Registering...' : 'Register Now'}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Have a already account
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register
