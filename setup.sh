#!/bin/bash

# GamerLink Development Setup Script

echo "🎮 Setting up GamerLink Development Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed. Please install MongoDB or use MongoDB Atlas."
    echo "   You can install MongoDB from: https://www.mongodb.com/try/download/community"
fi

echo "📦 Installing dependencies..."

# Install root dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..

# Install client dependencies
cd client
npm install
cd ..

echo "🔧 Setting up environment files..."

# Copy environment examples if they don't exist
if [ ! -f "server/.env" ]; then
    cp server/env.example server/.env
    echo "📝 Created server/.env file. Please update with your configuration."
fi

if [ ! -f "client/.env" ]; then
    cp client/env.example client/.env
    echo "📝 Created client/.env file. Please update with your configuration."
fi

echo "✅ Setup complete!"
echo ""
echo "🚀 To start the development servers:"
echo "   npm run dev"
echo ""
echo "📝 Don't forget to:"
echo "   1. Update server/.env with your MongoDB connection string"
echo "   2. Update server/.env with your JWT secret"
echo "   3. Start MongoDB service (if using local MongoDB)"
echo "   4. Optional: Configure Twitch/Discord OAuth credentials"
echo ""
echo "🌐 The application will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5000"
