# Wonderlust - Listings Application

A full-featured Express.js web application for listing travel experiences, complete with user authentication, session management, file uploads via Cloudinary, and robust data validation.

Hosted Example: [https://wonderlust-88hd.onrender.com/listings](https://wonderlust-88hd.onrender.com/listings)

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [Environment Variables](#environment-variables)
* [Running Locally](#running-locally)
* [Deployment](#deployment)
* [Project Structure](#project-structure)
* [Author](#author)
* [License](#license)

## Features

* **User Authentication & Authorization** using Passport.js (local strategy) and role checks
* **Session Management** with `express-session` & `connect-mongo` for persistent sessions
* **Flash Messages** via `connect-flash` for success/error notifications
* **File Uploads** to Cloudinary using `multer` and `multer-storage-cloudinary`
* **Data Validation** on routes with Joi schemas
* **Method Override** to support PUT & DELETE from HTML forms
* **Templating** with EJS and layout inheritance via EJS-Mate
* **Security**: cookie parsing, environment variable management with dotenv

## Tech Stack

* **Runtime**: Node.js, Express.js
* **Database**: MongoDB (via Mongoose)
* **Templating**: EJS, EJS-Mate
* **Authentication**: Passport.js, Passport-Local, Passport-Local-Mongoose
* **Sessions**: express-session, connect-mongo
* **File Storage**: Cloudinary SDK, multer, multer-storage-cloudinary
* **Validation**: Joi
* **Utilities**: method-override, cookie-parser, dotenv, connect-flash

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/<your-username>/wonderlust-listings.git
   cd wonderlust-listings
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following values:

```ini
PORT=3000
DB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/wonderlust
SECRET=<yourSessionSecret>
CLOUDINARY_CLOUD_NAME=<yourCloudName>
CLOUDINARY_KEY=<yourApiKey>
CLOUDINARY_SECRET=<yourApiSecret>
```

## Running Locally

```bash
# Start in development mode with automatic reloads:
npm run dev

# Or start normally:
npm start
```

Visit `http://localhost:3000` and navigate to **/listings** to view the app.

## Deployment

This app can be deployed on platforms like Render, Heroku, or similar.

1. Push your code to GitHub.
2. Create a new Web Service on Render or Heroku.
3. Connect your GitHub repository.
4. Set your Environment Variables in the platform dashboard (same as above).
5. Deploy and visit your live site! Sample live demo:

   [https://wonderlust-88hd.onrender.com/listings](https://wonderlust-88hd.onrender.com/listings)

## Project Structure

```
├── models/           # Mongoose schemas (Listing, User)
├── routes/           # Express route modules (listings, users)
├── views/            # EJS templates and layouts
├── public/           # Static assets (CSS, JS, images)
├── middleware/       # Custom middleware (authorization, validation)
├── cloudinary.js     # Cloudinary config
├── app.js            # Express app setup & config
├── server.js         # Entry point
├── .env              # Environment variables (not in repo)
└── package.json      # Dependencies & scripts
```

## Author

Developed by *Pankaj Narwade*.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
