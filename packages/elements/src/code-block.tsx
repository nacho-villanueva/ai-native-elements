"use client";

import { View, type ViewProps, ScrollView, Pressable, Platform } from "react-native";
import {
  Button,
  type ButtonProps,
  Text,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ai-native-elements/shadcn-ui";
import { cn } from "./utils";
import {
  type ComponentProps,
  createContext,
  memo,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// ============================================================================
// Types
// ============================================================================

export type CodeBlockProps = ViewProps & {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  testID?: string;
};

interface CodeBlockContextType {
  code: string;
}

// ============================================================================
// Context
// ============================================================================

const CodeBlockContext = createContext<CodeBlockContextType>({
  code: "",
});

// ============================================================================
// CodeBlockContainer
// ============================================================================

export const CodeBlockContainer = ({
  className,
  language,
  testID,
  ...props
}: ViewProps & { language: string; testID?: string }) => (
  <View
    testID={testID}
    className={cn(
      "relative w-full overflow-hidden rounded-md border border-border bg-background",
      className
    )}
    accessibilityHint={`Code block in ${language}`}
    {...props}
  />
);

// ============================================================================
// CodeBlockHeader
// ============================================================================

export const CodeBlockHeader = ({
  children,
  className,
  testID,
  ...props
}: ViewProps & { testID?: string }) => (
  <View
    testID={testID}
    className={cn(
      "flex-row items-center justify-between bg-muted/80 px-3 py-2",
      className
    )}
    {...props}
  >
    {children}
  </View>
);

// ============================================================================
// CodeBlockTitle
// ============================================================================

export const CodeBlockTitle = ({
  children,
  className,
  testID,
  ...props
}: ViewProps & { testID?: string }) => (
  <View testID={testID} className={cn("flex-row items-center gap-2", className)} {...props}>
    {children}
  </View>
);

// ============================================================================
// CodeBlockFilename
// ============================================================================

export type CodeBlockFilenameProps = {
  children?: ReactNode;
  className?: string;
  testID?: string;
};

export const CodeBlockFilename = ({
  children,
  className,
  testID,
}: CodeBlockFilenameProps) => (
  <Text testID={testID} className={cn("font-mono text-xs text-muted-foreground", className)}>
    {children}
  </Text>
);

// ============================================================================
// CodeBlockActions
// ============================================================================

export const CodeBlockActions = ({
  children,
  className,
  testID,
  ...props
}: ViewProps & { testID?: string }) => (
  <View testID={testID} className={cn("flex-row items-center gap-2", className)} {...props}>
    {children}
  </View>
);

// ============================================================================
// CodeBlockBody (internal, renders the code text)
// ============================================================================

const CodeBlockBody = memo(
  ({
    code,
    showLineNumbers,
    className,
  }: {
    code: string;
    showLineNumbers: boolean;
    className?: string;
  }) => {
    const lines = useMemo(() => code.split("\n"), [code]);

    return (
      <View className={cn("bg-muted/30 p-4", className)}>
        {lines.map((line, index) => (
          <View key={`line-${index}`} className="flex-row">
            {showLineNumbers && (
              <Text className="w-8 mr-4 text-right text-muted-foreground/50 font-mono text-sm select-none">
                {index + 1}
              </Text>
            )}
            <Text className="font-mono text-sm text-foreground flex-1">
              {line || " "}
            </Text>
          </View>
        ))}
      </View>
    );
  },
  (prevProps, nextProps) =>
    prevProps.code === nextProps.code &&
    prevProps.showLineNumbers === nextProps.showLineNumbers &&
    prevProps.className === nextProps.className
);

// ============================================================================
// CodeBlockContent
// ============================================================================

export const CodeBlockContent = ({
  code,
  language,
  showLineNumbers = false,
  testID,
}: {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  testID?: string;
}) => (
  <ScrollView testID={testID} horizontal={false}>
    <ScrollView horizontal showsHorizontalScrollIndicator={Platform.OS === "web"}>
      <CodeBlockBody code={code} showLineNumbers={showLineNumbers} />
    </ScrollView>
  </ScrollView>
);

// ============================================================================
// CodeBlock (composed component)
// ============================================================================

export const CodeBlock = ({
  code,
  language,
  showLineNumbers = false,
  className,
  children,
  testID,
  ...props
}: CodeBlockProps) => (
  <CodeBlockContext.Provider value={{ code }}>
    <CodeBlockContainer className={className} language={language} testID={testID} {...props}>
      {children}
      <CodeBlockContent
        code={code}
        language={language}
        showLineNumbers={showLineNumbers}
      />
    </CodeBlockContainer>
  </CodeBlockContext.Provider>
);

// ============================================================================
// CodeBlockCopyButton
// ============================================================================

export type CodeBlockCopyButtonProps = ButtonProps & {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
  testID?: string;
};

export const CodeBlockCopyButton = ({
  onCopy,
  onError,
  timeout = 2000,
  children,
  className,
  testID,
  ...props
}: CodeBlockCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { code } = useContext(CodeBlockContext);

  const copyToClipboard = async () => {
    try {
      if (!isCopied) {
        // Use expo-clipboard if available, otherwise try RN Clipboard
        let Clipboard: { setStringAsync?: (s: string) => Promise<boolean>; setString?: (s: string) => void } | undefined;
        try {
          Clipboard = require("expo-clipboard");
        } catch {
          // expo-clipboard not available
        }

        if (Clipboard?.setStringAsync) {
          await Clipboard.setStringAsync(code);
        } else if (Platform.OS === "web" && typeof navigator !== "undefined" && navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(code);
        } else {
          onError?.(new Error("Clipboard API not available"));
          return;
        }

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
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  return (
    <Button
      testID={testID}
      className={cn("shrink-0", className)}
      onPress={copyToClipboard}
      size="icon"
      variant="ghost"
      {...props}
    >
      {children ?? (
        <Text className="text-xs text-muted-foreground">
          {isCopied ? "\u2713" : "\u2398"}
        </Text>
      )}
    </Button>
  );
};

// ============================================================================
// CodeBlockLanguageSelector (wraps shadcn-ui Select)
// ============================================================================

export type CodeBlockLanguageSelectorProps = ComponentProps<typeof Select>;

export const CodeBlockLanguageSelector = (
  props: CodeBlockLanguageSelectorProps
) => <Select {...props} />;

export type CodeBlockLanguageSelectorTriggerProps = ComponentProps<
  typeof SelectTrigger
> & {
  testID?: string;
};

export const CodeBlockLanguageSelectorTrigger = ({
  className,
  testID,
  ...props
}: CodeBlockLanguageSelectorTriggerProps) => (
  <SelectTrigger
    testID={testID}
    className={cn(
      "h-7 border-0 bg-transparent px-2",
      className
    )}
    size="sm"
    {...props}
  />
);

export type CodeBlockLanguageSelectorValueProps = ComponentProps<
  typeof SelectValue
>;

export const CodeBlockLanguageSelectorValue = (
  props: CodeBlockLanguageSelectorValueProps
) => <SelectValue {...props} />;

export type CodeBlockLanguageSelectorContentProps = ComponentProps<
  typeof SelectContent
>;

export const CodeBlockLanguageSelectorContent = (
  props: CodeBlockLanguageSelectorContentProps
) => <SelectContent {...props} />;

export type CodeBlockLanguageSelectorItemProps = ComponentProps<
  typeof SelectItem
>;

export const CodeBlockLanguageSelectorItem = (
  props: CodeBlockLanguageSelectorItemProps
) => <SelectItem {...props} />;
