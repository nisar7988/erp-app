import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { aiService } from "@/services/aiServices";

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
  sender: 'user' | 'ai';
}

const ChatWindow = ({ onClose }: { onClose: () => void }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', text: 'Hi! I am your AI Assistant. How can I help you today?', sender: 'ai' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'user'
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      const response = await aiService.askAI(userMessage.text);
      if (response) {
        setMessages((prev) => [
          ...prev, 
          { id: (Date.now() + 1).toString(), text: response, sender: 'ai' }
        ]);
      } else {
         throw new Error("Empty response received");
      }
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Failed to get a response");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={{ height: 500 }}
      className="absolute bottom-40 right-4 w-[80%] shadow-md rounded-2xl z-50 overflow-hidden border border-gray-200 bg-white"
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
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg) => (
          <View 
            key={msg.id} 
            className={`px-3 py-2 rounded-xl mb-3 max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-100 self-end' : 'bg-primary self-start'}`}
          >
            <Text className={`${msg.sender === 'user' ? 'text-gray-800' : 'text-white'}`}>
              {msg.text}
            </Text>
          </View>
        ))}
        {isLoading && (
           <View className="bg-primary self-start px-3 py-2 rounded-xl mb-3 max-w-[80%]">
             <ActivityIndicator size="small" color="#ffffff" />
           </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View className="flex-row items-center border-t border-gray-200 px-3 py-2 bg-white">
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
          onSubmitEditing={handleSend}
          editable={!isLoading}
        />
        <TouchableOpacity
          onPress={handleSend}
          disabled={isLoading || !input.trim()}
          className={`${(isLoading || !input.trim()) ? 'bg-gray-400' : 'bg-primary'} p-3 rounded-full`}
        >
          <Ionicons name="send" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
