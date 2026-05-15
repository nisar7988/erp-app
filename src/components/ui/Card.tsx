import { View, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface CardProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: "default" | "dim" | "primary" | "surface-variant";
}

const variantStyles = {
  default: "bg-surface border-outline",
  dim: "bg-surface-dim border-outline",
  primary: "bg-primary-container border-primary/10",
  "surface-variant": "bg-surface-variant border-outline/50",
};

export const Card = ({
  children,
  onPress,
  className = "",
  variant = "default",
  ...props
}: CardProps) => {
  const Container = (onPress ? TouchableOpacity : View) as any;

  return (
    <Container
      onPress={onPress}
      className={`rounded-[32px] border ${variantStyles[variant]} overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </Container>
  );
};
