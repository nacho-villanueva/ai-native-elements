"use client";

import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Text,
} from "@ai-native-elements/shadcn-ui";
import { cn } from "./utils";
import { Image, ScrollView, View, type ViewProps, type ImageProps } from "react-native";
import type { ComponentProps } from "react";

// ============================================================================
// Interfaces
// ============================================================================

export interface QueueMessagePart {
  type: string;
  text?: string;
  url?: string;
  filename?: string;
  mediaType?: string;
}

export interface QueueMessage {
  id: string;
  parts: QueueMessagePart[];
}

export interface QueueTodo {
  id: string;
  title: string;
  description?: string;
  status?: "pending" | "completed";
}

// ============================================================================
// QueueItem
// ============================================================================

export type QueueItemProps = ViewProps & {
  testID?: string;
};

export const QueueItem = ({ className, testID, ...props }: QueueItemProps) => (
  <View
    className={cn(
      "flex flex-col gap-1 rounded-md px-3 py-1",
      className
    )}
    {...(testID ? { testID } : {})}
    {...props}
  />
);

// ============================================================================
// QueueItemIndicator
// ============================================================================

export type QueueItemIndicatorProps = ViewProps & {
  completed?: boolean;
  testID?: string;
};

export const QueueItemIndicator = ({
  completed = false,
  className,
  testID,
  ...props
}: QueueItemIndicatorProps) => (
  <View
    className={cn(
      "mt-0.5 size-2.5 rounded-full border",
      completed
        ? "border-muted-foreground/20 bg-muted-foreground/10"
        : "border-muted-foreground/50",
      className
    )}
    {...(testID ? { testID } : {})}
    {...props}
  />
);

// ============================================================================
// QueueItemContent
// ============================================================================

export type QueueItemContentProps = ViewProps & {
  completed?: boolean;
  testID?: string;
};

export const QueueItemContent = ({
  completed = false,
  className,
  testID,
  children,
  ...props
}: QueueItemContentProps) => (
  <View
    className={cn("grow", className)}
    {...(testID ? { testID } : {})}
    {...props}
  >
    {typeof children === "string" ? (
      <Text
        numberOfLines={1}
        className={cn(
          "break-words",
          completed
            ? "text-muted-foreground/50 line-through"
            : "text-muted-foreground"
        )}
      >
        {children}
      </Text>
    ) : (
      children
    )}
  </View>
);

// ============================================================================
// QueueItemDescription
// ============================================================================

export type QueueItemDescriptionProps = ViewProps & {
  completed?: boolean;
  testID?: string;
};

export const QueueItemDescription = ({
  completed = false,
  className,
  testID,
  children,
  ...props
}: QueueItemDescriptionProps) => (
  <View
    className={cn("ml-6", className)}
    {...(testID ? { testID } : {})}
    {...props}
  >
    {typeof children === "string" ? (
      <Text
        className={cn(
          "text-xs",
          completed
            ? "text-muted-foreground/40 line-through"
            : "text-muted-foreground"
        )}
      >
        {children}
      </Text>
    ) : (
      children
    )}
  </View>
);

// ============================================================================
// QueueItemActions
// ============================================================================

export type QueueItemActionsProps = ViewProps & {
  testID?: string;
};

export const QueueItemActions = ({
  className,
  testID,
  ...props
}: QueueItemActionsProps) => (
  <View
    className={cn("flex flex-row gap-1", className)}
    {...(testID ? { testID } : {})}
    {...props}
  />
);

// ============================================================================
// QueueItemAction (actions always visible in RN - no group-hover)
// ============================================================================

export type QueueItemActionProps = Omit<
  ComponentProps<typeof Button>,
  "variant" | "size"
> & {
  testID?: string;
};

export const QueueItemAction = ({
  className,
  testID,
  ...props
}: QueueItemActionProps) => (
  <Button
    className={cn(
      "size-auto rounded p-1 text-muted-foreground",
      className
    )}
    size="icon"
    variant="ghost"
    {...(testID ? { testID } : {})}
    {...props}
  />
);

// ============================================================================
// QueueItemAttachment
// ============================================================================

export type QueueItemAttachmentProps = ViewProps & {
  testID?: string;
};

export const QueueItemAttachment = ({
  className,
  testID,
  ...props
}: QueueItemAttachmentProps) => (
  <View
    className={cn("mt-1 flex flex-row flex-wrap gap-2", className)}
    {...(testID ? { testID } : {})}
    {...props}
  />
);

// ============================================================================
// QueueItemImage
// ============================================================================

export type QueueItemImageProps = Omit<ImageProps, "source"> & {
  src?: string;
  testID?: string;
};

export const QueueItemImage = ({
  className,
  src,
  testID,
  ...props
}: QueueItemImageProps) => (
  <Image
    source={src ? { uri: src } : undefined}
    style={{ width: 32, height: 32 }}
    className={cn("rounded border", className)}
    {...(testID ? { testID } : {})}
    {...props}
  />
);

// ============================================================================
// QueueItemFile
// ============================================================================

export type QueueItemFileProps = ViewProps & {
  testID?: string;
};

export const QueueItemFile = ({
  children,
  className,
  testID,
  ...props
}: QueueItemFileProps) => (
  <View
    className={cn(
      "flex flex-row items-center gap-1 rounded border bg-muted px-2 py-1",
      className
    )}
    {...(testID ? { testID } : {})}
    {...props}
  >
    <Text className="text-xs">{"\uD83D\uDCCE"}</Text>
    {typeof children === "string" ? (
      <Text numberOfLines={1} className="text-xs max-w-[100px]">
        {children}
      </Text>
    ) : (
      children
    )}
  </View>
);

// ============================================================================
// QueueList (ScrollArea -> ScrollView)
// ============================================================================

export type QueueListProps = ViewProps & {
  testID?: string;
};

export const QueueList = ({
  children,
  className,
  testID,
  ...props
}: QueueListProps) => (
  <View className={cn("mt-2 -mb-1", className)} {...(testID ? { testID } : {})} {...props}>
    <ScrollView style={{ maxHeight: 160 }}>
      {children}
    </ScrollView>
  </View>
);

// ============================================================================
// QueueSection
// ============================================================================

export type QueueSectionProps = ComponentProps<typeof Collapsible> & {
  testID?: string;
};

export const QueueSection = ({
  className,
  defaultOpen = true,
  testID,
  ...props
}: QueueSectionProps) => (
  <Collapsible
    className={cn(className)}
    defaultOpen={defaultOpen}
    {...(testID ? { testID } : {})}
    {...props}
  />
);

// ============================================================================
// QueueSectionTrigger
// ============================================================================

export type QueueSectionTriggerProps = ComponentProps<typeof CollapsibleTrigger> & {
  testID?: string;
};

export const QueueSectionTrigger = ({
  children,
  className,
  testID,
  ...props
}: QueueSectionTriggerProps) => (
  <CollapsibleTrigger
    className={cn(
      "flex w-full flex-row items-center justify-between rounded-md bg-muted/40 px-3 py-2",
      className
    )}
    {...(testID ? { testID } : {})}
    {...props}
  >
    {children}
  </CollapsibleTrigger>
);

// ============================================================================
// QueueSectionLabel
// ============================================================================

export type QueueSectionLabelProps = ViewProps & {
  count?: number;
  label: string;
  icon?: React.ReactNode;
  testID?: string;
};

export const QueueSectionLabel = ({
  count,
  label,
  icon,
  className,
  testID,
  ...props
}: QueueSectionLabelProps) => (
  <View
    className={cn("flex flex-row items-center gap-2", className)}
    {...(testID ? { testID } : {})}
    {...props}
  >
    <Text className="text-muted-foreground text-sm">{"\u25BE"}</Text>
    {icon}
    <Text className="font-medium text-muted-foreground text-sm">
      {count} {label}
    </Text>
  </View>
);

// ============================================================================
// QueueSectionContent
// ============================================================================

export type QueueSectionContentProps = ComponentProps<typeof CollapsibleContent> & {
  testID?: string;
};

export const QueueSectionContent = ({
  className,
  testID,
  ...props
}: QueueSectionContentProps) => (
  <CollapsibleContent
    className={cn(className)}
    {...(testID ? { testID } : {})}
    {...props}
  />
);

// ============================================================================
// Queue
// ============================================================================

export type QueueProps = ViewProps & {
  testID?: string;
};

export const Queue = ({ className, testID, ...props }: QueueProps) => (
  <View
    className={cn(
      "flex flex-col gap-2 rounded-xl border border-border bg-background px-3 pt-2 pb-2",
      className
    )}
    {...(testID ? { testID } : {})}
    {...props}
  />
);
