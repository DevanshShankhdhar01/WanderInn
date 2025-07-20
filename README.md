# 🏡 WanderInn

A full-stack web application for listing and exploring vacation rental properties, built with Node.js, Express, and MongoDB.

![Node.js](https://img.shields.io/badge/Node.js-20.11.1-green)
![Express](https://img.shields.io/badge/Express-5.1.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![License](https://img.shields.io/badge/License-ISC-yellow)

## 🎯 About

WanderInn is a vacation rental platform inspired by Airbnb, where users can browse, list, and review properties. The application provides a seamless experience for travelers looking for unique stays and hosts wanting to share their spaces.

## ✨ Features

- 🔐 **User Authentication & Authorization**
  - Secure signup/login using Passport.js
  - Session management with connect-mongo
  - Password encryption and authentication

- 🏠 **Property Listings**
  - Create, read, update, and delete listings (CRUD operations)
  - Upload property images via Cloudinary integration
  - Detailed property information including title, description, price, location, and country
  - Owner-based access control

- ⭐ **Reviews & Ratings**
  - Users can leave reviews and ratings (1-5 stars)
  - Review management with timestamps
  - Author attribution for reviews
  - Automatic review deletion when listing is removed

- 🎨 **User Interface**
  - Responsive design with EJS templates
  - Flash messages for user feedback
  - Clean and intuitive navigation
  - Custom styling with CSS

- 🛡️ **Security & Validation**
  - Server-side validation using Joi
  - Error handling with custom middleware
  - Secure session management
  - HTTP-only cookies

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### File Upload
- **Cloudinary** - Cloud-based image storage
- **Multer** - Middleware for handling multipart/form-data

### Template Engine
- **EJS** - Embedded JavaScript templates
- **EJS-Mate** - Layout and partial support for EJS

### Additional Libraries
- **Joi** - Schema validation
- **Connect-Flash** - Flash messages
- **Express-Session** - Session management
- **Method-Override** - HTTP method override
- **Dotenv** - Environment variable management



## 💻 Usage

### For Travelers
1. Browse available property listings
2. View detailed information about properties
3. Read reviews from other travelers
4. Create an account to leave reviews

### For Hosts
1. Sign up for an account
2. Create new property listings with images
3. Edit or delete your listings
4. Manage your properties

## 📁 Project Structure

```
WanderInn/
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── cloudConfig.js         # Cloudinary configuration
├── middlewares.js         # Custom middleware functions
├── schema.js              # Joi validation schemas
├── controllers/           # Route controllers
│   ├── listings.js        # Listing controller logic
│   ├── reviews.js         # Review controller logic
│   └── users.js           # User controller logic
├── models/                # Database models
│   ├── listing.js         # Listing schema
│   ├── reviews.js         # Review schema
│   └── user.js            # User schema
├── routes/                # Express routes
│   ├── listing.js         # Listing routes
│   ├── review.js          # Review routes
│   └── user.js            # User routes
├── views/                 # EJS templates
│   ├── layouts/           # Layout templates
│   ├── listings/          # Listing views
│   ├── users/             # User authentication views
│   └── includes/          # Reusable partials
├── public/                # Static assets
│   ├── css/               # Stylesheets
│   └── js/                # Client-side scripts
├── utils/                 # Utility functions
│   ├── ExpressError.js    # Custom error class
│   └── wrapAsync.js       # Async error wrapper
└── init/                  # Database initialization
    ├── data.js            # Sample data
    └── index.js           # Seed script
```

## 🛣️ API Routes

### Listings
- `GET /listings` - View all listings
- `GET /listings/new` - Render new listing form
- `POST /listings` - Create a new listing
- `GET /listings/:id` - View single listing
- `GET /listings/:id/edit` - Edit listing form
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Reviews
- `POST /listings/:id/reviews` - Add a review
- `DELETE /listings/:id/reviews/:reviewId` - Delete a review

### Users
- `GET /signup` - Signup form
- `POST /signup` - Register new user
- `GET /login` - Login form
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Create a Pull Request

## 👨‍💻 Author

**Devansh Shankhdhar**

- GitHub: [@DevanshShankhdhar01](https://github.com/DevanshShankhdhar01)

---

⭐ If you find this project useful, please consider giving it a star on GitHub!