"use client";

import { View, type ViewProps, Pressable } from "react-native";
import {
  Button,
  Separator,
  Text,
} from "@ai-native-elements/shadcn-ui";
import { cn } from "./utils";
import type { ComponentProps, ReactNode } from "react";

// ============================================================================
// Checkpoint (root)
// ============================================================================

export type CheckpointProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const Checkpoint = ({
  className,
  children,
  testID,
  ...props
}: CheckpointProps) => (
  <View
    testID={testID}
    className={cn(
      "flex flex-row items-center gap-0.5 overflow-hidden text-muted-foreground",
      className
    )}
    {...props}
  >
    {children}
    <Separator className="flex-1" />
  </View>
);

// ============================================================================
// CheckpointIcon
// ============================================================================

export type CheckpointIconProps = ViewProps & {
  children?: ReactNode;
  className?: string;
  testID?: string;
};

export const CheckpointIcon = ({
  className,
  children,
  testID,
  ...props
}: CheckpointIconProps) => (
  <View
    testID={testID}
    className={cn("shrink-0 items-center justify-center", className)}
    {...props}
  >
    {children ?? <Text className="text-sm text-muted-foreground">{"\uD83D\uDD16"}</Text>}
  </View>
);

// ============================================================================
// CheckpointTrigger
// ============================================================================

export type CheckpointTriggerProps = ComponentProps<typeof Button> & {
  tooltip?: string;
  testID?: string;
};

export const CheckpointTrigger = ({
  children,
  className,
  variant = "ghost",
  size = "sm",
  tooltip,
  testID,
  ...props
}: CheckpointTriggerProps) => (
  <Button
    size={size}
    variant={variant}
    className={className}
    accessibilityLabel={tooltip}
    {...(testID ? { testID } : {})}
    {...props}
  >
    {children}
  </Button>
);
