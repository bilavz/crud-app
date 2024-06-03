import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ literatures, selectedLiterature, setLiteratures, setIsEditing }) => {
  const id = selectedLiterature.id;

  const [title, setTitle] = useState(selectedLiterature.title);
  const [authorId, setAuthorId] = useState(selectedLiterature.authorId);
  const [synopsis, setSynopsis] = useState(selectedLiterature.synopsis);
  const [genreId, setGenreId] = useState(selectedLiterature.genreId);
  const [language, setLanguage] = useState(selectedLiterature.language);
  const [copyright, setCopyright] = useState(selectedLiterature.copyright);
  const [imageUrl, setImageUrl] = useState(selectedLiterature.imageUrl);

  const handleUpdate = e => {
    e.preventDefault();

    if (!title || !authorId || !synopsis || !genreId || !language || !copyright || !imageUrl) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const literature = {
      id,
      title,
      authorId,
      synopsis,
      genreId,
      language,
      copyright,
      imageUrl,
      created_at: selectedLiterature.created_at
    };

    for (let i = 0; i < literatures.length; i++) {
      if (literatures[i].id === id) {
        literatures.splice(i, 1, literature);
        break;
      }
    }

    localStorage.setItem('literatures_data', JSON.stringify(literatures));
    setLiteratures(literatures);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${literature.title}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Literature</h1>
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
