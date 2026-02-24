"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Text,
} from "@ai-native-elements/shadcn-ui";
import { cn } from "./utils";
import { View, type ViewProps } from "react-native";
import type { ComponentProps } from "react";

// ============================================================================
// TaskItemFile
// ============================================================================

export type TaskItemFileProps = ViewProps & {
  testID?: string;
};

export const TaskItemFile = ({
  children,
  className,
  testID,
  ...props
}: TaskItemFileProps) => (
  <View
    className={cn(
      "inline-flex items-center gap-1 rounded-md border bg-secondary px-1.5 py-0.5",
      className
    )}
    {...(testID ? { testID } : {})}
    {...props}
  >
    {typeof children === "string" ? (
      <Text className="text-foreground text-xs">{children}</Text>
    ) : (
      children
    )}
  </View>
);

// ============================================================================
// TaskItem
// ============================================================================

export type TaskItemProps = ViewProps & {
  testID?: string;
};

export const TaskItem = ({ children, className, testID, ...props }: TaskItemProps) => (
  <View className={cn(className)} {...(testID ? { testID } : {})} {...props}>
    {typeof children === "string" ? (
      <Text className="text-muted-foreground text-sm">{children}</Text>
    ) : (
      children
    )}
  </View>
);

// ============================================================================
// Task
// ============================================================================

export type TaskProps = ComponentProps<typeof Collapsible> & {
  testID?: string;
};

export const Task = ({
  defaultOpen = true,
  className,
  testID,
  ...props
}: TaskProps) => (
  <Collapsible
    className={cn(className)}
    defaultOpen={defaultOpen}
    {...(testID ? { testID } : {})}
    {...props}
  />
);

// ============================================================================
// TaskTrigger
// ============================================================================

export type TaskTriggerProps = ComponentProps<typeof CollapsibleTrigger> & {
  title: string;
  testID?: string;
};

export const TaskTrigger = ({
  children,
  className,
  title,
  testID,
  ...props
}: TaskTriggerProps) => (
  <CollapsibleTrigger
    className={cn(className)}
    {...(testID ? { testID } : {})}
    {...props}
  >
    {children ?? (
      <View className="flex w-full flex-row items-center gap-2">
        <Text className="text-muted-foreground text-sm">{"\uD83D\uDD0D"}</Text>
        <Text className="text-muted-foreground text-sm">{title}</Text>
        <Text className="text-muted-foreground text-sm">{"\u25BE"}</Text>
      </View>
    )}
  </CollapsibleTrigger>
);

// ============================================================================
// TaskContent
// ============================================================================

export type TaskContentProps = ComponentProps<typeof CollapsibleContent> & {
  testID?: string;
};

export const TaskContent = ({
  children,
  className,
  testID,
  ...props
}: TaskContentProps) => (
  <CollapsibleContent className={cn(className)} {...(testID ? { testID } : {})} {...props}>
    <View className="mt-4 gap-2 border-l-2 border-muted pl-4">{children}</View>
  </CollapsibleContent>
);
