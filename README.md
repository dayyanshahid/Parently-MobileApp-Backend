# Parently Mobile App Backend

A secure and scalable Node.js backend API for the Parently mobile application, designed to facilitate family communication and parental monitoring features.

## 🚀 Features

- **User Authentication & Authorization** - Secure registration and login with JWT tokens
- **Parent-Child Relationship Management** - Hierarchical user structure for family connections
- **Real-time Chat System** - Private messaging between family members
- **User Management** - Create and manage child accounts under parent supervision
- **Secure Data Storage** - Encrypted passwords and secure MongoDB integration

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **CORS**: Cross-Origin Resource Sharing enabled
- **HTTP Client**: Built-in Express middleware

## 📁 Project Structure

```
parently-mobileapp-backend/
├── models/           # Database schemas
│   ├── Auth.js      # Authentication model
│   ├── User.js      # User profile model
│   ├── ChatNode.js  # Chat session model
│   ├── ChatNodeDetails.js  # Chat metadata
│   └── ChatNodeMessages.js  # Individual messages
├── routes/          # API endpoints
│   ├── auth.js     # Authentication routes
│   ├── users.js    # User management routes
│   └── chat.js     # Chat system routes
├── server.js        # Main server file
├── package.json     # Dependencies
└── README.md        # This file
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd parently-mobileapp-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up MongoDB**
   - Ensure MongoDB is running locally on `mongodb://localhost:27017`
   - Or update the connection string in `server.js` for cloud MongoDB

4. **Start the server**
   ```bash
   npm start
   # or
   yarn start
   ```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Authentication Routes (`/auth`)
- `POST /auth/register` - Register a new parent account
- `POST /auth/login` - Login with email and password

### User Management Routes (`/users`)
- `POST /users/create` - Create a child account under a parent
- `GET /users/children/:parentId` - Get all children of a parent

### Chat Routes (`/chat`)
- `POST /chat/create` - Create a new chat session
- `POST /chat/message` - Send a message in a chat
- `GET /chat/messages/:nodeId` - Get all messages from a chat session

## 📊 Database Schema

### Auth Collection
```javascript
{
  email: String (unique),
  password: String (hashed),
  isVerified: Boolean,
  fcmToken: String,
  createdAt: Date,
  updatedAt: Date
}
```

### User Collection
```javascript
{
  auth_id: ObjectId (ref: Auth),
  parent_id: ObjectId (ref: User, nullable),
  full_name: String,
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Chat Collections
- **ChatNode**: Base chat session
- **ChatNodeDetails**: Chat metadata (title, participants)
- **ChatNodeMessages**: Individual messages with sender info

## 🔐 Security Features

- Password hashing using bcryptjs
- JWT token-based authentication
- CORS protection for cross-origin requests
- Secure MongoDB connection
- Input validation on all endpoints

## 🚀 Development

### Environment Variables (Recommended)
Create a `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/parentlyDB
JWT_SECRET=your-super-secret-key
```

### Available Scripts
- `npm start` - Start the production server
- `npm run dev` - Start with nodemon for development (add to package.json)

## 🧪 Testing

To test the API endpoints, you can use:
- Postman collection (create one based on the endpoints above)
- curl commands
- Frontend mobile app integration

## 📱 Mobile App Integration

This backend is designed to work with the Parently mobile app. The API provides:
- RESTful endpoints for all features
- JSON response format
- Proper HTTP status codes
- CORS enabled for mobile app requests


## 📄 License

This project is proprietary software for Parently mobile application.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

## 📝 Notes

- This is a development version. For production, ensure to:
  - Use environment variables for sensitive data
  - Implement rate limiting
  - Add comprehensive logging
  - Set up proper error handling
  - Use HTTPS for secure communication
  - Implement input sanitization
  - Add database indexes for performance
