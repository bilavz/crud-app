import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ users, selectedUser, setUsers, setIsEditing }) => {
  const userID = selectedUser.userID;

  const [username, setUsername] = useState(selectedUser.username);
  const [email, setEmail] = useState(selectedUser.email);
  const [password, setPassword] = useState(selectedUser.password);
  const [bio, setBio] = useState(selectedUser.bio);
  const [balance, setBalance] = useState(selectedUser.balance);

  const handleUpdate = e => {
    e.preventDefault();

    if (!username || !email || !password || !bio || !balance) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const updatedUser = {
      userID,
      create_at: selectedUser.create_at,
      username,
      email,
      password,
      bio,
      balance: parseFloat(balance),
    };

    const updatedUsers = users.map(user => user.userID === userID ? updatedUser : user);

    localStorage.setItem('users_data', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `User ${username}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit User</h1>
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
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
