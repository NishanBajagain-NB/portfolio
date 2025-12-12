# MongoDB Setup Instructions

Your portfolio has been converted to use MongoDB instead of JSON files. Follow these steps to set up the database:

## 1. Install MongoDB

### Option A: Local MongoDB Installation
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# macOS with Homebrew
brew install mongodb-community

# Start MongoDB service
sudo systemctl start mongodb  # Linux
brew services start mongodb-community  # macOS
```

### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string

## 2. Environment Variables

Create a `.env.local` file in your project root:

```bash
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/portfolio

# For MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here
```

## 3. Install Dependencies

```bash
npm install mongodb
# or
pnpm install mongodb
```

## 4. Default Admin Credentials

The system will automatically create default admin credentials:
- **Email**: admin@portfolio.com
- **Password**: admin123

**Important**: Change these credentials after first login!

## 5. Database Collections

The system automatically creates these collections:
- `portfolio` - Main portfolio data
- `messages` - Contact form messages  
- `admin` - Admin authentication data

## 6. Data Migration

Your existing JSON data will be automatically migrated to MongoDB on first run. The original JSON files can be kept as backup.

## 7. Start the Application

```bash
npm run dev
# or
pnpm dev
```

The application will connect to MongoDB and initialize the database with your existing data.
