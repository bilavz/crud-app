import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ comments, selectedComment, setComments, setIsEditing }) => {
  const forumCommentId = selectedComment.forumCommentId;

  const [content, setContent] = useState(selectedComment.content);
  const [userId, setUserId] = useState(selectedComment.userId);
  const [forumId, setForumId] = useState(selectedComment.forumId);

  const handleUpdate = e => {
    e.preventDefault();

    if (!content || !userId || !forumId) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const updatedComment = {
      forumCommentId,
      content,
      userId,
      forumId,
      forumComment_create_at: selectedComment.forumComment_create_at
    };

    for (let i = 0; i < comments.length; i++) {
      if (comments[i].forumCommentId === forumCommentId) {
        comments.splice(i, 1, updatedComment);
        break;
      }
    }

    localStorage.setItem('comments_data', JSON.stringify(comments));
    setComments(comments);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `Comment has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Comment</h1>
        <label htmlFor="content">Content</label>
        <input
          id="content"
          type="text"
          name="content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <label htmlFor="userId">User ID</label>
        <input
          id="userId"
          type="text"
          name="userId"
          value={userId}
          onChange={e => setUserId(e.target.value)}
        />
        <label htmlFor="forumId">Forum ID</label>
        <input
          id="forumId"
          type="text"
          name="forumId"
          value={forumId}
          onChange={e => setForumId(e.target.value)}
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
