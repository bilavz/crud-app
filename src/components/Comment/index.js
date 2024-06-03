import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Header from "./Header";
import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";
import Logout from "../Logout";

const Dashboard = ({ setIsAuthenticated }) => {
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("comments_data"));
    if (data !== null && Object.keys(data).length !== 0) setComments(data);
  }, []);

  const handleEdit = (forumCommentId) => {
    const [comment] = comments.filter((comment) => comment.forumCommentId === forumCommentId);
    setSelectedComment(comment);
    setIsEditing(true);
  };

  const handleDelete = (forumCommentId) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        const [comment] = comments.filter((comment) => comment.forumCommentId === forumCommentId);

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `Comment by user ${comment.userId} has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const commentsCopy = comments.filter((comment) => comment.forumCommentId !== forumCommentId);
        localStorage.setItem("comments_data", JSON.stringify(commentsCopy));
        setComments(commentsCopy);
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
            <Table comments={comments} handleEdit={handleEdit} handleDelete={handleDelete} />
          </div>
        </>
      )}
      {isAdding && (
        <Add comments={comments} setComments={setComments} setIsAdding={setIsAdding} />
      )}
      {isEditing && (
        <Edit comments={comments} selectedComment={selectedComment} setComments={setComments} setIsEditing={setIsEditing} />
      )}
    </div>
  );
};

export default Dashboard;
