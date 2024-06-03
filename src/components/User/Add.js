import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ users, setUsers, setIsAdding }) => {
  const [userID, setUserID] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [balance, setBalance] = useState('');

  const handleAdd = e => {
    e.preventDefault();

    if (!userID || !username || !email || !password || !bio || !balance) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const newUser = {
      userID,
      create_at: new Date().toISOString(),
      username,
      email,
      password,
      bio,
      balance: parseFloat(balance),
    };

    users.push(newUser);
    localStorage.setItem('users_data', JSON.stringify(users));
    setUsers(users);
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `User ${username} has been added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add User</h1>
        <label htmlFor="userID">User ID</label>
        <input
          id="userID"
          type="text"
          name="userID"
          value={userID}
          onChange={e => setUserID(e.target.value)}
        />
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          value={bio}
          onChange={e => setBio(e.target.value)}
        ></textarea>
        <label htmlFor="balance">Balance</label>
        <input
          id="balance"
          type="number"
          name="balance"
          value={balance}
          onChange={e => setBalance(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
