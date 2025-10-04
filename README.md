# GamerLink - Professional Gaming Network

A LinkedIn-style platform for gamers and esports professionals to showcase achievements, connect with peers, and explore career opportunities.

## 🎮 Features

- **Gaming Profiles**: Create detailed profiles with gamer tags, favorite games, ranks, and tournament history
- **Achievement System**: Showcase badges, trophies, and leaderboard positions
- **Social Networking**: Connect with players, coaches, and recruiters
- **Career Opportunities**: Explore team recruitment posts, tryouts, and tournament listings
- **Gamification**: Profile badges, activity leaderboards, and achievement tracking
- **Real-time Updates**: Share gaming highlights, strategies, and connect with the community

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + TailwindCSS
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Authentication**: JWT with optional Twitch/Discord integration
- **UI Components**: Lucide React icons, React Hook Form, React Router
- **Styling**: Custom gaming-themed design with neon accents

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd GamerLink
```

2. **Run the setup script**
```bash
chmod +x setup.sh
./setup.sh
```

3. **Configure environment variables**
   - Update `server/.env` with your MongoDB connection string and JWT secret
   - Update `client/.env` with API URL and OAuth credentials (optional)

4. **Start MongoDB** (if using local installation)
```bash
mongod
```

5. **Start the development servers**
```bash
npm run dev
```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
GamerLink/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts (Auth, Theme)
│   │   ├── pages/          # Page components
│   │   └── App.tsx         # Main app component
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── index.js            # Server entry point
│   └── package.json
├── package.json            # Root package configuration
├── setup.sh               # Development setup script
└── README.md
```

## 🔧 Environment Configuration

### Server Environment Variables (`server/.env`)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gamerlink
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URL=http://localhost:3000

# Optional OAuth Integration
TWITCH_CLIENT_ID=your_twitch_client_id
TWITCH_CLIENT_SECRET=your_twitch_client_secret
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret

# Cloudinary for image uploads
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Client Environment Variables (`client/.env`)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_TWITCH_CLIENT_ID=your_twitch_client_id
REACT_APP_DISCORD_CLIENT_ID=your_discord_client_id
```

## 🎯 Available Scripts

- `npm run dev` - Start both frontend and backend servers
- `npm run server` - Start only the backend server
- `npm run client` - Start only the frontend server
- `npm run build` - Build the frontend for production
- `npm run install-all` - Install dependencies for all packages

## 🗄️ Database Models

- **User**: Gaming profiles, achievements, career info
- **Post**: Social feed posts, media, engagement
- **Connection**: User connections and relationships
- **Job**: Career opportunities and team recruitment
- **Tournament**: Esports tournaments and competitions

## 🔐 Authentication

- JWT-based authentication
- Optional OAuth integration with Twitch and Discord
- Protected routes and middleware
- Password hashing with bcrypt

## 🎨 UI/UX Features

- Dark gaming-themed design
- Neon accent colors (green, blue, purple, pink)
- Responsive design for all devices
- Gaming-specific typography (Orbitron font)
- Smooth animations and transitions
- Custom CSS components and utilities

## 🚧 Development Status

✅ **Completed:**
- Project setup and structure
- Database models and schemas
- JWT authentication system
- Basic UI components and pages
- Gaming-focused profile system
- Responsive navigation and layout

🔄 **In Progress:**
- Social feed implementation
- Job board functionality
- Tournament listings
- Messaging system
- Achievement and badge system
- Leaderboards and rankings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎮 Gaming Community

Join the GamerLink community and start building your professional gaming network today!

---

**Built with ❤️ for the gaming community**
