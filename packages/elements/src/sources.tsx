"use client";

import { View, type ViewProps, Pressable, Linking } from "react-native";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Text,
} from "@ai-native-elements/shadcn-ui";
import { cn } from "./utils";
import type { ComponentProps, ReactNode } from "react";

// ============================================================================
// Sources (Root)
// ============================================================================

export type SourcesProps = ComponentProps<typeof Collapsible> & {
  testID?: string;
};

export const Sources = ({ className, testID, ...props }: SourcesProps) => (
  <Collapsible
    className={cn("mb-4 text-xs", className)}
    {...(testID ? { testID } : {})}
    {...props}
  />
);

// ============================================================================
// SourcesTrigger
// ============================================================================

export type SourcesTriggerProps = ComponentProps<typeof CollapsibleTrigger> & {
  count: number;
  testID?: string;
};

export const SourcesTrigger = ({
  className,
  count,
  children,
  testID,
  ...props
}: SourcesTriggerProps) => (
  <CollapsibleTrigger
    className={cn("flex flex-row items-center gap-2", className)}
    {...(testID ? { testID } : {})}
    {...props}
  >
    {children ?? (
      <>
        <Text className="font-medium text-xs text-foreground">
          Used {count} sources
        </Text>
        <Text className="text-xs text-muted-foreground">{"\u25BE"}</Text>
      </>
    )}
  </CollapsibleTrigger>
);

// ============================================================================
// SourcesContent
// ============================================================================

export type SourcesContentProps = ComponentProps<typeof CollapsibleContent> & {
  testID?: string;
};

export const SourcesContent = ({
  className,
  testID,
  ...props
}: SourcesContentProps) => (
  <CollapsibleContent
    className={cn("mt-3 flex w-fit flex-col gap-2", className)}
    {...(testID ? { testID } : {})}
    {...props}
  />
);

// ============================================================================
// Source
// ============================================================================

export type SourceProps = {
  href?: string;
  title?: string;
  children?: ReactNode;
  className?: string;
  testID?: string;
};

export const Source = ({
  href,
  title,
  children,
  className,
  testID,
}: SourceProps) => (
  <Pressable
    className={cn("flex flex-row items-center gap-2", className)}
    onPress={() => href && Linking.openURL(href)}
    {...(testID ? { testID } : {})}
  >
    {children ?? (
      <>
        <Text className="text-xs text-foreground">{"\uD83D\uDCD6"}</Text>
        <Text className="font-medium text-xs text-foreground">{title}</Text>
      </>
    )}
  </Pressable>
);
