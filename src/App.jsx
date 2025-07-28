import React, { useState } from 'react';
import MySuiWallet from './MySuiWallet';
import BooksTable from './BooksTable';
import { usePrivy } from '@privy-io/react-auth';

const App = () => {
  const [activeTab, setActiveTab] = useState('wallet');
  const { authenticated } = usePrivy();

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
              } ${!authenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!authenticated}
              title={!authenticated ? 'Login with wallet to access Books Library' : ''}
            >
              📚 Books Library
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex justify-center">
          {activeTab === 'wallet' && <MySuiWallet />}
          {activeTab === 'books' && authenticated ? (
            <BooksTable />
          ) : (
            activeTab === 'books' && (
              <div className="p-6 bg-white shadow rounded-lg max-w-md w-full text-center">
                <div className="text-xl font-semibold mb-4">🔒 Authentication Required</div>
                <p className="mb-4">Please login with your Privy wallet to access the Books Library.</p>
                <button
                  onClick={() => setActiveTab('wallet')}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Go to Wallet Login
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default App;