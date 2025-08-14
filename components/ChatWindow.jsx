import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import Button from "./Button";
import ReactMarkdown from "react-markdown";

// Start with an empty conversation — backend adds greeting on first message
export default function ChatWindow({ persona }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setMessages([]); // Reset chat on persona change
    inputRef.current?.focus();
  }, [persona]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const newUserMsg = {
      role: "user",
      content: input,
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          persona,
          messages: updatedMessages,
        }),
      });
      const data = await res.json();

      const aiReply = {
        role: "model",
        content: data.reply || "Sorry, I couldn't generate a reply.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: "Sorry, something went wrong. Please try again.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {persona === "hitesh" ? "Hitesh Choudhary AI" : "Piyush Garg AI"}
        </h3>
        {messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearChat}>
            Clear Chat
          </Button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900">
        {messages.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
            Start the conversation with a question!
          </p>
        )}
        {messages.map((msg, idx) => (
          <MessageBubble
            key={idx}
            role={msg.role}
            timestamp={msg.timestamp}
            persona={persona}
          >
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </MessageBubble>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 flex items-center gap-3">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Ask ${persona === "hitesh" ? "Hitesh" : "Piyush"}...`}
          className="flex-1 resize-none bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          rows={1}
          disabled={loading}
        />
        <Button
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          variant="default"
          size="md"
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : (
            "Send"
          )}
        </Button>
      </div>
    </>
  );
}
