import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
        try {
            const response = await fetch('http://localhost:8800/authenticate', {
                method: 'GET',
                credentials: 'include',
            });
            const result = await response.json();
            if (response.ok) {
                setUser(result.user);
            } else {
                throw new Error(result.Error);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    fetchUser();
}, []);


  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while fetching user data
  }


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
