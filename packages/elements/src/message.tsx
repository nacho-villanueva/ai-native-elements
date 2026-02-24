"use client";

import { View, type ViewProps } from "react-native";
import { Text } from "@ai-native-elements/shadcn-ui";
import { Button, type ButtonProps } from "@ai-native-elements/shadcn-ui";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ai-native-elements/shadcn-ui";
import { cn } from "./utils";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactElement,
  type ReactNode,
} from "react";

// ============================================================================
// Message
// ============================================================================

export type MessageRole = "user" | "assistant" | "system";

export type MessageProps = ViewProps & {
  from: MessageRole;
};

export const Message = ({ className, from, ...props }: MessageProps) => (
  <View
    className={cn(
      "flex w-full flex-col gap-2",
      from === "user" ? "items-end" : "items-start",
      className
    )}
    {...props}
  />
);

// ============================================================================
// MessageContent
// ============================================================================

export type MessageContentProps = ViewProps & {
  from?: MessageRole;
};

export const MessageContent = ({
  children,
  className,
  from,
  ...props
}: MessageContentProps) => (
  <View
    className={cn(
      "flex max-w-[85%] flex-col gap-2",
      from === "user" ? "rounded-2xl px-4 py-3" : "",
      className
    )}
    style={from === "user" ? { backgroundColor: "#18181b" } : undefined}
    {...props}
  >
    {children}
  </View>
);

// ============================================================================
// MessageText
// ============================================================================

export type MessageTextProps = {
  children?: ReactNode;
  className?: string;
  from?: MessageRole;
};

export const MessageText = ({
  children,
  className,
  from,
}: MessageTextProps) => (
  <Text
    className={cn("text-sm leading-relaxed", className)}
    style={from === "user" ? { color: "#fafafa" } : { color: "#18181b" }}
  >
    {children}
  </Text>
);

// ============================================================================
// MessageActions
// ============================================================================

export type MessageActionsProps = ViewProps;

export const MessageActions = ({
  className,
  children,
  ...props
}: MessageActionsProps) => (
  <View className={cn("flex flex-row flex-wrap items-center gap-2", className)} {...props}>
    {children}
  </View>
);

// ============================================================================
// MessageAction
// ============================================================================

export type MessageActionProps = ButtonProps & {
  tooltip?: string;
  label?: string;
};

export const MessageAction = ({
  tooltip,
  children,
  label,
  variant = "outline",
  size = "sm",
  ...props
}: MessageActionProps) => {
  const button = (
    <Button size={size} variant={variant} {...props}>
      {children}
    </Button>
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>
          <Text className="text-sm">{tooltip}</Text>
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
};

// ============================================================================
// MessageToolbar
// ============================================================================

export type MessageToolbarProps = ViewProps;

export const MessageToolbar = ({
  className,
  children,
  ...props
}: MessageToolbarProps) => (
  <View
    className={cn(
      "mt-4 w-full flex-row items-center justify-between gap-4",
      className
    )}
    {...props}
  >
    {children}
  </View>
);

// ============================================================================
// MessageBranch (for conversation branching)
// ============================================================================

interface MessageBranchContextType {
  currentBranch: number;
  totalBranches: number;
  goToPrevious: () => void;
  goToNext: () => void;
  branches: ReactElement[];
  setBranches: (branches: ReactElement[]) => void;
}

const MessageBranchContext = createContext<MessageBranchContextType | null>(
  null
);

const useMessageBranch = () => {
  const context = useContext(MessageBranchContext);

  if (!context) {
    throw new Error(
      "MessageBranch components must be used within MessageBranch"
    );
  }

  return context;
};

export type MessageBranchProps = ViewProps & {
  defaultBranch?: number;
  onBranchChange?: (branchIndex: number) => void;
};

export const MessageBranch = ({
  defaultBranch = 0,
  onBranchChange,
  className,
  children,
  ...props
}: MessageBranchProps) => {
  const [currentBranch, setCurrentBranch] = useState(defaultBranch);
  const [branches, setBranches] = useState<ReactElement[]>([]);

  const handleBranchChange = (newBranch: number) => {
    setCurrentBranch(newBranch);
    onBranchChange?.(newBranch);
  };

  const goToPrevious = () => {
    const newBranch =
      currentBranch > 0 ? currentBranch - 1 : branches.length - 1;
    handleBranchChange(newBranch);
  };

  const goToNext = () => {
    const newBranch =
      currentBranch < branches.length - 1 ? currentBranch + 1 : 0;
    handleBranchChange(newBranch);
  };

  const contextValue: MessageBranchContextType = {
    currentBranch,
    totalBranches: branches.length,
    goToPrevious,
    goToNext,
    branches,
    setBranches,
  };

  return (
    <MessageBranchContext.Provider value={contextValue}>
      <View className={cn("w-full gap-2", className)} {...props}>
        {children}
      </View>
    </MessageBranchContext.Provider>
  );
};

export type MessageBranchContentProps = ViewProps & {
  children?: ReactNode;
};

export const MessageBranchContent = ({
  children,
  ...props
}: MessageBranchContentProps) => {
  const { currentBranch, setBranches, branches } = useMessageBranch();
  const childrenArray = Array.isArray(children) ? children : [children];

  useEffect(() => {
    if (branches.length !== childrenArray.length) {
      setBranches(childrenArray as ReactElement[]);
    }
  }, [childrenArray, branches.length, setBranches]);

  return (
    <>
      {childrenArray.map((branch, index) => (
        <View
          className={cn(
            "gap-2 overflow-hidden",
            index === currentBranch ? "flex" : "hidden"
          )}
          key={index}
          {...props}
        >
          {branch}
        </View>
      ))}
    </>
  );
};

export type MessageBranchSelectorProps = ViewProps & {
  from?: MessageRole;
};

export const MessageBranchSelector = ({
  className,
  children,
  ...props
}: MessageBranchSelectorProps) => {
  const { totalBranches } = useMessageBranch();

  if (totalBranches <= 1) {
    return null;
  }

  return (
    <View className={cn("flex flex-row items-center justify-center gap-2", className)} {...props}>
      {children}
    </View>
  );
};

export type MessageBranchPreviousProps = ButtonProps;

export const MessageBranchPrevious = ({
  children,
  className,
  ...props
}: MessageBranchPreviousProps) => {
  const { goToPrevious, totalBranches } = useMessageBranch();

  return (
    <Button
      aria-label="Previous branch"
      disabled={totalBranches <= 1}
      onPress={goToPrevious}
      size="icon"
      variant="outline"
      className={cn("h-8 w-8", className)}
      {...props}
    >
      {children ?? <Text>{"<"}</Text>}
    </Button>
  );
};

export type MessageBranchNextProps = ButtonProps;

export const MessageBranchNext = ({
  children,
  className,
  ...props
}: MessageBranchNextProps) => {
  const { goToNext, totalBranches } = useMessageBranch();

  return (
    <Button
      aria-label="Next branch"
      disabled={totalBranches <= 1}
      onPress={goToNext}
      size="icon"
      variant="outline"
      className={cn("h-8 w-8", className)}
      {...props}
    >
      {children ?? <Text>{">"}</Text>}
    </Button>
  );
};

export type MessageBranchPageProps = {
  className?: string;
};

export const MessageBranchPage = ({ className }: MessageBranchPageProps) => {
  const { currentBranch, totalBranches } = useMessageBranch();

  return (
    <Text className={cn("text-sm text-muted-foreground", className)}>
      {currentBranch + 1} of {totalBranches}
    </Text>
  );
};

// ============================================================================
// MessageResponse (for rendering markdown/streamed content)
// ============================================================================

export type MessageResponseProps = {
  children?: ReactNode;
  className?: string;
  /**
   * Custom markdown styles (passed to react-native-markdown-display)
   */
  markdownStyles?: Record<string, any>;
  /**
   * Whether the message is from the user (affects code styling)
   */
  isUser?: boolean;
  /**
   * Custom Markdown component to use (optional - for external markdown libraries)
   * If not provided, falls back to plain text
   */
  MarkdownComponent?: React.ComponentType<{ children: string; style?: any }>;
};

/**
 * Default markdown styles optimized for chat interfaces.
 * Based on platform-biwa's MarkdownText component.
 */
const getDefaultMarkdownStyles = (isUser: boolean = false) => ({
  // Body & Paragraph
  body: {
    color: "#e5e5e5",
    lineHeight: 24,
    fontSize: 15,
  },
  paragraph: {
    marginVertical: 6,
    lineHeight: 24,
    color: "#e5e5e5",
  },

  // Headings
  heading1: {
    fontSize: 24,
    fontWeight: "800" as const,
    marginTop: 20,
    marginBottom: 12,
    lineHeight: 32,
    color: "#ffffff",
  },
  heading2: {
    fontSize: 20,
    fontWeight: "700" as const,
    marginTop: 16,
    marginBottom: 10,
    lineHeight: 28,
    color: "#ffffff",
  },
  heading3: {
    fontSize: 17,
    fontWeight: "600" as const,
    marginTop: 14,
    marginBottom: 8,
    lineHeight: 24,
    color: "#ffffff",
  },
  heading4: {
    fontSize: 16,
    fontWeight: "600" as const,
    marginTop: 12,
    marginBottom: 6,
    lineHeight: 22,
    color: "#ffffff",
  },

  // Inline code
  code_inline: {
    backgroundColor: isUser
      ? "rgba(0, 0, 0, 0.25)"
      : "rgba(255, 255, 255, 0.08)",
    color: isUser ? "#ffffff" : "#e06c75",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontFamily: "monospace",
    fontSize: 14,
  },

  // Code blocks
  fence: {
    backgroundColor: "#1e1e1e",
    color: "#d4d4d4",
    padding: 16,
    borderRadius: 12,
    fontFamily: "monospace",
    fontSize: 14,
    marginVertical: 12,
  },
  code_block: {
    backgroundColor: "#1e1e1e",
    color: "#d4d4d4",
    padding: 16,
    borderRadius: 12,
    fontFamily: "monospace",
    fontSize: 14,
    marginVertical: 12,
  },

  // Links
  link: {
    color: "#58a6ff",
    textDecorationLine: "none" as const,
  },

  // Strong & Emphasis
  strong: {
    fontWeight: "600" as const,
    color: "#ffffff",
  },
  em: {
    fontStyle: "italic" as const,
    color: "#e5e5e5",
  },
  s: {
    textDecorationLine: "line-through" as const,
    color: "#888888",
  },

  // Lists
  bullet_list: {
    marginVertical: 8,
  },
  ordered_list: {
    marginVertical: 8,
  },
  list_item: {
    marginVertical: 4,
    flexDirection: "row" as const,
  },
  bullet_list_icon: {
    color: "#666666",
    marginRight: 10,
    fontSize: 16,
    lineHeight: 24,
  },
  ordered_list_icon: {
    color: "#666666",
    marginRight: 10,
    fontSize: 16,
    lineHeight: 24,
  },

  // Blockquote
  blockquote: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderLeftWidth: 3,
    borderLeftColor: "#4a9eff",
    paddingLeft: 16,
    paddingRight: 12,
    paddingVertical: 8,
    marginVertical: 12,
    borderRadius: 4,
  },

  // Tables
  table: {
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 8,
    marginVertical: 12,
  },
  thead: {
    backgroundColor: "#1a1a1a",
  },
  th: {
    padding: 10,
    fontWeight: "600" as const,
    color: "#ffffff",
  },
  tr: {
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  td: {
    padding: 10,
    color: "#e5e5e5",
  },

  // Horizontal rule
  hr: {
    backgroundColor: "#333333",
    height: 1,
    marginVertical: 20,
  },

  // Images
  image: {
    marginVertical: 8,
    borderRadius: 8,
  },
});

/**
 * Light mode markdown styles
 */
const getDefaultMarkdownStylesLight = (isUser: boolean = false) => ({
  body: {
    color: "#1a1a1a",
    lineHeight: 24,
    fontSize: 15,
  },
  paragraph: {
    marginVertical: 6,
    lineHeight: 24,
    color: "#1a1a1a",
  },
  heading1: {
    fontSize: 24,
    fontWeight: "800" as const,
    marginTop: 20,
    marginBottom: 12,
    lineHeight: 32,
    color: "#000000",
  },
  heading2: {
    fontSize: 20,
    fontWeight: "700" as const,
    marginTop: 16,
    marginBottom: 10,
    lineHeight: 28,
    color: "#000000",
  },
  heading3: {
    fontSize: 17,
    fontWeight: "600" as const,
    marginTop: 14,
    marginBottom: 8,
    lineHeight: 24,
    color: "#000000",
  },
  heading4: {
    fontSize: 16,
    fontWeight: "600" as const,
    marginTop: 12,
    marginBottom: 6,
    lineHeight: 22,
    color: "#000000",
  },
  code_inline: {
    backgroundColor: isUser
      ? "rgba(255, 255, 255, 0.2)"
      : "rgba(0, 0, 0, 0.05)",
    color: isUser ? "#ffffff" : "#c41a16",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontFamily: "monospace",
    fontSize: 14,
  },
  fence: {
    backgroundColor: "#f5f5f5",
    color: "#1a1a1a",
    padding: 16,
    borderRadius: 12,
    fontFamily: "monospace",
    fontSize: 14,
    marginVertical: 12,
  },
  code_block: {
    backgroundColor: "#f5f5f5",
    color: "#1a1a1a",
    padding: 16,
    borderRadius: 12,
    fontFamily: "monospace",
    fontSize: 14,
    marginVertical: 12,
  },
  link: {
    color: "#0969da",
    textDecorationLine: "none" as const,
  },
  strong: {
    fontWeight: "600" as const,
    color: "#000000",
  },
  em: {
    fontStyle: "italic" as const,
    color: "#1a1a1a",
  },
  s: {
    textDecorationLine: "line-through" as const,
    color: "#666666",
  },
  bullet_list: {
    marginVertical: 8,
  },
  ordered_list: {
    marginVertical: 8,
  },
  list_item: {
    marginVertical: 4,
    flexDirection: "row" as const,
  },
  bullet_list_icon: {
    color: "#888888",
    marginRight: 10,
    fontSize: 16,
    lineHeight: 24,
  },
  ordered_list_icon: {
    color: "#888888",
    marginRight: 10,
    fontSize: 16,
    lineHeight: 24,
  },
  blockquote: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderLeftWidth: 3,
    borderLeftColor: "#0969da",
    paddingLeft: 16,
    paddingRight: 12,
    paddingVertical: 8,
    marginVertical: 12,
    borderRadius: 4,
  },
  table: {
    borderWidth: 1,
    borderColor: "#d0d0d0",
    borderRadius: 8,
    marginVertical: 12,
  },
  thead: {
    backgroundColor: "#f5f5f5",
  },
  th: {
    padding: 10,
    fontWeight: "600" as const,
    color: "#000000",
  },
  tr: {
    borderBottomWidth: 1,
    borderBottomColor: "#d0d0d0",
  },
  td: {
    padding: 10,
    color: "#1a1a1a",
  },
  hr: {
    backgroundColor: "#d0d0d0",
    height: 1,
    marginVertical: 20,
  },
  image: {
    marginVertical: 8,
    borderRadius: 8,
  },
});

/**
 * MessageResponse renders AI response content with markdown support.
 *
 * Pass a MarkdownComponent prop to enable markdown rendering.
 * Falls back to plain text rendering if no component is provided.
 *
 * @example
 * ```tsx
 * import Markdown from "react-native-markdown-display";
 *
 * <MessageResponse MarkdownComponent={Markdown}>
 *   {`# Hello World\n\nThis is **markdown** content.`}
 * </MessageResponse>
 *
 * // Or use plain text fallback:
 * <MessageResponse>
 *   {`Plain text content`}
 * </MessageResponse>
 * ```
 */
export const MessageResponse = ({
  children,
  className,
  markdownStyles,
  isUser = false,
  MarkdownComponent,
}: MessageResponseProps) => {
  const content = typeof children === "string" ? children : null;

  // If Markdown component is provided and we have string content, use it
  if (MarkdownComponent && content) {
    // Use provided styles directly, or fall back to defaults
    const styles = markdownStyles ?? getDefaultMarkdownStyles(isUser);

    return (
      <View className={cn("w-full", className)}>
        <MarkdownComponent style={styles}>{content}</MarkdownComponent>
      </View>
    );
  }

  // Fallback: render plain text or children
  return (
    <View className={cn("w-full", className)}>
      {content ? (
        <Text className="text-sm leading-relaxed text-foreground">{content}</Text>
      ) : (
        children
      )}
    </View>
  );
};

// Export style generators for customization
export { getDefaultMarkdownStyles, getDefaultMarkdownStylesLight };
