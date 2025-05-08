
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

// Pre-defined health tips and responses
const healthResponses = [
  {
    keywords: ["headache", "head", "pain", "migraine"],
    response: "Headaches can be caused by dehydration, stress, or lack of sleep. Try drinking water, resting in a dark room, and if persistent, consult with a doctor.",
  },
  {
    keywords: ["cold", "flu", "fever", "cough"],
    response: "For cold and flu symptoms, rest, stay hydrated, and consider over-the-counter medications for symptom relief. See a doctor if symptoms worsen or persist beyond a week.",
  },
  {
    keywords: ["sleep", "insomnia", "can't sleep", "tired"],
    response: "Improve sleep by maintaining a regular schedule, avoiding screens before bed, creating a comfortable sleep environment, and limiting caffeine. Persistent issues may require medical attention.",
  },
  {
    keywords: ["diet", "nutrition", "eat", "food", "healthy"],
    response: "A balanced diet includes plenty of fruits, vegetables, lean proteins, and whole grains. Stay hydrated and limit processed foods, sugar, and salt intake.",
  },
  {
    keywords: ["exercise", "workout", "fitness", "active"],
    response: "Aim for at least 150 minutes of moderate exercise weekly. Include both cardio and strength training for optimal health. Start slowly and increase intensity gradually.",
  },
  {
    keywords: ["stress", "anxiety", "worried", "nervous"],
    response: "Manage stress with mindfulness, deep breathing exercises, regular physical activity, and adequate sleep. Consider meditation or yoga, and seek professional help if needed.",
  },
  {
    keywords: ["water", "hydration", "drink", "thirsty"],
    response: "Stay hydrated by drinking 8-10 glasses of water daily. Increase intake during hot weather, exercise, or illness. Monitor urine color – pale yellow indicates good hydration.",
  },
];

// Default greeting and fallback responses
const greetings = ["hi", "hello", "hey", "howdy", "hola", "greetings"];
const greetingResponses = [
  "Hello! I'm your health assistant. How can I help you today?",
  "Hi there! I can provide health tips and information. What would you like to know?",
  "Hello! I'm here to help with health-related questions. What's on your mind?",
];

const fallbackResponses = [
  "I'm not sure I understand. Could you rephrase your question about health?",
  "I'm still learning and might not have an answer for that. Try asking about common health topics like diet, exercise, or sleep.",
  "I don't have enough information about that. Could you ask something more specific about health?",
];

const HealthChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI health assistant. I can provide basic health tips and information. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      const botResponse = generateResponse(input.toLowerCase());
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (userInput: string): string => {
    // Check if it's a greeting
    if (greetings.some(greeting => userInput.includes(greeting))) {
      return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
    }
    
    // Check for health-related keywords
    for (const item of healthResponses) {
      if (item.keywords.some(keyword => userInput.includes(keyword))) {
        return item.response;
      }
    }
    
    // Fallback response
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageCircle className="h-5 w-5 text-medical mr-2" />
          Health Assistant
        </CardTitle>
        <CardDescription>
          Ask questions and get AI-powered health tips
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex w-max max-w-[75%] rounded-lg px-4 py-2",
                message.sender === "user"
                  ? "ml-auto bg-medical text-primary-foreground"
                  : "bg-muted"
              )}
            >
              <div>
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-50">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex w-max max-w-[75%] rounded-lg px-4 py-2 bg-muted">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse delay-200"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
          <Input
            placeholder="Ask a health question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
            </svg>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default HealthChatbot;
