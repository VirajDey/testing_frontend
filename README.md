# Frontend for Users CRUD (Cloudflare Workers + Supabase)

This is a minimal React frontend for the Users CRUD API deployed on Cloudflare Workers.

## Features
- List, add, edit, and delete users
- Connects to the backend deployed on Cloudflare Workers

## Setup

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