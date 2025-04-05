# Bluetune - Decentralized Music Streaming Platform

Bluetune is a cutting-edge, decentralized, Web3-powered music streaming platform built with Next.js, Tailwind CSS, TypeScript, Walrus, and Sui. It empowers artists by providing a seamless mechanism to upload and monetize their music using WAL/SUI tokens, while listeners enjoy a smooth and modern user experience with AI-generated recommendations and full control over their music experience.

## 🚀 Features

1. **Upload & Store Music**  
   - Artists can upload tracks via the frontend or the Walrus CLI.  
   - Permanent and deletable storage options available.  
   - Metadata includes artist name, title, album, genre, and more.

2. **Audio Streaming**  
   - Efficient streaming via HTTP range support.  
   - Custom React player integrated.

3. **Decentralized Ownership**  
   - Tracks are associated with Sui Blob Objects fully owned by the artists.  
   - Ownership verification on-chain.

4. **Monetization with WAL/SUI Tokens**  
   - Micro-rewards for artists via plays.  
   - Optional smart contracts for advanced royalty management.

5. **Explore & Discover Music**  
   - Genre, artist, and tag-based search functionality.  
   - Trending and new release discovery.

6. **User Profiles**  
   - Integrated with Sui wallets.  
   - Playlist creation and saved tracks supported.

7. **AI-Generated Recommendations**  
   - Personalized suggestions based on user listening history.

8. **Playlists & Library**  
   - Create, save, and share playlists.  
   - Personal music library management.

9. **On-chain Licensing & DRM**  
   - Smart contracts managing access, royalties, and licensing.

10. **Responsive Design & Animation**  
    - Modern, Gen Z-centric styling with Tailwind CSS.  
    - Smooth, elegant animations powered by Framer Motion.

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/obiajulu-gif/bluetune.git
   cd bluetune
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Visit the app at:
   ```bash
   http://localhost:3000
   ```

## 📂 File Structure
```
├── app
│   ├── artist
│   │   └── [slug]      
│   │       └── page.tsx
│   ├── explore
│   │   └── page.tsx    
│   ├── globals.css     
│   ├── layout.tsx      
│   ├── page.tsx        
│   ├── playlist
│   │   └── [id]        
│   │       └── page.tsx
│   ├── profile
│   │   └── page.tsx    
│   ├── track
│   │   └── [id]
│   │       └── page.tsx
│   └── upload
│       └── page.tsx
├── components
│   ├── connect-wallet-button.tsx
│   ├── connect-wallet-prompt.tsx
│   ├── explore-filters.tsx
│   ├── featured-artists.tsx
│   ├── footer.tsx
│   ├── header.tsx
│   ├── hero-section.tsx
│   ├── how-it-works.tsx
│   ├── music-player.tsx
│   ├── theme-provider.tsx
│   ├── track-grid.tsx
│   ├── trending-tracks.tsx
│   ├── ui
│   │   ├── ... (UI Components)
├── hooks
├── lib
├── public
├── styles
├── pages
├── utils
```

## 🌟 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. 

## 📜 License
This project is licensed under the MIT License.

## 📈 Acknowledgements
- Built with Next.js, Tailwind CSS, TypeScript, Walrus, Sui, and Framer Motion.
- Special thanks to the contributors and open-source community.

