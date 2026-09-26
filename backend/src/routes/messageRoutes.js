const express = require("express");
const { Op } = require("sequelize");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");
const { authenticateJWT } = require("../middleware/authMiddleware");

const router = express.Router();
router.use(authenticateJWT);

const participantWhere = (userId) => ({
  [Op.or]: [{ user_one_id: userId }, { user_two_id: userId }],
});

router.get("/conversations", async (req, res) => {
  try {
    const conversations = await Conversation.findAll({
      where: participantWhere(req.user.id),
      include: [
        { model: User, as: "userOne", attributes: ["id", "name"] },
        { model: User, as: "userTwo", attributes: ["id", "name"] },
      ],
      order: [["updated_at", "DESC"]],
    });

    return res.json(
      conversations.map((conversation) => {
        const data = conversation.toJSON();
        data.other_user =
          data.user_one_id === req.user.id ? data.userTwo : data.userOne;
        delete data.userOne;
        delete data.userTwo;
        return data;
      }),
    );
  } catch (error) {
    console.error("Fetch conversations error:", error);
    return res.status(500).json({ message: "Failed to fetch conversations" });
  }
});

router.post("/conversations/open", async (req, res) => {
  try {
    const participantId = String(req.body.participantId || "");
    if (!participantId || participantId === req.user.id) {
      return res
        .status(400)
        .json({ message: "A different participant is required" });
    }

    const participant = await User.findOne({
      where: { id: participantId, status: "ACTIVE" },
      attributes: ["id", "name"],
    });
    if (!participant) {
      return res.status(404).json({ message: "User not found" });
    }

    const [userOneId, userTwoId] = [req.user.id, participant.id].sort();
    let conversation;
    try {
      [conversation] = await Conversation.findOrCreate({
        where: { user_one_id: userOneId, user_two_id: userTwoId },
        defaults: {
          swap_request_id: null,
          user_one_id: userOneId,
          user_two_id: userTwoId,
        },
      });
    } catch (error) {
      if (error.name !== "SequelizeUniqueConstraintError") throw error;
      conversation = await Conversation.findOne({
        where: { user_one_id: userOneId, user_two_id: userTwoId },
      });
    }

    return res.json({ ...conversation.toJSON(), other_user: participant });
  } catch (error) {
    console.error("Open conversation error:", error);
    return res.status(500).json({ message: "Failed to open conversation" });
  }
});

router.get("/conversations/:conversationId/messages", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      where: {
        id: req.params.conversationId,
        ...participantWhere(req.user.id),
      },
      attributes: ["id"],
    });
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const messages = await Message.findAll({
      where: { conversation_id: conversation.id },
      order: [["created_at", "ASC"]],
    });
    return res.json(messages);
  } catch (error) {
    console.error("Fetch messages error:", error);
    return res.status(500).json({ message: "Failed to fetch messages" });
  }
});

module.exports = router;
