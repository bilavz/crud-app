import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Header from "./Header";
import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";
import Logout from "../Logout";

const Dashboard = ({ setIsAuthenticated }) => {
  const [literatures, setLiteratures] = useState([]);
  const [selectedLiterature, setSelectedLiterature] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("literatures_data"));
    if (data !== null && Object.keys(data).length !== 0) setLiteratures(data);
  }, []);

  const handleEdit = (id) => {
    const [literature] = literatures.filter((literature) => literature.id === id);
    setSelectedLiterature(literature);
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
        const [literature] = literatures.filter((literature) => literature.id === id);

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${literature.title}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const literaturesCopy = literatures.filter((literature) => literature.id !== id);
        localStorage.setItem("literatures_data", JSON.stringify(literaturesCopy));
        setLiteratures(literaturesCopy);
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
            <Table literatures={literatures} handleEdit={handleEdit} handleDelete={handleDelete} />
          </div>
        </>
      )}
      {isAdding && (
        <Add literatures={literatures} setLiteratures={setLiteratures} setIsAdding={setIsAdding} />
      )}
      {isEditing && (
        <Edit literatures={literatures} selectedLiterature={selectedLiterature} setLiteratures={setLiteratures} setIsEditing={setIsEditing} />
      )}
    </div>
  );
};

export default Dashboard;
