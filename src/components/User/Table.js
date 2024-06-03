import React from 'react';

const Table = ({ users, handleEdit, handleDelete }) => {
  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Created At</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Bio</th>
            <th>Balance</th>
            <th colSpan={2} className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, i) => (
              <tr key={user.userID}>
                <td>{user.userID}</td>
                <td>{new Date(user.create_at).toLocaleString()}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.bio}</td>
                <td>{user.balance}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(user.userID)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(user.userID)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center">No Users Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
