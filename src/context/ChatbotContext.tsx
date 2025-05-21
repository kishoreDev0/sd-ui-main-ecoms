
import { createContext, useContext, useState, ReactNode } from "react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

interface ChatbotContextProps {
  messages: Message[];
  addMessage: (text: string, isBot: boolean) => void;
  clearMessages: () => void;
  isChatOpen: boolean;
  toggleChat: () => void;
  setIsChatOpen: (isOpen: boolean) => void;
}

const ChatbotContext = createContext<ChatbotContextProps | undefined>(undefined);

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", text: "Hello! How can I help you today?", isBot: true }
  ]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const addMessage = (text: string, isBot: boolean) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), text, isBot }]);
  };

  const clearMessages = () => {
    setMessages([{ id: "welcome", text: "Hello! How can I help you today?", isBot: true }]);
  };

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  return (
    <ChatbotContext.Provider value={{
      messages,
      addMessage,
      clearMessages,
      isChatOpen,
      toggleChat,
      setIsChatOpen
    }}>
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
}
