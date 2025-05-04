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

## Architecture

This application follows the **Model-View-Controller (MVC)** pattern:

* **Models** (`/models`): Define your data schemas and interact with MongoDB using Mongoose (e.g., `Listing`, `User`).
* **Views** (`/views`): EJS templates that render the user interface, with layout inheritance provided by EJS-Mate.
* **Controllers** (`/routes` and `middleware`): Business logic for handling requests, validation via Joi, and authorization checks. Routes delegate to specific handler functions that act as controllers.

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
   git clone https://github.com/PankajNarwade28/wonderlust-listings.git
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
DB_URL=<yourAtlasUrl>
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
├── classroom/        # Classroom related resources
├── controllers/      # Controller logic for routes
├── Images/           # Image assets for the app
├── init/             # Initialization scripts or seed data
├── models/           # Mongoose schemas (Listing, User)
├── node_modules/     # Installed dependencies
├── public/           # Static assets (CSS, JS, images)
├── routes/           # Express route modules
├── uploads/          # File upload storage (local before Cloudinary)
├── util/             # Utility functions and helpers
├── views/            # EJS templates and layouts
├── .env              # Environment variables (not in repo)
├── .gitignore        # Files and folders to ignore in Git
├── app.js            # Express app setup & config
├── CloudConfig.js    # Cloudinary configuration
├── middleware.js     # Custom middleware definitions
├── package.json      # Dependencies & scripts
├── package-lock.json # Lockfile for exact dependencies
├── README.md         # This documentation
└── schema.js         # Database schema definitions (if separate)
```

## Author

Developed by *Pankaj  Narwade*.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Monitoring & Disclaimer

All operations—including creating, editing, or deleting listings—are actively monitored and logged by the site administrator. By using this application, you consent to this monitoring and agree that your actions may be reviewed at any time. Unauthorized, malicious, or non-compliant activities may result in suspension or termination of your account, removal of content, or legal action at the administrator’s discretion.
