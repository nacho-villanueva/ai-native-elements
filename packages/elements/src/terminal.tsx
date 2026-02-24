"use client";

import { View, Text, ScrollView, type ViewProps, Pressable } from "react-native";
import * as Clipboard from "expo-clipboard";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "./utils";
import { Shimmer } from "./shimmer";

// ============================================================================
// Context
// ============================================================================

interface TerminalContextType {
  output: string;
  isStreaming: boolean;
  autoScroll: boolean;
  onClear?: () => void;
}

const TerminalContext = createContext<TerminalContextType>({
  output: "",
  isStreaming: false,
  autoScroll: true,
});

// ============================================================================
// Terminal (root)
// ============================================================================

export type TerminalProps = ViewProps & {
  output: string;
  isStreaming?: boolean;
  autoScroll?: boolean;
  onClear?: () => void;
  children?: ReactNode;
  testID?: string;
};

export const Terminal = ({
  output,
  isStreaming = false,
  autoScroll = true,
  onClear,
  className,
  children,
  testID,
  ...props
}: TerminalProps) => (
  <TerminalContext.Provider
    value={{ output, isStreaming, autoScroll, onClear }}
  >
    <View
      testID={testID}
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <TerminalHeader>
            <TerminalTitle />
            <View className="flex flex-row items-center gap-1">
              <TerminalStatus />
              <TerminalActions>
                <TerminalCopyButton />
                {onClear && <TerminalClearButton />}
              </TerminalActions>
            </View>
          </TerminalHeader>
          <TerminalContent />
        </>
      )}
    </View>
  </TerminalContext.Provider>
);

// ============================================================================
// TerminalHeader
// ============================================================================

export type TerminalHeaderProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const TerminalHeader = ({
  className,
  children,
  testID,
  ...props
}: TerminalHeaderProps) => (
  <View
    testID={testID}
    className={cn(
      "flex flex-row items-center justify-between border-b border-zinc-800 px-4 py-2",
      className
    )}
    {...props}
  >
    {children}
  </View>
);

// ============================================================================
// TerminalTitle
// ============================================================================

export type TerminalTitleProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const TerminalTitle = ({
  className,
  children,
  testID,
  ...props
}: TerminalTitleProps) => (
  <View
    testID={testID}
    className={cn("flex flex-row items-center gap-2", className)}
    {...props}
  >
    <Text className="text-sm text-zinc-400">{">"}_</Text>
    <Text className="text-sm text-zinc-400">
      {children ?? "Terminal"}
    </Text>
  </View>
);

// ============================================================================
// TerminalStatus
// ============================================================================

export type TerminalStatusProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const TerminalStatus = ({
  className,
  children,
  testID,
  ...props
}: TerminalStatusProps) => {
  const { isStreaming } = useContext(TerminalContext);

  if (!isStreaming) {
    return null;
  }

  return (
    <View
      testID={testID}
      className={cn("flex flex-row items-center gap-2", className)}
      {...props}
    >
      {children ?? <Shimmer className="text-xs text-zinc-400">Running...</Shimmer>}
    </View>
  );
};

// ============================================================================
// TerminalActions
// ============================================================================

export type TerminalActionsProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const TerminalActions = ({
  className,
  children,
  testID,
  ...props
}: TerminalActionsProps) => (
  <View
    testID={testID}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  >
    {children}
  </View>
);

// ============================================================================
// TerminalCopyButton
// ============================================================================

export type TerminalCopyButtonProps = ViewProps & {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
  children?: ReactNode;
  testID?: string;
};

export const TerminalCopyButton = ({
  onCopy,
  onError,
  timeout = 2000,
  children,
  className,
  testID,
  ...props
}: TerminalCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const { output } = useContext(TerminalContext);

  const copyToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(output);
      setIsCopied(true);
      onCopy?.();
      setTimeout(() => setIsCopied(false), timeout);
    } catch (error) {
      onError?.(error as Error);
    }
  };

  return (
    <Pressable
      testID={testID}
      className={cn(
        "h-7 w-7 shrink-0 items-center justify-center rounded-md",
        className
      )}
      onPress={copyToClipboard}
      accessibilityLabel={isCopied ? "Copied" : "Copy to clipboard"}
      {...props}
    >
      {children ?? (
        <Text className="text-xs text-zinc-400">
          {isCopied ? "\u2713" : "\u2398"}
        </Text>
      )}
    </Pressable>
  );
};

// ============================================================================
// TerminalClearButton
// ============================================================================

export type TerminalClearButtonProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const TerminalClearButton = ({
  children,
  className,
  testID,
  ...props
}: TerminalClearButtonProps) => {
  const { onClear } = useContext(TerminalContext);

  if (!onClear) {
    return null;
  }

  return (
    <Pressable
      testID={testID}
      className={cn(
        "h-7 w-7 shrink-0 items-center justify-center rounded-md",
        className
      )}
      onPress={onClear}
      accessibilityLabel="Clear terminal"
      {...props}
    >
      {children ?? (
        <Text className="text-xs text-zinc-400">{"\u2715"}</Text>
      )}
    </Pressable>
  );
};

// ============================================================================
// TerminalContent
// ============================================================================

export type TerminalContentProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const TerminalContent = ({
  className,
  children,
  testID,
  ...props
}: TerminalContentProps) => {
  const { output, isStreaming, autoScroll } = useContext(TerminalContext);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (autoScroll && scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  }, [output, autoScroll]);

  return (
    <ScrollView
      ref={scrollViewRef}
      testID={testID}
      className={cn("max-h-96 p-4", className)}
      {...props}
    >
      {children ?? (
        <Text className="font-mono text-sm leading-relaxed text-zinc-100">
          {output}
          {isStreaming && (
            <Text className="text-zinc-100">{"\u2588"}</Text>
          )}
        </Text>
      )}
    </ScrollView>
  );
};
