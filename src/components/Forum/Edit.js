import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ forums, selectedForum, setForums, setIsEditing }) => {
  const id = selectedForum.forumId;

  const [titleForum, setTitleForum] = useState(selectedForum.titleForum);
  const [forumContents, setForumContents] = useState(selectedForum.forumContents);
  const [votes, setVotes] = useState(selectedForum.votes);
  const [userId, setUserId] = useState(selectedForum.userId);
  const [genreId, setGenreId] = useState(selectedForum.genreId);

  const handleUpdate = e => {
    e.preventDefault();

    if (!titleForum || !forumContents || !votes || !userId || !genreId) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const forum = {
      forumId: id,
      titleForum,
      forumContents,
      votes: parseInt(votes, 10),
      forum_create_at: selectedForum.forum_create_at,
      userId,
      genreId: parseInt(genreId, 10),
    };

    for (let i = 0; i < forums.length; i++) {
      if (forums[i].forumId === id) {
        forums.splice(i, 1, forum);
        break;
      }
    }

    localStorage.setItem('forums_data', JSON.stringify(forums));
    setForums(forums);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${forum.titleForum}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Forum</h1>
        <label htmlFor="titleForum">Title</label>
        <input
          id="titleForum"
          type="text"
          name="titleForum"
          value={titleForum}
          onChange={e => setTitleForum(e.target.value)}
        />
        <label htmlFor="forumContents">Contents</label>
        <textarea
          id="forumContents"
          name="forumContents"
          value={forumContents}
          onChange={e => setForumContents(e.target.value)}
        />
        <label htmlFor="votes">Votes</label>
        <input
          id="votes"
          type="number"
          name="votes"
          value={votes}
          onChange={e => setVotes(e.target.value)}
        />
        <label htmlFor="userId">User ID</label>
        <input
          id="userId"
          type="text"
          name="userId"
          value={userId}
          onChange={e => setUserId(e.target.value)}
        />
        <label htmlFor="genreId">Genre ID</label>
        <input
          id="genreId"
          type="number"
          name="genreId"
          value={genreId}
          onChange={e => setGenreId(e.target.value)}
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
