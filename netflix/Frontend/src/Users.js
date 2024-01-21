import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const goBack = () => {
        navigate('/adminPanel');
      };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users/getUsers');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
    const intervalId = setInterval(fetchUsers, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <button onClick={goBack} style={{ marginBottom: '20px' }}>Go Back</button>
      <table style={{ width: '60%', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>User Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id || index}>
              <td>{user.user_email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
