import React, { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";

const client = new SuiClient({ url: getFullnodeUrl("testnet") });
const SUI_TYPE_ARG = "0x2::sui::SUI";

const WalletBalance = ({ walletAddress }) => {
  const { ready, authenticated, user } = usePrivy();
  const [balance, setBalance] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchBalance = async () => {
    setIsRefreshing(true);
    
    // Use passed wallet address or fallback to user wallet address
    const suiAddress = walletAddress || user?.wallet?.address;
    
    if (!suiAddress) {
      setBalance(null);
      setIsRefreshing(false);
      return;
    }

    console.log("Fetching balance for Sui Address:", suiAddress);

    try {
      const response = await client.getBalance({
        owner: suiAddress,
        coinType: SUI_TYPE_ARG,
      });
      setBalance(parseFloat(response.totalBalance) / 1e9); // convert MIST → SUI
    } catch (err) {
      console.error("Failed to fetch balance:", err);
      setBalance(-1);
    }
    
    setIsRefreshing(false);
  };

  useEffect(() => {
    if (!ready || !authenticated) return;
    fetchBalance();
  }, [ready, authenticated, user, walletAddress]);

  if (!authenticated) return <p>Please log in to view your balance.</p>;

  const suiAddress = walletAddress || user?.wallet?.address;
  if (!suiAddress) return <p>No wallet address available.</p>;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Wallet Balance</h3>
        <button
          onClick={fetchBalance}
          disabled={isRefreshing}
          className="text-sm px-2 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 disabled:opacity-50"
        >
          {isRefreshing ? "🔄 Updating..." : "🔄 Refresh"}
        </button>
      </div>
      
      <div className="text-center text-2xl font-semibold">
        {isRefreshing ? (
          <span className="text-gray-500">Fetching balance...</span>
        ) : balance === -1 ? (
          <span className="text-red-500">Error fetching balance</span>
        ) : balance === null ? (
          <span className="text-gray-500">No balance data</span>
        ) : (
          <span className="text-green-600">{balance} SUI</span>
        )}
      </div>
      
      <div className="text-xs text-gray-500 mt-2 text-center">
        Address: {suiAddress.slice(0, 8)}...{suiAddress.slice(-6)}
      </div>
    </div>
  );
};

export default WalletBalance;
