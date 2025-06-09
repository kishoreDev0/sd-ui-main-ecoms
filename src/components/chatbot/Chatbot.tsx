
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { X, Send, User, MessageSquare } from "lucide-react";
import { useChatbot } from "@/context/ChatbotContext";
import { cn } from "@/lib/utils";

export function Chatbot() {
  const { messages, addMessage, isChatOpen, toggleChat } = useChatbot();
  const [input, setInput] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Predefined responses for the chatbot
  const botResponses = [
    "How can I assist you with your luxury shopping today?",
    "We offer worldwide shipping on all our products.",
    "Our products come with a 1-year warranty.",
    "Would you like me to recommend some of our bestsellers?",
    "Our customer service team is available 24/7 to assist you.",
    "Thank you for your question! I'll help you find the perfect item.",
    "We have a 30-day return policy on all unworn items.",
    "Is there anything specific you're looking for today?",
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    addMessage(input, false);
    setInput("");

    // Simulate bot thinking and response
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      addMessage(randomResponse, true);
    }, 1000);
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isChatOpen) {
    return (
      <Button
        onClick={toggleChat}
        className="fixed setblack bottom-6 right-6 rounded-full h-14 w-14 bg-luxury-gold hover:bg-luxury-gold/90 text-white shadow-lg"
        size="icon"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed  bottom-15 right-6 w-80 md:w-96 h-96 shadow-lg border border-luxury-gold/20 overflow-hidden z-50">
      {/* Header */}
      <div className="bg-luxury-gold bg-black text-white p-3 flex justify-between items-center">
        <h3 className="font-medium">Deflux Assistant</h3>
        <Button size="icon" variant="ghost" onClick={toggleChat} className="h-7 w-7 text-white hover:bg-luxury-gold/80 ">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <CardContent className="p-3 overflow-y-auto h-[calc(100%-110px)]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "mb-3 max-w-[80%] p-3 rounded-lg",
              msg.isBot 
                ? "bg-muted text-foreground mr-auto rounded-bl-none"
                : "bg-luxury-gold text-white ml-auto rounded-br-none"
            )}
          >
            <div className="flex items-start gap-2">
              {msg.isBot && (
                <span className="h-6 w-6 rounded-full bg-luxury-gold/10 flex items-center justify-center mt-1">
                  <MessageSquare className="h-3.5 w-3.5 text-luxury-gold" />
                </span>
              )}
              <div>
                <p className="text-sm">{msg.text}</p>
              </div>
              {!msg.isBot && (
                <span className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center mt-1">
                  <User className="h-3.5 w-3.5 text-white" />
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </CardContent>

      {/* Input */}
      <CardFooter className="p-3 bg-background border-t">
        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
