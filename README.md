## Introduction

This is a hotel booking system built with Node.js, React, and MongoDB.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (v20 or higher)
- npm (v6 or higher)
- MongoDB (v4.4 or higher)

## Getting Started

Follow these steps to set up and run the project:

### 1. Clone the Repository

bash:
git clone https://github.com/SourMaoam/24SevenHotels/tree/main
cd 24SevenHotels


### 2. Set Up the Backend

Navigate to the backend directory and install the dependencies:

bash:
cd backend
npm install


Create a .env file in the backend directory with the following content:

MONGO_URI=mongodb://localhost:27017/24sevenhotel
JWT_SECRET=qeisn4Rg0+q9d07fTQy11T853YucabDS9kRCjgeXQU8=


### 3. Set Up the Frontend

Navigate to the frontend directory and install the dependencies:

bash:
cd ../frontend
npm install


### 4. Start MongoDB

Make sure MongoDB is running on your local machine. You can start it with:

bash:
mongod


### 5. Run the Backend Server

Navigate back to the backend directory and start the server:

bash:
cd ../backend
npm start


The backend server will start on http://localhost:5001.

### 6. Run the Frontend Development Server

Navigate to the frontend directory and start the development server:

bash:
cd ../frontend
npm start


The frontend server will start on http://localhost:3000.

## Usage

1. Open your browser and navigate to http://localhost:3000.
2. Register a new user or log in with existing credentials.
3. Browse available rooms, book a room, and manage your bookings.
