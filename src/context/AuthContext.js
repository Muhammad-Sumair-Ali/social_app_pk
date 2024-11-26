'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
 

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({
        user: null,
        token: "",
    });

    const token = Cookies.get("token");

    useEffect(() => {
    
        const currentUser = async () => {
            try {
                const response = await fetch(`/api/auth/currentuser`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) {
                    throw new Error('Error fetching user');
                }

                const data = await response.json();
                
                setUser({
                    user: data.user,
                    token: data.token,
                });

            } catch (error) {
                console.error(error.message || 'User not logged in');
               
            }
        };

        currentUser(); 
    }, [token]);  

    console.log("Context Api =>", user);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
