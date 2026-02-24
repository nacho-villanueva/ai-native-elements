"use client";

import { View, type ViewProps, Pressable } from "react-native";
import * as Clipboard from "expo-clipboard";
import {
  Avatar,
  AvatarFallback,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Text,
} from "@ai-native-elements/shadcn-ui";
import { cn } from "./utils";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";

// ============================================================================
// Commit (Root)
// ============================================================================

export type CommitProps = ComponentProps<typeof Collapsible> & {
  testID?: string;
};

export const Commit = ({ className, testID, ...props }: CommitProps) => (
  <Collapsible
    className={cn("rounded-lg border bg-background", className)}
    {...(testID ? { testID } : {})}
    {...props}
  />
);

// ============================================================================
// CommitHeader
// ============================================================================

export type CommitHeaderProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const CommitHeader = ({
  className,
  children,
  testID,
  ...props
}: CommitHeaderProps) => (
  <CollapsibleTrigger
    className={cn(
      "flex flex-row items-center justify-between gap-4 p-3",
      className
    )}
    {...(testID ? { testID } : {})}
    {...props}
  >
    {children}
  </CollapsibleTrigger>
);

// ============================================================================
// CommitHash
// ============================================================================

export type CommitHashProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const CommitHash = ({
  className,
  children,
  testID,
  ...props
}: CommitHashProps) => (
  <View
    className={cn("flex flex-row items-center", className)}
    testID={testID}
    {...props}
  >
    <Text className="font-mono text-xs">
      {"\u2398"} {children}
    </Text>
  </View>
);

// ============================================================================
// CommitMessage
// ============================================================================

export type CommitMessageProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const CommitMessage = ({
  className,
  children,
  testID,
  ...props
}: CommitMessageProps) => (
  <View className={cn("flex-1", className)} testID={testID} {...props}>
    <Text className="font-medium text-sm">{children}</Text>
  </View>
);

// ============================================================================
// CommitMetadata
// ============================================================================

export type CommitMetadataProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const CommitMetadata = ({
  className,
  children,
  testID,
  ...props
}: CommitMetadataProps) => (
  <View
    className={cn("flex flex-row items-center gap-2", className)}
    testID={testID}
    {...props}
  >
    {children}
  </View>
);

// ============================================================================
// CommitSeparator
// ============================================================================

export type CommitSeparatorProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const CommitSeparator = ({
  className,
  children,
  testID,
  ...props
}: CommitSeparatorProps) => (
  <View className={className} testID={testID} {...props}>
    <Text className="text-muted-foreground text-xs">{children ?? "\u2022"}</Text>
  </View>
);

// ============================================================================
// CommitInfo
// ============================================================================

export type CommitInfoProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const CommitInfo = ({
  className,
  children,
  testID,
  ...props
}: CommitInfoProps) => (
  <View
    className={cn("flex flex-1 flex-col", className)}
    testID={testID}
    {...props}
  >
    {children}
  </View>
);

// ============================================================================
// CommitAuthor
// ============================================================================

export type CommitAuthorProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const CommitAuthor = ({
  className,
  children,
  testID,
  ...props
}: CommitAuthorProps) => (
  <View
    className={cn("flex flex-row items-center", className)}
    testID={testID}
    {...props}
  >
    {children}
  </View>
);

// ============================================================================
// CommitAuthorAvatar
// ============================================================================

export type CommitAuthorAvatarProps = ComponentProps<typeof Avatar> & {
  initials: string;
  testID?: string;
};

export const CommitAuthorAvatar = ({
  initials,
  className,
  testID,
  ...props
}: CommitAuthorAvatarProps) => (
  <Avatar
    className={cn("size-8", className)}
    {...(testID ? { testID } : {})}
    {...props}
  >
    <AvatarFallback className="text-xs">{initials}</AvatarFallback>
  </Avatar>
);

// ============================================================================
// CommitTimestamp
// ============================================================================

export type CommitTimestampProps = ViewProps & {
  date: Date;
  children?: ReactNode;
  testID?: string;
};

export const CommitTimestamp = ({
  date,
  className,
  children,
  testID,
  ...props
}: CommitTimestampProps) => {
  const formatted = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  }).format(
    Math.round((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
    "day"
  );

  return (
    <View className={className} testID={testID} {...props}>
      <Text className="text-xs text-muted-foreground">
        {children ?? formatted}
      </Text>
    </View>
  );
};

// ============================================================================
// CommitActions
// ============================================================================

export type CommitActionsProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const CommitActions = ({
  className,
  children,
  testID,
  ...props
}: CommitActionsProps) => (
  <View
    className={cn("flex flex-row items-center gap-1", className)}
    testID={testID}
    {...props}
  >
    {children}
  </View>
);

// ============================================================================
// CommitCopyButton
// ============================================================================

export type CommitCopyButtonProps = ViewProps & {
  hash: string;
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
  children?: ReactNode;
  testID?: string;
};

export const CommitCopyButton = ({
  hash,
  onCopy,
  onError,
  timeout = 2000,
  children,
  className,
  testID,
  ...props
}: CommitCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyToClipboard = async () => {
    try {
      if (!isCopied) {
        await Clipboard.setStringAsync(hash);
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
    <Pressable
      className={cn(
        "h-7 w-7 shrink-0 items-center justify-center rounded-md",
        className
      )}
      onPress={copyToClipboard}
      accessibilityLabel={isCopied ? "Copied" : "Copy hash"}
      testID={testID}
      {...props}
    >
      {children ?? (
        <Text className="text-xs">{isCopied ? "\u2713" : "\u2398"}</Text>
      )}
    </Pressable>
  );
};

// ============================================================================
// CommitContent
// ============================================================================

export type CommitContentProps = ComponentProps<typeof CollapsibleContent> & {
  testID?: string;
};

export const CommitContent = ({
  className,
  testID,
  ...props
}: CommitContentProps) => (
  <CollapsibleContent
    className={cn("border-t p-3", className)}
    {...(testID ? { testID } : {})}
    {...props}
  />
);

// ============================================================================
// CommitFiles
// ============================================================================

export type CommitFilesProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const CommitFiles = ({
  className,
  children,
  testID,
  ...props
}: CommitFilesProps) => (
  <View className={cn("gap-1", className)} testID={testID} {...props}>
    {children}
  </View>
);

// ============================================================================
// CommitFile
// ============================================================================

export type CommitFileProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const CommitFile = ({
  className,
  children,
  testID,
  ...props
}: CommitFileProps) => (
  <View
    className={cn(
      "flex flex-row items-center justify-between gap-2 rounded px-2 py-1",
      className
    )}
    testID={testID}
    {...props}
  >
    {children}
  </View>
);

// ============================================================================
// CommitFileInfo
// ============================================================================

export type CommitFileInfoProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const CommitFileInfo = ({
  className,
  children,
  testID,
  ...props
}: CommitFileInfoProps) => (
  <View
    className={cn("flex flex-row min-w-0 items-center gap-2", className)}
    testID={testID}
    {...props}
  >
    {children}
  </View>
);

// ============================================================================
// CommitFileStatus
// ============================================================================

const fileStatusStyles = {
  added: "text-green-600 dark:text-green-400",
  modified: "text-yellow-600 dark:text-yellow-400",
  deleted: "text-red-600 dark:text-red-400",
  renamed: "text-blue-600 dark:text-blue-400",
};

const fileStatusLabels = {
  added: "A",
  modified: "M",
  deleted: "D",
  renamed: "R",
};

export type CommitFileStatusProps = ViewProps & {
  status: "added" | "modified" | "deleted" | "renamed";
  children?: ReactNode;
  testID?: string;
};

export const CommitFileStatus = ({
  status,
  className,
  children,
  testID,
  ...props
}: CommitFileStatusProps) => (
  <View className={className} testID={testID} {...props}>
    <Text
      className={cn("font-medium font-mono text-xs", fileStatusStyles[status])}
    >
      {children ?? fileStatusLabels[status]}
    </Text>
  </View>
);

// ============================================================================
// CommitFileIcon
// ============================================================================

export type CommitFileIconProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const CommitFileIcon = ({
  className,
  children,
  testID,
  ...props
}: CommitFileIconProps) => (
  <View className={cn("shrink-0", className)} testID={testID} {...props}>
    {children ?? (
      <Text className="text-xs text-muted-foreground">{"\uD83D\uDCC4"}</Text>
    )}
  </View>
);

// ============================================================================
// CommitFilePath
// ============================================================================

export type CommitFilePathProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const CommitFilePath = ({
  className,
  children,
  testID,
  ...props
}: CommitFilePathProps) => (
  <View className={cn("min-w-0 flex-1", className)} testID={testID} {...props}>
    <Text className="truncate font-mono text-xs">{children}</Text>
  </View>
);

// ============================================================================
// CommitFileChanges
// ============================================================================

export type CommitFileChangesProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const CommitFileChanges = ({
  className,
  children,
  testID,
  ...props
}: CommitFileChangesProps) => (
  <View
    className={cn("flex flex-row shrink-0 items-center gap-1", className)}
    testID={testID}
    {...props}
  >
    {children}
  </View>
);

// ============================================================================
// CommitFileAdditions
// ============================================================================

export type CommitFileAdditionsProps = ViewProps & {
  count: number;
  children?: ReactNode;
  testID?: string;
};

export const CommitFileAdditions = ({
  count,
  className,
  children,
  testID,
  ...props
}: CommitFileAdditionsProps) => {
  if (count <= 0) {
    return null;
  }

  return (
    <View className={className} testID={testID} {...props}>
      <Text className="text-green-600 dark:text-green-400 text-xs font-mono">
        {children ?? `+${count}`}
      </Text>
    </View>
  );
};

// ============================================================================
// CommitFileDeletions
// ============================================================================

export type CommitFileDeletionsProps = ViewProps & {
  count: number;
  children?: ReactNode;
  testID?: string;
};

export const CommitFileDeletions = ({
  count,
  className,
  children,
  testID,
  ...props
}: CommitFileDeletionsProps) => {
  if (count <= 0) {
    return null;
  }

  return (
    <View className={className} testID={testID} {...props}>
      <Text className="text-red-600 dark:text-red-400 text-xs font-mono">
        {children ?? `-${count}`}
      </Text>
    </View>
  );
};
