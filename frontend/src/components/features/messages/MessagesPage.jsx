import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import DashboardHeader from "../dashboard/components/DashboardHeader";
import {
  getConversationMessages,
  getConversations,
  openConversation,
} from "./messagingService";
import "./MessagesPage.css";

const socketUrl = import.meta.env.VITE_BACKEND_URL || window.location.origin;

const MessagesPage = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedUser = searchParams.get("user");
  const requestedConversation = searchParams.get("conversation");
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [error, setError] = useState("");
  const socketRef = useRef(null);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    let isCurrent = true;

    const loadConversations = async () => {
      setIsLoading(true);
      setError("");
      try {
        if (requestedUser) {
          const selected = await openConversation(requestedUser);
          if (!isCurrent) return;

          setActiveConversation(selected);
          setConversations([selected]);

          const list = await getConversations().catch(() => [selected]);
          if (isCurrent) setConversations(list);
          return;
        }

        const list = await getConversations();
        const selected = requestedConversation
          ? list.find(
              (conversation) => conversation.id === requestedConversation,
            )
          : list[0] || null;
        if (isCurrent) {
          setConversations(list);
          setActiveConversation(selected || null);
        }
      } catch (loadError) {
        if (isCurrent)
          setError(loadError.message || "Could not load conversations");
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    };

    loadConversations();
    return () => {
      isCurrent = false;
    };
  }, [requestedConversation, requestedUser, setSearchParams]);

  useEffect(() => {
    if (!activeConversation) return undefined;

    let isCurrent = true;
    getConversationMessages(activeConversation.id)
      .then((history) => {
        if (isCurrent) {
          setMessages((current) => {
            const merged = new Map(
              [...history, ...current].map((message) => [message.id, message]),
            );
            return [...merged.values()].sort(
              (first, second) =>
                new Date(first.created_at) - new Date(second.created_at),
            );
          });
        }
      })
      .catch((loadError) => {
        if (isCurrent) setError(loadError.message || "Could not load messages");
      });

    return () => {
      isCurrent = false;
    };
  }, [activeConversation]);

  useEffect(() => {
    const connection = io(socketUrl, { withCredentials: true });
    socketRef.current = connection;
    connection.on("connect_error", () => {
      setError("Live chat connection failed. Refresh the page to reconnect.");
    });
    connection.on("connect", () => {
      setIsSocketConnected(true);
      setError("");
    });
    connection.on("disconnect", () => setIsSocketConnected(false));

    return () => {
      socketRef.current = null;
      connection.disconnect();
    };
  }, []);

  useEffect(() => {
    const connection = socketRef.current;
    if (!connection) return undefined;

    const receiveMessage = (message) => {
      if (
        activeConversation &&
        message.conversation_id === activeConversation.id
      ) {
        setMessages((current) =>
          current.some((entry) => entry.id === message.id)
            ? current
            : [...current, message],
        );
      } else {
        getConversations()
          .then(setConversations)
          .catch(() => {});
      }
    };

    connection.on("message:new", receiveMessage);
    return () => connection.off("message:new", receiveMessage);
  }, [activeConversation]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const selectConversation = (conversation) => {
    setMessages([]);
    setActiveConversation(conversation);
    setSearchParams({ conversation: conversation.id });
  };

  const sendMessage = (event) => {
    event.preventDefault();
    const text = draft.trim();
    const connection = socketRef.current;
    if (!text || !activeConversation || !connection?.connected || isSending)
      return;

    setIsSending(true);
    connection.emit(
      "message:send",
      { conversationId: activeConversation.id, text },
      (result) => {
        setIsSending(false);
        if (result?.error) {
          setError(result.error);
          return;
        }
        setDraft("");
        setConversations((current) =>
          current.map((conversation) =>
            conversation.id === activeConversation.id
              ? { ...conversation, updated_at: new Date().toISOString() }
              : conversation,
          ),
        );
      },
    );
  };

  return (
    <div className="dashboard-page">
      <DashboardHeader />
      <main className="messages-page">
        <h1>Messages</h1>
        {error && (
          <p className="messages-error" role="alert">
            {error}
          </p>
        )}

        <div className="messages-layout">
          <aside className="conversation-list" aria-label="Conversations">
            {isLoading ? (
              <p className="messages-empty">Loading conversations...</p>
            ) : conversations.length ? (
              conversations.map((conversation) => (
                <button
                  type="button"
                  key={conversation.id}
                  className={`conversation-option ${activeConversation?.id === conversation.id ? "selected" : ""}`}
                  onClick={() => selectConversation(conversation)}
                >
                  <span className="conversation-avatar">
                    {conversation.other_user?.name?.charAt(0).toUpperCase() ||
                      "U"}
                  </span>
                  <span>{conversation.other_user?.name || "User"}</span>
                </button>
              ))
            ) : (
              <p className="messages-empty">No conversations yet.</p>
            )}
          </aside>

          <section className="message-thread" aria-label="Chat messages">
            {activeConversation ? (
              <>
                <header className="message-thread-header">
                  <h2>
                    {activeConversation.other_user?.name || "Conversation"}
                  </h2>
                </header>
                <div className="message-history" aria-live="polite">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`message-bubble ${message.sender_id === user?.id ? "mine" : "theirs"}`}
                    >
                      <p>{message.message}</p>
                      <time dateTime={message.created_at}>
                        {new Date(message.created_at).toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </time>
                    </div>
                  ))}
                  <div ref={endOfMessagesRef} />
                </div>
                <form className="message-composer" onSubmit={sendMessage}>
                  <input
                    aria-label="Write a message"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder="Write a message"
                    maxLength={5000}
                  />
                  <button
                    type="submit"
                    disabled={!draft.trim() || isSending || !isSocketConnected}
                  >
                    Send
                  </button>
                </form>
              </>
            ) : (
              <div className="messages-empty thread-empty">
                Select a conversation to view messages.
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default MessagesPage;
