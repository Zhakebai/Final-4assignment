# BeautyHub Web Application

## Overview
BeautyHub is a Node.js and Express-based web application that provides beauty-related services, including:
```User authentication (registration and login system)
A dynamic carousel managed by admins
Integration with external APIs for beauty product search, salon lookup, and news
Role-based access control (Regular users can browse; Admins can modify carousel items)
```

## Project Structure
```
/project
├── /models          # Database models
│   ├── carouselItem.js  # Schema for carousel items
│   ├── user.js          # Schema for user accounts
│
├── /routes          # Express route handlers
│   ├── adminRoutes.js  # Routes for admin functionalities
│   ├── api.js          # API integrations for makeup products, beauty salons, and news
│   ├── auth.js         # User authentication (registration, login, logout)
│   ├── home.js
│   ├── index.js         
│
├── /views           # EJS templates for frontend rendering
│   ├── adminOnlyPage.ejs  
│   ├── api2.ejs           # View for beauty salon search results
│   ├── beauty-news.ejs    # View for beauty news articles
│   ├── edit-item.ejs      # View for editing carousel items
│   ├── login.ejs          # User login page
│   ├── main.ejs           # Main dashboard with APIs and carousel
│   ├── makeup-products.ejs  # View for makeup product search results
│   ├── register.ejs       # User registration page
│   ├── welcome.ejs        # Homepage for unauthenticated users
│
├── app.js          # Main Express application file
├── package.json    # Project dependencies
└── README.md       # Project documentation
```

## Features
## User Authentication
```
Register: Users provide their details, and an email confirmation is sent upon successful registration.
Login: Users authenticate using their email and password.
Role-based Access:
Regular Users can browse the website but cannot modify content.
Admins (login with janerke05070507@gmail.com) can manage carousel items (add, edit, delete).
```

## APIs Integrated
```
1.NYX Makeup Product Search – Users can search for beauty products.
2.Beauty Salon Finder – Fetches beauty salons in New York using the Yelp API.
3.Beauty News Fetcher – Fetches beauty-related news articles using the NewsAPI.
```

## Carousel Management (Admin-Only)
Add, update, and delete carousel items displayed on the main page.
Uses MongoDB for data storage.

## Usage
```
1.Visit the Homepage:
If logged out: The navbar displays Register and Login buttons.
If logged in: The navbar includes the API integrations and Logout.

2.Register a New User:
Enter username, password, name, email, etc.
An email confirmation is sent.

3.Admin Actions:
Log in with the admin email (janerke05070507@gmail.com).
Modify carousel items (add, edit, delete).
```

# Screenshots
## Welcome Page
![image](https://github.com/user-attachments/assets/64d12e6b-443d-481a-8cc0-be53402ee819)
![image](https://github.com/user-attachments/assets/fb0cbbbd-6f81-4320-aaa2-681da933ec60)
![image](https://github.com/user-attachments/assets/2f76823a-5d93-4f44-a51b-3ec21e3e94c9)

## Admin Panel (Managing Carousel)
[image](https://github.com/user-attachments/assets/c1fe0afc-7d1f-479c-8588-52d51e44f443)
![image](https://github.com/user-attachments/assets/4c88e363-45dd-4605-afab-7d85f890d3c4)
![image](https://github.com/user-attachments/assets/68608548-c6b0-47a1-8124-7b07cdda303b)

## API Search
In the first API I search mascara:
![image](https://github.com/user-attachments/assets/11637fde-aa3b-4fec-ba3a-23cacb02744c)

In the second API I search hai salons:
![image](https://github.com/user-attachments/assets/06380020-ec49-46c4-b062-c408a2451984)

In the third API serch beauty news related with hair
![image](https://github.com/user-attachments/assets/bd786b71-9044-4fdd-8f4f-9d2cb7c402a8)

## Future Improvements
```
Implement user profile pages
Add more APIs for enhanced beauty services
Improve UI with a frontend framework (React/Vue)
```
