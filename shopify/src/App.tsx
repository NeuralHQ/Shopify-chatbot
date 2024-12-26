// import "./App.css";
import { useState, useEffect, useRef, useCallback } from "react";

interface Message {
  content: string;
  isUser: boolean;
  type: string;
  options?: { text: string; value: string }[];
}

function App() {
  return (
    <>
      <ChatbotPlugin />
    </>
  );
}

export default App;

const ChatbotPlugin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "How can I help you today?",
      isUser: false,
      type: "options",
      options: [
        { text: "Order tracking", value: "tracking" },
        { text: "Product discovery", value: "discovery" },
        { text: "Other query?", value: "other" },
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleOptionClick = useCallback((option: string) => {
    const newMessages: Message[] = [
      {
        content:
          option === "tracking"
            ? "Track my order"
            : option === "discovery"
            ? "Product discovery"
            : "Other query?",
        isUser: true,
        type: "",
      },
      {
        content:
          option === "tracking"
            ? "Please provide your email address or order number:"
            : option === "discovery"
            ? "Let me help you with product discovery."
            : "Let me help you with your query.",
        isUser: false,
        type: option === "tracking" ? "orderTracking" : "",
      },
    ];
    setMessages((prev) => [...prev, ...newMessages]);
  }, []);

  const handleSendMessage = useCallback(() => {
    if (input.trim()) {
      const newMessage: Message = {
        content: input,
        isUser: true,
        type: "",
      };
      setMessages((prev) => [...prev, newMessage]);
      setInput("");
    }
  }, [input]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
      >
        {isOpen ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M3 3H21V17H7L3 21V3Z"
              stroke={"white"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 bg-white rounded-2xl shadow-2xl flex flex-col mb-4 transform-gpu animate-slideUp">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="/api/placeholder/32/32"
                alt="Chat Support"
                className="w-8 h-8 rounded mr-2"
              />
              <span className="font-semibold text-sm">Chat Support</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              <span className="text-xs text-blue-100">Online</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[40vh] bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3  rounded-2xl shadow-sm  ${
                    message.isUser
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none"
                  }`}
                >
                  <span className="text-sm text-left  mr-20">
                    {message.content}
                  </span>
                  {message.type === "options" && message.options && (
                    <div className="mt-3 flex gap-2">
                      {message.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(option.value)}
                          className="flex-1 py-2 px-3 text-left bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 text-sm"
                        >
                          <span className="font-medium text-gray-700 text-left ">
                            {option.text}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-100">
            <div className="p-4">
              <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-xl">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                  placeholder="Type a message..."
                  className="flex-1 p-2 bg-transparent focus:outline-none text-gray-700 placeholder-gray-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 2L11 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 2L15 22L11 13L2 9L22 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="text-center py-3 text-xs text-gray-500 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
              Powered by Dexter
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
