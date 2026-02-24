"use client";

import { View, type ViewProps, Pressable } from "react-native";
import { Text } from "@ai-native-elements/shadcn-ui";
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

// ============================================================================
// Context
// ============================================================================

interface SnippetContextType {
  code: string;
}

const SnippetContext = createContext<SnippetContextType>({
  code: "",
});

// ============================================================================
// Snippet (root)
// ============================================================================

export type SnippetProps = ViewProps & {
  code: string;
  children?: ReactNode;
  testID?: string;
};

export const Snippet = ({
  code,
  className,
  children,
  testID,
  ...props
}: SnippetProps) => (
  <SnippetContext.Provider value={{ code }}>
    <View
      testID={testID}
      className={cn(
        "flex flex-row items-center overflow-hidden rounded-md border border-border font-mono",
        className
      )}
      {...props}
    >
      {children}
    </View>
  </SnippetContext.Provider>
);

// ============================================================================
// SnippetAddon
// ============================================================================

export type SnippetAddonProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const SnippetAddon = ({
  className,
  children,
  testID,
  ...props
}: SnippetAddonProps) => (
  <View
    testID={testID}
    className={cn(
      "items-center justify-center border-r border-border bg-muted px-2 py-1.5",
      className
    )}
    {...props}
  >
    {children}
  </View>
);

// ============================================================================
// SnippetText
// ============================================================================

export type SnippetTextProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const SnippetText = ({
  className,
  children,
  testID,
  ...props
}: SnippetTextProps) => (
  <View
    testID={testID}
    className={cn("flex-1 items-start justify-center px-2 py-1.5", className)}
    {...props}
  >
    <Text className="font-normal text-sm text-muted-foreground">{children}</Text>
  </View>
);

// ============================================================================
// SnippetInput
// ============================================================================

export type SnippetInputProps = ViewProps & {
  testID?: string;
};

export const SnippetInput = ({
  className,
  testID,
  ...props
}: SnippetInputProps) => {
  const { code } = useContext(SnippetContext);

  return (
    <View
      testID={testID}
      className={cn("flex-1 items-start justify-center px-2 py-1.5", className)}
      {...props}
    >
      <Text className="font-mono text-sm text-foreground" numberOfLines={1}>
        {code}
      </Text>
    </View>
  );
};

// ============================================================================
// SnippetCopyButton
// ============================================================================

export type SnippetCopyButtonProps = ViewProps & {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
  children?: ReactNode;
  testID?: string;
};

export const SnippetCopyButton = ({
  onCopy,
  onError,
  timeout = 2000,
  children,
  className,
  testID,
  ...props
}: SnippetCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { code } = useContext(SnippetContext);

  const copyToClipboard = async () => {
    try {
      if (!isCopied) {
        await Clipboard.setStringAsync(code);
        setIsCopied(true);
        onCopy?.();
        timeoutRef.current = setTimeout(() => setIsCopied(false), timeout);
      }
    } catch (error) {
      onError?.(error as Error);
    }
  };

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  return (
    <Pressable
      testID={testID}
      className={cn(
        "h-8 w-8 shrink-0 items-center justify-center border-l border-border",
        className
      )}
      onPress={copyToClipboard}
      accessibilityLabel={isCopied ? "Copied" : "Copy"}
      {...props}
    >
      {children ?? (
        <Text className="text-xs text-muted-foreground">
          {isCopied ? "\u2713" : "\u2398"}
        </Text>
      )}
    </Pressable>
  );
};
