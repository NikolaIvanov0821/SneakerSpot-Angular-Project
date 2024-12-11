# SneakerSpot - Angular Project

SneakerSpot is an Angular-based web application created for the project defense of the SoftUni Angular course.
---

## Features

- **Sneaker Listings**: Browse through an extensive collection of sneakers with detailed descriptions and images.
- **User Authentication**: Secure login and registration system using JWT (JSON Web Tokens).
- **Favorites & Reviews**: Allow users to save favorite sneakers and leave reviews.

---

## Tech Stack

- **Frontend**: Angular, TypeScript
- **Backend**: Node.js, Express.js 
- **Database**: MongoDB 

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NikolaIvanov0821/SneakerSpot-Angular-Project.git
   cd SneakerSpot-Angular-Project
   ```

2. To run the server open REST-API folder in terminal, install dependencies and run the server
   ```bash
   cd REST-API
   npm install
   npm run dev
   ```
  Once the server is running you will recieve the following message in the console: 
  It works!
  DB Connected!
  Server is listening on http://localhost:3030
  
3. To run the client open project-app folder in terminal, install dependencies and run the client:
   ```bash
   cd project-app
   npm install
   ng serve
   ```
   The application will run on `http://localhost:4200`.

---

## Usage

- Visit the homepage or the products page to browse sneaker collections.
- Register and log in to save favorites and leave reviews.
- Authenticated users can see and edit their reviews from the user profile page `http://localhost:4200/profile`
---

## Folder Structure

```plaintext
SneakerSpot-Angular-Project/
├── REST-API # RESTFul Service
├── project-app/
│   ├── .angular/               # Angular-specific configurations
│   ├── .vscode/                # VS Code workspace settings
│   ├── dist/                   # Build output directory
│   ├── node_modules/           # Dependencies
│   ├── public/                 # Static files and images
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/           # Core services and functionality
│   │   │   ├── guards/         # Route guards for authentication
│   │   │   ├── home/           # Home page components
│   │   │   ├── product-details/ # Product details page components
│   │   │   ├── products-catalog/ # Catalog of products
│   │   │   ├── reviews/        # Review-related functionality
│   │   │   ├── test/           # Testing components and utilities
│   │   │   ├── types/          # TypeScript models and interfaces
│   │   │   ├── user/           # User-related functionality
│   │   │   ├── utils/          # Utility functions and helpers
│   │   │   ├── api.service.ts  # API service for backend communication
│   │   │   ├── app.component.* # Main application component files
│   │   │   ├── app.config.ts   # Configuration settings
│   │   │   └── app.routes.ts   # Application routing
│   │   ├── environments/       # Environment-specific configurations
│   │   ├── index.html          # Main HTML entry point
│   │   ├── main.ts             # Application bootstrap
│   │   ├── styles.css          # Global styles
│   │   └── ...
│   ├── .editorconfig           # Editor configuration
│   ├── .gitignore              # Git ignore rules
│   ├── angular.json            # Angular CLI configuration
│   ├── package-lock.json       # Locked dependency tree
│   ├── package.json            # Project dependencies and scripts
│   └── README.md               # Angular documentation

```

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---


