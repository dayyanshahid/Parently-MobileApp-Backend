# Parenting App API

A comprehensive MongoDB-based API for a parenting app that allows parents to manage their kids' plans and events.

## Features

- **Parent Management**: Register/login, profile management
- **Child Management**: Add children, manage child profiles
- **Event Management**: Create and manage events for children
- **Friend System**: Add friends and manage relationships
- **Family Tree**: Link family members and manage family relationships

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd parenting-app-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/parenting_app
JWT_SECRET=your_jwt_secret_key_here
```

4. **Start MongoDB**
Make sure MongoDB is running on your system.

5. **Start the server**
```bash
npm start
# or for development
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new parent
- `POST /api/auth/login` - Login parent

### Parents
- `GET /api/parents/profile` - Get current parent profile
- `PUT /api/parents/profile` - Update parent profile
- `GET /api/parents` - Get all parents (for friend suggestions)

### Children
- `GET /api/children` - Get all children for current parent
- `POST /api/children` - Create a new child
- `GET /api/children/:id` - Get specific child
- `PUT /api/children/:id` - Update child
- `DELETE /api/children/:id` - Delete child

### Events
- `GET /api/events` - Get all events for current parent's children
- `POST /api/events` - Create a new event
- `GET /api/events/:id` - Get specific event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Friends
- `POST /api/friends/request` - Send friend request
- `PUT /api/friends/accept/:id` - Accept friend request
- `DELETE /api/friends/remove/:id` - Remove friend

### Family
- `POST /api/family/link` - Link family member
- `GET /api/family/tree` - Get family tree
- `PUT /api/family/accept/:id` - Accept family link request

## Usage Examples

### Register a new parent
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "parent@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "parent@example.com",
    "password": "password123"
  }'
```

### Create a child
```bash
curl -X POST http://localhost:3000/api/children \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "firstName": "Alice",
    "lastName": "Doe",
    "dateOfBirth": "2015-05-15",
    "gender": "female"
  }'
```

### Create an event
```bash
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "title": "Doctor Appointment",
    "description": "Annual checkup",
    "type": "medical",
    "startDateTime": "2024-03-15T10:00:00Z",
    "endDateTime": "2024-03-15T11:00:00Z",
    "child": "<child-id>"
  }'
```

## Database Schema

### Parent
- email (unique)
- password (hashed)
- firstName
- lastName
- phone
- profilePicture
- address
- children (array of Child references)
- friends (array of Parent references)
- familyTree (array of family relationships)

### Child
- firstName
- lastName
- dateOfBirth
- gender
- profilePicture
- allergies
- medicalNotes
- school
- parents (array of Parent references)
- events (array of Event references)

### Event
- title
- description
- type
- startDateTime
- endDateTime
- location
- child (Child reference)
- attendees (array of Parent references)
- reminders
- notes
- attachments

## Development

To add new features or modify existing ones:

1. Create new models in the `models/` directory
2. Add new routes in the `routes/` directory
3. Update the main server file if needed
4. Test endpoints using tools like Postman or curl

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
