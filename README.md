# Final-4assignment

Introduction
This project is a web application designed to provide users with a variety of services including makeup product searches, salon services in New York, and the latest beauty news. It features a secure authentication system for user registration and login, as well as admin functionalities to manage carousel items on the homepage. This application leverages external APIs to fetch makeup products, salon services, and beauty news, and it utilizes MongoDB for data storage.

Requirements
Node.js
MongoDB
npm (Node package manager)

Installation
Install dependencies
npm install express mongoose body-parser axios cors express-session

Set up environment variables
Create a .env file in the root directory of your project.
Add the following environment variables:
MONGODB_URI=mongodb://localhost:27017/[your-database-name]
SESSION_SECRET=[your-secret]
YELP_API_KEY=[your-yelp-api-key]
NEWS_API_KEY=[your-news-api-key]

Usage
Home Page: Access the home page at http://localhost:3000/. If logged in, you will be redirected to the main page.
Register: Navigate to /register to create a new user account.
Login: Go to /login to access your account.
Admin Functions: As an admin, you can manage carousel items from /admin/carousel.
