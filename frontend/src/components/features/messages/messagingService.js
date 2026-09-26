import { apiGet, apiPost } from "../../../config/api";

export const getConversations = () => apiGet("/messages/conversations");

export const openConversation = (participantId) =>
  apiPost("/messages/conversations/open", { participantId });

export const getConversationMessages = (conversationId) =>
  apiGet(`/messages/conversations/${conversationId}/messages`);
