import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { aiService } from "@/services/aiServices";
import { TypingAnimation } from "react-native-typing-animation";
import { Colors } from "@/constants/Colors";
const FloatingComponent = () => {
  const [showChatWindow, setShowChatWindow] = useState(false);

  return (
    <View className="z-50">
      {showChatWindow && (
        <ChatWindow onClose={() => setShowChatWindow(false)} />
      )}

      <TouchableOpacity
        onPress={() => setShowChatWindow(!showChatWindow)}
        className="absolute bottom-24 right-4 bg-primary p-4 rounded-full shadow-lg"
      >
        <Ionicons name="chatbubble" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingComponent;

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

const ChatWindow = ({ onClose }: { onClose: () => void }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi! I am your AI Assistant. How can I help you today?",
      sender: "ai",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const activeRequestRef = useRef<XMLHttpRequest | null>(null);

  useEffect(() => {
    return () => {
      if (activeRequestRef.current) {
        activeRequestRef.current.abort();
      }
    };
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    if (activeRequestRef.current) {
      activeRequestRef.current.abort();
    }

    const aiMessageId = (Date.now() + 1).toString();
    let hasCreatedMessage = false;

    const xhr = aiService.streamAI(
      userMessage.text,
      (accumulatedText) => {
        setIsLoading(false);
        setIsTyping(true);

        if (!hasCreatedMessage) {
          hasCreatedMessage = true;
          setMessages((prev) => [
            ...prev,
            { id: aiMessageId, text: accumulatedText, sender: "ai" },
          ]);
        } else {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiMessageId ? { ...msg, text: accumulatedText } : msg,
            ),
          );
        }
      },
      () => {
        setIsTyping(false);
        activeRequestRef.current = null;
      },
      (error) => {
        setIsLoading(false);
        setIsTyping(false);
        activeRequestRef.current = null;
        // Don't show alert if user aborted it manually
        if (
          error.message !== "Request aborted" &&
          error.code !== "DOMException"
        ) {
          Alert.alert("Error", error?.message || "Failed to get a response");
        }
      },
    );

    activeRequestRef.current = xhr;
  };

  return (
    <View
      style={{ height: 500 }}
      className="absolute bottom-40 right-4 w-[80%] border-2 border-primary/30 shadow-md border-t-0 rounded-2xl z-50 overflow-hidden border border-gray-200 bg-white"
    >
      {/* Header */}
      <View className="bg-primary px-4 py-3 flex-row items-center justify-between">
        <Text className="text-white font-bold text-lg">Chat Support</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        className="flex-1 px-4 py-3 bg-gray-50"
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            className={`px-3 py-2 rounded-xl mb-3 max-w-[80%] ${msg.sender === "user" ? "bg-blue-100 self-end" : "bg-primary self-start"}`}
          >
            <Text
              className={`${msg.sender === "user" ? "text-gray-800" : "text-white"}`}
            >
              {msg.text}
            </Text>
          </View>
        ))}
        {isLoading && (
          <View className="flex-row items-center mt-2">
            <TypingAnimation
              dotColor={Colors.primary}
              dotSpeed={0.15}
              dotRadius={2}
            />
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View className="flex-row items-center border-t border-gray-200 px-3 py-2 bg-white">
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          className="flex-1 bg-gray-300 rounded-full px-4 py-4 mr-2"
          onSubmitEditing={handleSend}
          editable={!isLoading && !isTyping}
        />
        <TouchableOpacity
          onPress={handleSend}
          disabled={isLoading || isTyping || !input.trim()}
          className={`${isLoading || isTyping || !input.trim() ? "bg-gray-400" : "bg-primary"} p-3 rounded-full`}
        >
          <Ionicons name="send" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
