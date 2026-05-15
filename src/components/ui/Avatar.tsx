import React from "react";
import { Image, View, TouchableOpacity, ImageSourcePropType } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AvatarProps {
  source: ImageSourcePropType;
  size?: number;
  className?: string;
  onEditPress?: () => void;
  showEditButton?: boolean;
}

export const Avatar = ({ 
  source, 
  size = 40, 
  className = "", 
  onEditPress, 
  showEditButton 
}: AvatarProps) => {
  return (
    <View className={`relative ${className}`}>
      <Image
        source={source}
        style={{ width: size, height: size }}
        className="rounded-full bg-outline border border-outline/20"
      />
      {showEditButton && (
        <TouchableOpacity 
          onPress={onEditPress}
          className="absolute bottom-0 right-0 bg-primary p-1.5 rounded-full border-2 border-surface"
        >
          <Ionicons name="camera" size={size * 0.15} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};
