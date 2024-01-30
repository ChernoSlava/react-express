import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const SecurePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Проверка наличия токена перед загрузкой защищенной страницы
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Access denied. Please log in.');
      setLoading(false);
      return;
    }
    console.log(`Bearer ${token}`);
    // Проверка токена на   сервере (пример)
    axios.get('http://localhost:3001/secure', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log('Token verification successful');
        setLoading(false);
      })
      .catch((error) => {
        console.error('Token verification failed:', error);
        if (error.response && error.response.status === 401) {
          setError('Access denied. Invalid token.');
        } else {
          setError('An error occurred during token verification.');
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Secure Page</h1>
      <p>This is a secure page accessible only with a valid token.</p>
    </div>
  );
};
