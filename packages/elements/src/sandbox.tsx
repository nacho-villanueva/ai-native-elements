"use client";

import { View, type ViewProps } from "react-native";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from "@ai-native-elements/shadcn-ui";
import { cn } from "./utils";
import type { ComponentProps, ReactNode } from "react";
import { getStatusBadge, type ToolState } from "./tool";

// ============================================================================
// Sandbox (root)
// ============================================================================

export type SandboxRootProps = ComponentProps<typeof Collapsible> & {
  testID?: string;
};

export const Sandbox = ({ className, testID, ...props }: SandboxRootProps) => (
  <Collapsible
    className={cn(
      "mb-4 w-full overflow-hidden rounded-md border border-border",
      className
    )}
    defaultOpen
    {...(testID ? { testID } : {})}
    {...props}
  />
);

// ============================================================================
// SandboxHeader
// ============================================================================

export type SandboxHeaderProps = {
  title?: string;
  state: ToolState;
  className?: string;
  testID?: string;
};

export const SandboxHeader = ({
  className,
  title,
  state,
  testID,
  ...props
}: SandboxHeaderProps) => (
  <CollapsibleTrigger
    className={cn(
      "flex w-full flex-row items-center justify-between gap-4 p-3",
      className
    )}
    {...(testID ? { testID } : {})}
    {...props}
  >
    <View className="flex-row items-center gap-2">
      <Text className="text-sm text-muted-foreground">{"\uD83D\uDCBB"}</Text>
      <Text className="font-medium text-sm text-foreground">{title}</Text>
      {getStatusBadge(state)}
    </View>
    <Text className="text-sm text-muted-foreground">{"\u25BE"}</Text>
  </CollapsibleTrigger>
);

// ============================================================================
// SandboxContent
// ============================================================================

export type SandboxContentProps = ComponentProps<typeof CollapsibleContent> & {
  testID?: string;
};

export const SandboxContent = ({
  className,
  testID,
  ...props
}: SandboxContentProps) => (
  <CollapsibleContent
    className={cn("", className)}
    {...(testID ? { testID } : {})}
    {...props}
  />
);

// ============================================================================
// SandboxTabs
// ============================================================================

export type SandboxTabsProps = ComponentProps<typeof Tabs> & {
  testID?: string;
};

export const SandboxTabs = ({ className, testID, ...props }: SandboxTabsProps) => (
  <Tabs
    className={cn("w-full gap-0", className)}
    {...(testID ? { testID } : {})}
    {...props}
  />
);

// ============================================================================
// SandboxTabsBar
// ============================================================================

export type SandboxTabsBarProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const SandboxTabsBar = ({
  className,
  testID,
  ...props
}: SandboxTabsBarProps) => (
  <View
    testID={testID}
    className={cn(
      "flex w-full flex-row items-center border-t border-b border-border",
      className
    )}
    {...props}
  />
);

// ============================================================================
// SandboxTabsList
// ============================================================================

export type SandboxTabsListProps = ComponentProps<typeof TabsList> & {
  testID?: string;
};

export const SandboxTabsList = ({
  className,
  testID,
  ...props
}: SandboxTabsListProps) => (
  <TabsList
    className={cn("h-auto rounded-none border-0 bg-transparent p-0", className)}
    {...(testID ? { testID } : {})}
    {...props}
  />
);

// ============================================================================
// SandboxTabsTrigger
// ============================================================================

export type SandboxTabsTriggerProps = ComponentProps<typeof TabsTrigger> & {
  testID?: string;
};

export const SandboxTabsTrigger = ({
  className,
  testID,
  ...props
}: SandboxTabsTriggerProps) => (
  <TabsTrigger
    className={cn(
      "rounded-none border-0 px-4 py-2 font-medium text-muted-foreground text-sm",
      className
    )}
    {...(testID ? { testID } : {})}
    {...props}
  />
);

// ============================================================================
// SandboxTabContent
// ============================================================================

export type SandboxTabContentProps = ComponentProps<typeof TabsContent> & {
  testID?: string;
};

export const SandboxTabContent = ({
  className,
  testID,
  ...props
}: SandboxTabContentProps) => (
  <TabsContent
    className={cn("mt-0 text-sm", className)}
    {...(testID ? { testID } : {})}
    {...props}
  />
);
