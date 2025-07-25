import React, { useEffect, useState } from 'react';

const API_BASE = 'https://books-backend-worker.viraj-frisson.workers.dev'; // Change to your deployed backend URL

const BooksTable = () => {
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
      setError('Failed to fetch books: ' + err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📚 Book Library</h1>
        <button
          onClick={fetchBooks}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? '🔄 Loading...' : '🔄 Refresh'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          <strong>Error:</strong> {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">Loading books...</div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Cover</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Title</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Author</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Genre</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {books.length === 0 ? (
                <tr>
                  <td colSpan="5" className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                    No books found.
                  </td>
                </tr>
              ) : (
                books.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">
                      {book.image_url ? (
                        <img 
                          src={book.image_url} 
                          alt={book.title} 
                          className="w-16 h-24 object-cover rounded shadow"
                        />
                      ) : (
                        <div className="w-16 h-24 bg-gray-200 rounded shadow flex items-center justify-center text-gray-500 text-xs">
                          No image
                        </div>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 font-medium">{book.title}</td>
                    <td className="border border-gray-300 px-4 py-3">{book.author}</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {book.genre}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 max-w-md">
                      <div className="text-sm text-gray-700 line-clamp-3">
                        {book.description}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {books.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 text-center">
          Total books: {books.length}
        </div>
      )}
    </div>
  );
};

export default BooksTable;
