const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");

const getCookieToken = (cookieHeader) => {
  const tokenCookie = cookieHeader
    ?.split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("swapstyle_token="));

  return tokenCookie
    ? decodeURIComponent(tokenCookie.slice("swapstyle_token=".length))
    : null;
};

module.exports = (io) => {
  io.use(async (socket, next) => {
    try {
      const token = getCookieToken(socket.handshake.headers.cookie);
      if (!token || !process.env.JWT_SECRET) {
        return next(new Error("Unauthorized"));
      }

      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(payload.id);
      if (!user || user.status !== "ACTIVE") {
        return next(new Error("Unauthorized"));
      }

      socket.userId = user.id;
      return next();
    } catch (error) {
      return next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    socket.join(socket.userId);

    socket.on(
      "message:send",
      async ({ conversationId, text } = {}, acknowledge = () => {}) => {
        try {
          const messageText = String(text || "").trim();
          if (!conversationId || !messageText) {
            return acknowledge({
              error: "Conversation and message are required",
            });
          }
          if (messageText.length > 5000) {
            return acknowledge({ error: "Message exceeds size limit" });
          }

          const conversation = await Conversation.findOne({
            where: {
              id: conversationId,
              [Op.or]: [
                { user_one_id: socket.userId },
                { user_two_id: socket.userId },
              ],
            },
          });
          if (!conversation) {
            return acknowledge({ error: "Conversation not found" });
          }

          const message = await Message.create({
            conversation_id: conversation.id,
            sender_id: socket.userId,
            message: messageText,
            message_type: "TEXT",
          });
          await conversation.update({ updated_at: new Date() });

          const savedMessage = message.toJSON();
          io.to(conversation.user_one_id)
            .to(conversation.user_two_id)
            .emit("message:new", savedMessage);
          return acknowledge({ ok: true, message: savedMessage });
        } catch (error) {
          console.error("Send message error:", error);
          return acknowledge({ error: "Message could not be sent" });
        }
      },
    );
  });
};
