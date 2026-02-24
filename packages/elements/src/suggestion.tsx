import type { ReactNode } from "react";
import { ScrollView, View, type ScrollViewProps } from "react-native";
import { Button, Text } from "@ai-native-elements/shadcn-ui";
import { cn } from "./utils";

export type SuggestionsProps = ScrollViewProps & {
  className?: string;
  contentClassName?: string;
  children?: ReactNode;
  testID?: string;
};

export function Suggestions({
  className,
  contentClassName,
  children,
  testID,
  ...props
}: SuggestionsProps) {
  return (
    <ScrollView
      testID={testID}
      horizontal
      showsHorizontalScrollIndicator={false}
      className={cn("w-full", className)}
      {...props}
    >
      <View className={cn("flex-row items-center gap-2", contentClassName)}>
        {children}
      </View>
    </ScrollView>
  );
}

export type SuggestionProps = {
  suggestion: string;
  onPress?: (suggestion: string) => void;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children?: ReactNode;
  disabled?: boolean;
  testID?: string;
};

export function Suggestion({
  suggestion,
  onPress,
  className,
  variant = "outline",
  size = "sm",
  children,
  disabled,
  testID,
}: SuggestionProps) {
  const handlePress = () => {
    onPress?.(suggestion);
  };

  return (
    <Button
      testID={testID}
      className={cn("rounded-full px-4", className)}
      onPress={handlePress}
      size={size}
      variant={variant}
      disabled={disabled}
    >
      <Text>{children ?? suggestion}</Text>
    </Button>
  );
}
