import React from 'react';

const Table = ({ literatures, handleEdit, handleDelete }) => {
  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author ID</th>
            <th>Synopsis</th>
            <th>Genre ID</th>
            <th>Language</th>
            <th>Copyright</th>
            <th>Image URL</th>
            <th colSpan={2} className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {literatures.length > 0 ? (
            literatures.map((literature, i) => (
              <tr key={literature.id}>
                <td>{literature.id}</td>
                <td>{literature.title}</td>
                <td>{literature.authorId}</td>
                <td>{literature.synopsis}</td>
                <td>{literature.genreId}</td>
                <td>{literature.language}</td>
                <td>{literature.copyright}</td>
                <td>{literature.imageUrl}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(literature.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(literature.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className="text-center">No Literatures Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
