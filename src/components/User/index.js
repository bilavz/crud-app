import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Header from "./Header";
import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";
import Logout from "../Logout";

const Dashboard = ({ setIsAuthenticated }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("users_data"));
    if (data !== null && Object.keys(data).length !== 0) setUsers(data);
  }, []);

  const handleEdit = (userID) => {
    const [user] = users.filter((user) => user.userID === userID);
    setSelectedUser(user);
    setIsEditing(true);
  };

  const handleDelete = (userID) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        const [user] = users.filter((user) => user.userID === userID);

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${user.username}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const usersCopy = users.filter((user) => user.userID !== userID);
        localStorage.setItem("users_data", JSON.stringify(usersCopy));
        setUsers(usersCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <div className="navbar">
            <Logout setIsAuthenticated={setIsAuthenticated} />
          </div>
          <div>
            <Header setIsAdding={setIsAdding} setIsAuthenticated={setIsAuthenticated} />
            <Table users={users} handleEdit={handleEdit} handleDelete={handleDelete} />
          </div>
        </>
      )}
      {isAdding && (
        <Add users={users} setUsers={setUsers} setIsAdding={setIsAdding} />
      )}
      {isEditing && (
        <Edit users={users} selectedUser={selectedUser} setUsers={setUsers} setIsEditing={setIsEditing} />
      )}
    </div>
  );
};

export default Dashboard;
