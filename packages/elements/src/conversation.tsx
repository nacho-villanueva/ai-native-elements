"use client";

import {
  View,
  ScrollView,
  type ViewProps,
  type ScrollViewProps,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { Text, Button, type ButtonProps } from "@ai-native-elements/shadcn-ui";
import { cn } from "./utils";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

// ============================================================================
// Context
// ============================================================================

interface ConversationContextType {
  isAtBottom: boolean;
  scrollToBottom: (animated?: boolean) => void;
}

const ConversationContext = createContext<ConversationContextType | null>(null);

export const useConversation = () => {
  const context = useContext(ConversationContext);

  if (!context) {
    throw new Error(
      "useConversation must be used within a Conversation component"
    );
  }

  return context;
};

// ============================================================================
// Conversation
// ============================================================================

export type ConversationProps = ScrollViewProps & {
  /**
   * If true, auto-scrolls to bottom when new content is added
   * @default true
   */
  autoScroll?: boolean;
  /**
   * Threshold in pixels from bottom to consider "at bottom"
   * @default 100
   */
  bottomThreshold?: number;
};

export const Conversation = ({
  className,
  children,
  autoScroll = true,
  bottomThreshold = 100,
  onScroll,
  onContentSizeChange,
  ...props
}: ConversationProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const contentHeight = useRef(0);
  const scrollViewHeight = useRef(0);
  const userScrolled = useRef(false);

  const scrollToBottom = useCallback((animated = true) => {
    scrollViewRef.current?.scrollToEnd({ animated });
    userScrolled.current = false;
  }, []);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
      const distanceFromBottom =
        contentSize.height - layoutMeasurement.height - contentOffset.y;

      const atBottom = distanceFromBottom <= bottomThreshold;
      setIsAtBottom(atBottom);

      // Track if user manually scrolled
      if (!atBottom) {
        userScrolled.current = true;
      }

      onScroll?.(event);
    },
    [bottomThreshold, onScroll]
  );

  const handleContentSizeChange = useCallback(
    (width: number, height: number) => {
      const previousHeight = contentHeight.current;
      contentHeight.current = height;

      // Auto-scroll when content grows and user hasn't scrolled away
      if (autoScroll && height > previousHeight && !userScrolled.current) {
        scrollToBottom();
      }

      onContentSizeChange?.(width, height);
    },
    [autoScroll, scrollToBottom, onContentSizeChange]
  );

  const handleLayout = useCallback(
    (event: { nativeEvent: { layout: { height: number } } }) => {
      scrollViewHeight.current = event.nativeEvent.layout.height;
    },
    []
  );

  const contextValue: ConversationContextType = {
    isAtBottom,
    scrollToBottom,
  };

  return (
    <ConversationContext.Provider value={contextValue}>
      <ScrollView
        ref={scrollViewRef}
        className={cn("relative flex-1", className)}
        onScroll={handleScroll}
        onContentSizeChange={handleContentSizeChange}
        onLayout={handleLayout}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={true}
        {...props}
      >
        {children}
      </ScrollView>
    </ConversationContext.Provider>
  );
};

// ============================================================================
// ConversationContent
// ============================================================================

export type ConversationContentProps = ViewProps;

export const ConversationContent = ({
  className,
  ...props
}: ConversationContentProps) => (
  <View className={cn("flex-col gap-8 p-4", className)} {...props} />
);

// ============================================================================
// ConversationEmptyState
// ============================================================================

export type ConversationEmptyStateProps = ViewProps & {
  title?: string;
  description?: string;
  icon?: ReactNode;
};

export const ConversationEmptyState = ({
  className,
  title = "No messages yet",
  description = "Start a conversation to see messages here",
  icon,
  children,
  ...props
}: ConversationEmptyStateProps) => (
  <View
    className={cn(
      "flex-1 items-center justify-center gap-3 p-8",
      className
    )}
    {...props}
  >
    {children ?? (
      <>
        {icon && <View className="text-muted-foreground">{icon}</View>}
        <View className="gap-1 items-center">
          <Text className="font-medium text-sm text-foreground">{title}</Text>
          {description && (
            <Text className="text-muted-foreground text-sm text-center">{description}</Text>
          )}
        </View>
      </>
    )}
  </View>
);

// ============================================================================
// ConversationScrollButton
// ============================================================================

export type ConversationScrollButtonProps = ButtonProps;

export const ConversationScrollButton = ({
  className,
  children,
  ...props
}: ConversationScrollButtonProps) => {
  const { isAtBottom, scrollToBottom } = useConversation();
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withSpring(isAtBottom ? 0 : 1, {
      damping: 15,
      stiffness: 150,
    });
  }, [isAtBottom, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    pointerEvents: opacity.value === 0 ? "none" : "auto",
  }));

  const handlePress = useCallback(() => {
    scrollToBottom(true);
  }, [scrollToBottom]);

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: "absolute",
          bottom: 16,
          alignSelf: "center",
        },
      ]}
    >
      <Button
        className={cn(
          "rounded-full",
          className
        )}
        onPress={handlePress}
        size="icon"
        variant="outline"
        {...props}
      >
        {children ?? <Text className="text-foreground text-lg">↓</Text>}
      </Button>
    </Animated.View>
  );
};

// ============================================================================
// ConversationWrapper (for scroll button positioning)
// ============================================================================

export type ConversationWrapperProps = ViewProps;

export const ConversationWrapper = ({
  className,
  ...props
}: ConversationWrapperProps) => (
  <View className={cn("relative flex-1", className)} {...props} />
);
