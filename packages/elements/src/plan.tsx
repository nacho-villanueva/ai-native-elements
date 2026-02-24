"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Button,
  Text,
} from "@ai-native-elements/shadcn-ui";
import { cn } from "./utils";
import { createContext, useContext } from "react";
import { View, type ViewProps } from "react-native";
import type { ComponentProps } from "react";
import { Shimmer } from "./shimmer";

// ============================================================================
// Context
// ============================================================================

interface PlanContextValue {
  isStreaming: boolean;
}

const PlanContext = createContext<PlanContextValue | null>(null);

const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("Plan components must be used within Plan");
  }
  return context;
};

// ============================================================================
// Plan (root - Collapsible wrapping Card)
// ============================================================================

export type PlanProps = ComponentProps<typeof Collapsible> & {
  isStreaming?: boolean;
  testID?: string;
};

export const Plan = ({
  className,
  isStreaming = false,
  children,
  testID,
  ...props
}: PlanProps) => (
  <PlanContext.Provider value={{ isStreaming }}>
    <Collapsible {...props}>
      <Card
        className={cn("shadow-none", className)}
        {...(testID ? { testID } : {})}
      >
        {children}
      </Card>
    </Collapsible>
  </PlanContext.Provider>
);

// ============================================================================
// PlanHeader
// ============================================================================

export type PlanHeaderProps = ComponentProps<typeof CardHeader> & {
  testID?: string;
};

export const PlanHeader = ({ className, testID, ...props }: PlanHeaderProps) => (
  <CardHeader
    className={cn("flex items-start justify-between", className)}
    {...(testID ? { testID } : {})}
    {...props}
  />
);

// ============================================================================
// PlanTitle
// ============================================================================

export type PlanTitleProps = Omit<ComponentProps<typeof CardTitle>, "children"> & {
  children: string;
  testID?: string;
};

export const PlanTitle = ({ children, testID, ...props }: PlanTitleProps) => {
  const { isStreaming } = usePlan();

  return (
    <CardTitle {...(testID ? { testID } : {})} {...props}>
      {isStreaming ? <Shimmer>{children}</Shimmer> : children}
    </CardTitle>
  );
};

// ============================================================================
// PlanDescription
// ============================================================================

export type PlanDescriptionProps = Omit<
  ComponentProps<typeof CardDescription>,
  "children"
> & {
  children: string;
  testID?: string;
};

export const PlanDescription = ({
  className,
  children,
  testID,
  ...props
}: PlanDescriptionProps) => {
  const { isStreaming } = usePlan();

  return (
    <CardDescription
      className={cn("text-balance", className)}
      {...(testID ? { testID } : {})}
      {...props}
    >
      {isStreaming ? <Shimmer>{children}</Shimmer> : children}
    </CardDescription>
  );
};

// ============================================================================
// PlanAction (CardAction not available in RN - use View)
// ============================================================================

export type PlanActionProps = ViewProps & {
  testID?: string;
};

export const PlanAction = ({ testID, ...props }: PlanActionProps) => (
  <View {...(testID ? { testID } : {})} {...props} />
);

// ============================================================================
// PlanContent (CollapsibleContent wrapping CardContent)
// ============================================================================

export type PlanContentProps = ComponentProps<typeof CardContent> & {
  testID?: string;
};

export const PlanContent = ({ testID, ...props }: PlanContentProps) => (
  <CollapsibleContent>
    <CardContent {...(testID ? { testID } : {})} {...props} />
  </CollapsibleContent>
);

// ============================================================================
// PlanFooter
// ============================================================================

export type PlanFooterProps = ComponentProps<typeof CardFooter> & {
  testID?: string;
};

export const PlanFooter = ({ testID, ...props }: PlanFooterProps) => (
  <CardFooter {...(testID ? { testID } : {})} {...props} />
);

// ============================================================================
// PlanTrigger
// ============================================================================

export type PlanTriggerProps = ComponentProps<typeof CollapsibleTrigger> & {
  testID?: string;
};

export const PlanTrigger = ({ className, testID, ...props }: PlanTriggerProps) => (
  <CollapsibleTrigger>
    <Button
      className={cn("size-8", className)}
      size="icon"
      variant="ghost"
      accessibilityLabel="Toggle plan"
      {...(testID ? { testID } : {})}
      {...props}
    >
      <Text>{"\u2195"}</Text>
    </Button>
  </CollapsibleTrigger>
);
