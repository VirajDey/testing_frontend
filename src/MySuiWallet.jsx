import React, { useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import WalletBalance from './WalletBalance';

const MySuiWallet = () => {
  const { user, ready, authenticated, login, logout } = usePrivy();
  const [walletInfo, setWalletInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    console.log('Privy state:', { ready, authenticated, user });
    
    // Set loading to false after a timeout to handle cases where ready never becomes true
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    if (ready !== undefined && ready !== null) {
      setIsLoading(!ready);
      clearTimeout(timer);
    }

    // Check for existing wallet in localStorage first
    if (authenticated) {
      const savedWallet = localStorage.getItem('suiWallet');
      if (savedWallet) {
        try {
          setWalletInfo(JSON.parse(savedWallet));
        } catch (err) {
          console.error('Error parsing saved wallet:', err);
          localStorage.removeItem('suiWallet');
        }
      }
    }

    if (user?.wallet?.chain === 'sui') {
      setWalletInfo(user.wallet);
    }

    return () => clearTimeout(timer);
  }, [user, ready, authenticated]);

  const handleCreateSuiWallet = async () => {
    setError(null);
    if (!authenticated) {
      try {
        await login();
      } catch (err) {
        setError('Login failed: ' + err.message);
      }
      return;
    }

    try {
      // Check if user already has a Sui wallet
      if (user?.wallet?.chain === 'sui') {
        setWalletInfo(user.wallet);
        return;
      }

      // Check if we already have a saved wallet
      const savedWallet = localStorage.getItem('suiWallet');
      if (savedWallet) {
        setWalletInfo(JSON.parse(savedWallet));
        return;
      }

      // Generate a real Sui keypair and address
      const keypair = new Ed25519Keypair();
      const address = keypair.getPublicKey().toSuiAddress();
      
      const realSuiWallet = {
        address: address,
        publicKey: keypair.getPublicKey().toBase64(),
        chain: 'sui',
        walletClientType: 'generated',
        createdAt: new Date().toISOString(),
        // Note: In production, you'd want to securely store the private key
        // For demo purposes, we're including it (never do this in production!)
        privateKey: keypair.export().privateKey
      };
      
      // Save wallet to localStorage to persist across page refreshes
      localStorage.setItem('suiWallet', JSON.stringify(realSuiWallet));
      
      setWalletInfo(realSuiWallet);
      console.log('Generated real Sui wallet:', realSuiWallet);
    } catch (err) {
      console.error('Error generating Sui wallet:', err);
      setError(err.message || "Unknown error");
    }
  };

  const handleRefreshBalance = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleDeleteWallet = () => {
    if (confirm('Are you sure you want to delete this wallet? This action cannot be undone.')) {
      localStorage.removeItem('suiWallet');
      setWalletInfo(null);
      setRefreshKey(0);
    }
  };

  // Show loading only if explicitly loading
  if (isLoading) {
    return (
      <div className="p-6 bg-white shadow rounded-lg max-w-md w-full">
        <div>Loading Privy...</div>
        <div className="text-sm text-gray-500 mt-2">
          Ready: {String(ready)}, Authenticated: {String(authenticated)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-md w-full">
      <h1 className="text-2xl font-bold mb-4">My Sui Wallet</h1>
      
      <div className="text-xs text-gray-400 mb-4">
        Debug: Ready={String(ready)}, Auth={String(authenticated)}
      </div>

      {!authenticated ? (
        <button onClick={login} className="bg-black text-white px-4 py-2 rounded">
          Login
        </button>
      ) : (
        <>
          <div className="text-sm text-green-600 mb-4">✓ Authenticated</div>
          
          <button
            onClick={handleCreateSuiWallet}
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          >
            {walletInfo ? 'Load Saved Wallet' : 'Generate Real Sui Wallet'}
          </button>

          {walletInfo && (
            <>
              <button
                onClick={handleRefreshBalance}
                className="px-4 py-2 bg-green-500 text-white rounded mr-2"
              >
                🔄 Refresh Balance
              </button>
              
              <button
                onClick={handleDeleteWallet}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                🗑️ Delete Wallet
              </button>
            </>
          )}

          <button
            onClick={logout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded block"
          >
            Logout
          </button>

          <div className="mt-6">
            <h2 className="font-semibold">Wallet Info:</h2>
            {walletInfo ? (
              <>
                <div className="bg-green-50 border border-green-200 p-3 rounded mb-3">
                  <div className="text-sm font-medium text-green-800">✓ Real Sui Address Generated</div>
                  <div className="text-xs text-green-600 mt-1">
                    This is a valid Sui blockchain address (Persistent across page refreshes)
                  </div>
                  {walletInfo.createdAt && (
                    <div className="text-xs text-green-600 mt-1">
                      Created: {new Date(walletInfo.createdAt).toLocaleString()}
                    </div>
                  )}
                </div>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  {JSON.stringify(walletInfo, null, 2)}
                </pre>
                <WalletBalance key={refreshKey} walletAddress={walletInfo.address} />
              </>
            ) : (
              <p className="text-gray-500">No wallet created yet.</p>
            )}
            {error && <p className="text-red-500 mt-2">Error: {error}</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default MySuiWallet;
