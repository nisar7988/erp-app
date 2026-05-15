import React from "react";
import { ScrollView, View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenWrapperProps {
  children: React.ReactNode;
  scrollable?: boolean;
  padding?: boolean;
  className?: string;
  contentContainerStyle?: object;
}

export const ScreenWrapper = ({ 
  children, 
  scrollable = true, 
  padding = true, 
  className = "",
  contentContainerStyle = {}
}: ScreenWrapperProps) => {
  const Content = scrollable ? ScrollView : View;
  
  return (
    <SafeAreaView className="flex-1 bg-surface">
      <StatusBar barStyle="dark-content" />
      <Content 
        className={`flex-1 ${padding ? 'px-6' : ''} ${className}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={scrollable ? { paddingBottom: 120, ...contentContainerStyle } : { flex: 1, ...contentContainerStyle }}
      >
        {children}
      </Content>
    </SafeAreaView>
  );
};
