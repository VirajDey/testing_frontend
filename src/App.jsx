import React, { useEffect, useState } from 'react';

const API_BASE = 'https://books-backend-worker.viraj-frisson.workers.dev/'; // Change to your deployed backend URL

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/books`);
      if (!res.ok) throw new Error('Failed to fetch books');
      const data = await res.json();
      setBooks(data.books || []);
    } catch (err) {
      setError('Failed to fetch books');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Book Library</h1>
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr><td colSpan="5">No books found.</td></tr>
            ) : (
              books.map((book) => (
                <tr key={book.id}>
                  <td>
                    {book.image_url ? (
                      <img src={book.image_url} alt={book.title} style={{ width: 60, height: 90, objectFit: 'cover' }} />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.description}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
} 