'use client'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function withAuth(WrappedComponent, requiredRole) {
  return function AuthWrapper(props) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token'); 
      const role = localStorage.getItem('role');

      if (!token || (requiredRole && role !== requiredRole)) {
        router.push('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
}
