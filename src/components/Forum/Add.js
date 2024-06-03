import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ literatures, setLiteratures, setIsAdding }) => {
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [genreId, setGenreId] = useState('');
  const [language, setLanguage] = useState('');
  const [copyright, setCopyright] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAdd = e => {
    e.preventDefault();

    if (!title || !authorId || !synopsis || !genreId || !language || !copyright || !imageUrl) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const id = literatures.length + 1;
    const newLiterature = {
      id,
      title,
      authorId,
      synopsis,
      genreId,
      language,
      copyright,
      imageUrl,
      created_at: new Date().toISOString()
    };

    literatures.push(newLiterature);
    localStorage.setItem('literatures_data', JSON.stringify(literatures));
    setLiteratures(literatures);
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${title}'s data has been added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Literature</h1>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor="authorId">Author ID</label>
        <input
          id="authorId"
          type="text"
          name="authorId"
          value={authorId}
          onChange={e => setAuthorId(e.target.value)}
        />
        <label htmlFor="synopsis">Synopsis</label>
        <input
          id="synopsis"
          type="text"
          name="synopsis"
          value={synopsis}
          onChange={e => setSynopsis(e.target.value)}
        />
        <label htmlFor="genreId">Genre ID</label>
        <input
          id="genreId"
          type="text"
          name="genreId"
          value={genreId}
          onChange={e => setGenreId(e.target.value)}
        />
        <label htmlFor="language">Language</label>
        <input
          id="language"
          type="text"
          name="language"
          value={language}
          onChange={e => setLanguage(e.target.value)}
        />
        <label htmlFor="copyright">Copyright</label>
        <input
          id="copyright"
          type="text"
          name="copyright"
          value={copyright}
          onChange={e => setCopyright(e.target.value)}
        />
        <label htmlFor="imageUrl">Image URL</label>
        <input
          id="imageUrl"
          type="text"
          name="imageUrl"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
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
