# 1.ChatApplication
ChatApplication is a real-time chat application that allows users to communicate seamlessly. It uses WebSocket for live communication, ensuring fast and efficient message delivery. The project is divided into three main parts: two backend servers and a frontend client.

## Project Structure
### User Server
This server is responsible for handling user-related routes and basic operations, such as user authentication, profile management, and any other non-real-time functions.

### Chat Server
Dedicated to managing real-time chat functionality. This server establishes WebSocket connections, allowing users to send and receive messages instantly. It provides a seamless chatting experience by handling message routing and delivery.

### Client
The frontend client interacts with both the user and chat servers, providing users with an intuitive interface to log in, manage profiles, and engage in real-time conversations.

## Technologies Used
### WebSocket
Enables real-time, bidirectional communication between the client and chat server.
### Node.js & Express
Used to build the backend servers, handling routes and WebSocket connections.
### React
Provides a responsive and interactive user interface on the client side.

## Installation
### Clone the repository:

bash
Copy code
git clone https://github.com/Inayat27/FullStack_Projects_2024.git
Navigate to the project directory:

bash
Copy code
cd FullStack_Projects_2024/ChatApplication
Install dependencies for both servers and the client:

bash
Copy code
cd MainServer
npm install
cd ../ChatServer
npm install
cd ../client
npm install
Usage
Start the user server:

bash
Copy code
cd user-server
npm dev
Start the chat server:

bash
Copy code
cd ../chat-server
npm dev
Start the client:

bash
Copy code
cd ../client
npm dev
Access the application by opening http://localhost:3000 in your browser.

Features
Real-time messaging with WebSocket
User authentication and profile management
Clean, responsive user interface
