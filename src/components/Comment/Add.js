import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ comments, setComments, setIsAdding }) => {
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [forumId, setForumId] = useState('');

  const handleAdd = e => {
    e.preventDefault();

    if (!content || !userId || !forumId) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const id = comments.length + 1;
    const newComment = {
      forumCommentId: id,
      content,
      userId,
      forumId,
      forumComment_create_at: new Date().toISOString()
    };

    comments.push(newComment);
    localStorage.setItem('comments_data', JSON.stringify(comments));
    setComments(comments);
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `Comment has been added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Comment</h1>
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
