import React from 'react';

const Table = ({ forums, handleEdit, handleDelete }) => {
  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Contents</th>
            <th>Votes</th>
            <th>Created At</th>
            <th>User ID</th>
            <th>Genre ID</th>
            <th colSpan={2} className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {forums.length > 0 ? (
            forums.map((forum) => (
              <tr key={forum.forumID}>
                <td>{forum.forumID}</td>
                <td>{forum.titleForum}</td>
                <td>{forum.forumContents}</td>
                <td>{forum.votes}</td>
                <td>{new Date(forum.forum_create_at).toLocaleString()}</td>
                <td>{forum.userID}</td>
                <td>{forum.genreID}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(forum.forumID)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(forum.forumID)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center">No Forums Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
