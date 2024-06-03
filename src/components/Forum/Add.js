import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ forums, setForums, setIsAdding }) => {
  const [titleForum, setTitleForum] = useState('');
  const [forumContents, setForumContents] = useState('');
  const [votes, setVotes] = useState(0);
  const [userId, setUserId] = useState('');
  const [genreId, setGenreId] = useState('');

  const handleAdd = e => {
    e.preventDefault();

    if (!titleForum || !forumContents || !userId || !genreId) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const id = forums.length + 1;
    const newForum = {
      forumId: id,
      titleForum,
      forumContents,
      votes: parseInt(votes, 10),
      forum_create_at: new Date().toISOString(),
      userId,
      genreId: parseInt(genreId, 10),
    };

    forums.push(newForum);
    localStorage.setItem('forums_data', JSON.stringify(forums));
    setForums(forums);
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `Forum has been added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Forum</h1>
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
