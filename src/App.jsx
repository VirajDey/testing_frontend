import React, { useState } from 'react';
import MySuiWallet from './MySuiWallet';
import BooksTable from './BooksTable';

const App = () => {
  const [activeTab, setActiveTab] = useState('wallet');

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow p-1">
            <button
              onClick={() => setActiveTab('wallet')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'wallet'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🔗 Sui Wallet
            </button>
            <button
              onClick={() => setActiveTab('books')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'books'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📚 Books Library
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex justify-center">
          {activeTab === 'wallet' && <MySuiWallet />}
          {activeTab === 'books' && <BooksTable />}
        </div>
      </div>
    </div>
  );
};

export default App; 