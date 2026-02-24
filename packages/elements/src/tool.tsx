"use client";

import { View, type ViewProps, Pressable } from "react-native";
import {
  Badge,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Text,
} from "@ai-native-elements/shadcn-ui";
import { cn } from "./utils";
import type { ComponentProps, ReactNode } from "react";
import { isValidElement, useState } from "react";

// ============================================================================
// Types
// ============================================================================

export type ToolState =
  | "input-streaming"
  | "input-available"
  | "approval-requested"
  | "approval-responded"
  | "output-available"
  | "output-error"
  | "output-denied";

export type ToolPart = {
  type: string;
  state: ToolState;
  input?: unknown;
  output?: unknown;
  errorText?: string;
};

export type ToolProps = ComponentProps<typeof Collapsible> & {
  testID?: string;
};

// ============================================================================
// Tool (Root)
// ============================================================================

export const Tool = ({ className, testID, ...props }: ToolProps) => (
  <Collapsible
    className={cn("mb-4 w-full rounded-md border border-border", className)}
    {...(testID ? { testID } : {})}
    {...props}
  />
);

// ============================================================================
// Status Badge
// ============================================================================

export const getStatusBadge = (status: ToolState) => {
  const labels: Record<ToolState, string> = {
    "input-streaming": "Pending",
    "input-available": "Running",
    "approval-requested": "Awaiting Approval",
    "approval-responded": "Responded",
    "output-available": "Completed",
    "output-error": "Error",
    "output-denied": "Denied",
  };

  const iconSymbols: Record<ToolState, { symbol: string; color: string }> = {
    "input-streaming": { symbol: "\u25CB", color: "text-muted-foreground" },
    "input-available": { symbol: "\u25F7", color: "text-muted-foreground" },
    "approval-requested": { symbol: "\u25F7", color: "text-yellow-600" },
    "approval-responded": { symbol: "\u2713", color: "text-blue-600" },
    "output-available": { symbol: "\u2713", color: "text-green-600" },
    "output-error": { symbol: "\u2717", color: "text-red-600" },
    "output-denied": { symbol: "\u2717", color: "text-orange-600" },
  };

  const { symbol, color } = iconSymbols[status];

  return (
    <Badge className="gap-1.5 rounded-full" variant="secondary">
      <Text className={cn("text-xs", color)}>{symbol}</Text>
      <Text className="text-xs text-secondary-foreground">{labels[status]}</Text>
    </Badge>
  );
};

// ============================================================================
// ToolHeader
// ============================================================================

export type ToolHeaderProps = {
  title?: string;
  className?: string;
  testID?: string;
} & (
  | { type: string; state: ToolState; toolName?: never }
  | { type: "dynamic-tool"; state: ToolState; toolName: string }
);

export const ToolHeader = ({
  className,
  title,
  type,
  state,
  toolName,
  testID,
  ...props
}: ToolHeaderProps) => {
  const derivedName =
    type === "dynamic-tool" ? toolName : type.split("-").slice(1).join("-");

  return (
    <CollapsibleTrigger
      className={cn(
        "flex w-full flex-row items-center justify-between gap-4 p-3",
        className
      )}
      {...(testID ? { testID } : {})}
      {...props}
    >
      <View className="flex-row items-center gap-2">
        <Text className="text-sm text-muted-foreground">{"\uD83D\uDD27"}</Text>
        <Text className="font-medium text-sm text-foreground">
          {title ?? derivedName}
        </Text>
        {getStatusBadge(state)}
      </View>
      <Text className="text-sm text-muted-foreground">{"\u25BE"}</Text>
    </CollapsibleTrigger>
  );
};

// ============================================================================
// ToolContent
// ============================================================================

export type ToolContentProps = ComponentProps<typeof CollapsibleContent> & {
  testID?: string;
};

export const ToolContent = ({ className, testID, ...props }: ToolContentProps) => (
  <CollapsibleContent
    className={cn("", className)}
    {...(testID ? { testID } : {})}
    {...props}
  />
);

// ============================================================================
// Simple JSON Display (lightweight replacement for CodeBlock)
// ============================================================================

const JsonDisplay = ({ code, className }: { code: string; className?: string }) => (
  <View className={cn("rounded-md bg-muted/50 p-3", className)}>
    <Text className="font-mono text-xs text-foreground">{code}</Text>
  </View>
);

// ============================================================================
// ToolInput
// ============================================================================

export type ToolInputProps = ViewProps & {
  input: unknown;
  testID?: string;
};

export const ToolInput = ({ className, input, testID, ...props }: ToolInputProps) => (
  <View
    className={cn("gap-2 overflow-hidden p-4", className)}
    {...(testID ? { testID } : {})}
    {...props}
  >
    <Text className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
      Parameters
    </Text>
    <JsonDisplay code={JSON.stringify(input, null, 2)} />
  </View>
);

// ============================================================================
// ToolOutput
// ============================================================================

export type ToolOutputProps = ViewProps & {
  output: unknown;
  errorText?: string;
  testID?: string;
};

export const ToolOutput = ({
  className,
  output,
  errorText,
  testID,
  ...props
}: ToolOutputProps) => {
  if (!(output || errorText)) {
    return null;
  }

  let OutputContent: ReactNode;

  if (typeof output === "object" && !isValidElement(output)) {
    OutputContent = (
      <JsonDisplay code={JSON.stringify(output, null, 2)} />
    );
  } else if (typeof output === "string") {
    OutputContent = <JsonDisplay code={output} />;
  } else {
    OutputContent = <View><Text className="text-foreground">{output as ReactNode}</Text></View>;
  }

  return (
    <View
      className={cn("gap-2 p-4", className)}
      {...(testID ? { testID } : {})}
      {...props}
    >
      <Text className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        {errorText ? "Error" : "Result"}
      </Text>
      <View
        className={cn(
          "overflow-hidden rounded-md",
          errorText
            ? "bg-destructive/10"
            : "bg-muted/50"
        )}
      >
        {errorText && (
          <View className="p-3">
            <Text className="text-destructive text-xs">{errorText}</Text>
          </View>
        )}
        {OutputContent}
      </View>
    </View>
  );
};
