import { motion } from "framer-motion";

export default function MessageBubble({ children, role, timestamp, persona }) {
  const isUser = role === "user";

  const formatTime = (timestamp) =>
    new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isUser ? 50 : -50 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} group`}
    >
      <div className={`max-w-[80%] ${isUser ? "order-2" : "order-1"}`}>
        <div
          className={`relative px-4 py-3 rounded-2xl shadow-sm ${
            isUser
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-auto"
              : persona === "hitesh"
              ? "bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 text-gray-900 dark:text-gray-100 border border-orange-200/50 dark:border-orange-700/30"
              : "bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 text-gray-900 dark:text-gray-100 border border-green-200/50 dark:border-green-700/30"
          }`}
        >
          <div
            className={`prose prose-sm max-w-none ${
              isUser ? "prose-invert" : "prose-gray dark:prose-invert"
            }`}
          >
            {children}
          </div>
          <div
            className={`absolute top-4 w-0 h-0 ${
              isUser
                ? "right-0 translate-x-full border-l-8 border-y-4 border-r-0 border-l-blue-500 border-y-transparent"
                : "left-0 -translate-x-full border-r-8 border-y-4 border-l-0 border-y-transparent " +
                  (persona === "hitesh"
                    ? "border-r-orange-100 dark:border-r-orange-900/20"
                    : "border-r-green-100 dark:border-r-green-900/20")
            }`}
          />
        </div>
        {timestamp && (
          <div
            className={`text-xs text-gray-400 mt-1 ${
              isUser ? "text-right" : "text-left"
            }`}
          >
            {formatTime(timestamp)}
          </div>
        )}
      </div>

      {!isUser && (
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 mt-1 order-0 ${
            persona === "hitesh"
              ? "bg-gradient-to-br from-orange-500 to-red-500"
              : "bg-gradient-to-br from-green-500 to-blue-500"
          }`}
        >
          {persona === "hitesh" ? "HC" : "PG"}
        </div>
      )}
    </motion.div>
  );
}
