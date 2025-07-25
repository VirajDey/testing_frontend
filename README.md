# Sui Wallet & Books App

A React application that combines Privy authentication with Sui blockchain wallet functionality and a books library interface.

## Features

### 🔗 Sui Wallet Features
- **Privy Authentication**: Secure user authentication with Privy
- **Real Sui Address Generation**: Creates valid Sui blockchain addresses
- **Wallet Persistence**: Wallet saved across page refreshes
- **Balance Display**: View SUI token balances from testnet
- **Balance Refresh**: Manual refresh without page reload
- **Wallet Management**: Delete and regenerate wallets

### 📚 Books Library Features
- **Books Display**: View books from backend API
- **Responsive Table**: Clean, organized book information
- **Book Details**: Title, author, genre, description, and cover images
- **Real-time Refresh**: Update book list manually

## Components

- `App.jsx`: Main application with tabbed interface
- `MySuiWallet.jsx`: Sui wallet component with authentication and wallet management
- `WalletBalance.jsx`: Component for displaying and refreshing wallet balance
- `BooksTable.jsx`: Books library table component

## Technologies Used

- React 18
- Vite (build tool)
- Privy (authentication)
- @mysten/sui.js v0.50.1 (Sui blockchain integration - compatible version)
- Tailwind CSS (via CDN)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173 in your browser

## Configuration

The app is configured to use:
- Privy App ID: `cmdgqec2a008ul20mkxhsg720`
- Sui Testnet for blockchain interactions
- Manual wallet creation (not automatic on login)
- Tailwind CSS via CDN for styling

## Usage

1. Click "Login" to authenticate with Privy
2. Click "Create Sui Wallet" to generate a new Sui wallet
3. View wallet information and balance once created
4. Use "Logout" to sign out

## Notes

- Uses @mysten/sui.js v0.50.1 for Node.js v20.12.2 compatibility
- Tailwind CSS loaded via CDN to avoid PostCSS configuration issues
- The wallet creation functionality may require additional Privy configuration for extended chains support

## Dependencies

Key packages:
- `@privy-io/react-auth`: Authentication provider
- `@mysten/sui.js@0.50.1`: Sui blockchain client (compatible version)
- `@vitejs/plugin-react`: Vite React support
- `react` & `react-dom`: React framework

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at http://localhost:5173 (or the port shown in your terminal).

3. **Configure the backend URL:**
   - By default, the API base URL is set to your deployed Worker in `src/App.jsx`:
     ```js
     const API_BASE = 'https://test-backend.viraj-frisson.workers.dev';
     ```
   - Change this to your own backend URL if needed.

## Deploy to Cloudflare Pages

1. Push the `frontend` folder to a GitHub repository (or your preferred Git provider).
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/) and create a new project from your repo.
3. Set the build command to:
   ```bash
   npm run build
   ```
   and the output directory to:
   ```
   dist
   ```
4. Deploy!

## Notes
- Make sure your backend (Cloudflare Worker) is deployed and accessible from the frontend.
- You can update the API base URL in `src/App.jsx` to point to your production backend after deployment. 