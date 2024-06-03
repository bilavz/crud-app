import React from 'react';

const Table = ({ comments, handleEdit, handleDelete }) => {
  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Content</th>
            <th>Created At</th>
            <th>User ID</th>
            <th>Forum ID</th>
            <th colSpan={2} className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.length > 0 ? (
            comments.map((comment, i) => (
              <tr key={comment.forumCommentId}>
                <td>{comment.forumCommentId}</td>
                <td>{comment.content}</td>
                <td>{comment.forumComment_create_at}</td>
                <td>{comment.userId}</td>
                <td>{comment.forumId}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(comment.forumCommentId)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(comment.forumCommentId)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center">No Comments Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
