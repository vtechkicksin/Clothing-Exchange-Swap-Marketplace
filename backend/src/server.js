const app = require("./app");
const sequelize = require("./config/database");
const http = require("http");
const { Server } = require("socket.io");
const { connectDB } = sequelize;

require("./models/User");
require("./config/associations");
const configureMessageSocket = require("./sockets/messageSocket");

const PORT = process.env.PORT || 3000;
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: { origin: true, credentials: true },
});
configureMessageSocket(io);

const startServer = async () => {
  try {
    await connectDB();
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
