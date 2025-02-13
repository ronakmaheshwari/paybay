# PayBay - A Full-Stack Payment App

## Overview
PayBay is a full-stack digital wallet and payment application inspired by PayBay. It enables users to send and receive money, manage their wallet balance, and perform secure transactions. Built with modern web technologies, PayBay ensures a seamless and efficient payment experience.

## Features
- **User Authentication**: Secure login and signup using JWT.
- **Wallet System**: Add money, check balance, and manage transactions.
- **Send & Receive Payments**: Instant money transfers between users.
- **Transaction History**: View all past transactions with timestamps.
- **Secure API**: Built using RESTful architecture with Express.js.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT-based authentication

## Installation & Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/100xdevs-cohort-2/paybay
   cd paybay
   ```

2. **Install dependencies**
   ```sh
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the `server/` directory and add:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. **Run the application**
   ```sh
   # Start backend server
   cd server
   npm start
   
   # Start frontend
   cd ../client
   npm start
   ```

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.

---
