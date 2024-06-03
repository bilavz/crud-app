import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Header from "./Header";
import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";
import Logout from "../Logout";

const Dashboard = ({ setIsAuthenticated }) => {
  const [forums, setForums] = useState([]);
  const [selectedForum, setSelectedForum] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("forums_data"));
    if (data !== null && Object.keys(data).length !== 0) setForums(data);
  }, []);

  const handleEdit = (id) => {
    const [forum] = forums.filter((forum) => forum.forumId === id);
    setSelectedForum(forum);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        const [forum] = forums.filter((forum) => forum.forumId === id);

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${forum.titleForum}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const forumsCopy = forums.filter((forum) => forum.forumId !== id);
        localStorage.setItem("forums_data", JSON.stringify(forumsCopy));
        setForums(forumsCopy);
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
            <Table forums={forums} handleEdit={handleEdit} handleDelete={handleDelete} />
          </div>
        </>
      )}
      {isAdding && (
        <Add forums={forums} setForums={setForums} setIsAdding={setIsAdding} />
      )}
      {isEditing && (
        <Edit forums={forums} selectedForum={selectedForum} setForums={setForums} setIsEditing={setIsEditing} />
      )}
    </div>
  );
};

export default Dashboard;
