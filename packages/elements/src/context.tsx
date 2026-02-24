"use client";

import { View, type ViewProps, Pressable } from "react-native";
import {
  Button,
  Text,
  Progress,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@ai-native-elements/shadcn-ui";
import { cn } from "./utils";
import { createContext, useContext, type ReactNode } from "react";
import Svg, { Circle } from "react-native-svg";

// ============================================================================
// Constants
// ============================================================================

const PERCENT_MAX = 100;
const ICON_RADIUS = 10;
const ICON_VIEWBOX = 24;
const ICON_CENTER = 12;
const ICON_STROKE_WIDTH = 2;

// ============================================================================
// Types
// ============================================================================

interface ContextSchema {
  usedTokens: number;
  maxTokens: number;
  usage?: {
    inputTokens?: number;
    outputTokens?: number;
    reasoningTokens?: number;
    cachedInputTokens?: number;
  };
  modelId?: string;
  totalCost?: number; // Pass cost directly instead of computing via tokenlens
}

// ============================================================================
// Context
// ============================================================================

const ContextContext = createContext<ContextSchema | null>(null);

const useContextValue = () => {
  const context = useContext(ContextContext);
  if (!context) {
    throw new Error("Context components must be used within Context");
  }
  return context;
};

// ============================================================================
// ContextIcon — SVG circle progress
// ============================================================================

const ContextIcon = () => {
  const { usedTokens, maxTokens } = useContextValue();
  const circumference = 2 * Math.PI * ICON_RADIUS;
  const usedPercent = usedTokens / maxTokens;
  const dashOffset = circumference * (1 - usedPercent);

  return (
    <Svg
      width={20}
      height={20}
      viewBox={`0 0 ${ICON_VIEWBOX} ${ICON_VIEWBOX}`}
      accessibilityLabel="Model context usage"
      accessibilityRole="image"
    >
      <Circle
        cx={ICON_CENTER}
        cy={ICON_CENTER}
        r={ICON_RADIUS}
        stroke="currentColor"
        strokeWidth={ICON_STROKE_WIDTH}
        fill="none"
        opacity={0.25}
      />
      <Circle
        cx={ICON_CENTER}
        cy={ICON_CENTER}
        r={ICON_RADIUS}
        stroke="currentColor"
        strokeWidth={ICON_STROKE_WIDTH}
        fill="none"
        opacity={0.7}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        origin={`${ICON_CENTER}, ${ICON_CENTER}`}
        rotation={-90}
      />
    </Svg>
  );
};

// ============================================================================
// Context (Root)
// ============================================================================

export type ContextProps = {
  usedTokens: number;
  maxTokens: number;
  usage?: ContextSchema["usage"];
  modelId?: string;
  totalCost?: number;
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  testID?: string;
};

export const Context = ({
  usedTokens,
  maxTokens,
  usage,
  modelId,
  totalCost,
  children,
  open,
  onOpenChange,
  testID,
}: ContextProps) => (
  <ContextContext.Provider value={{ usedTokens, maxTokens, usage, modelId, totalCost }}>
    <View testID={testID}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {children}
      </Dialog>
    </View>
  </ContextContext.Provider>
);

// ============================================================================
// ContextTrigger
// ============================================================================

export type ContextTriggerProps = {
  children?: ReactNode;
  className?: string;
  testID?: string;
};

export const ContextTrigger = ({ children, className, testID }: ContextTriggerProps) => {
  const { usedTokens, maxTokens } = useContextValue();
  const usedPercent = usedTokens / maxTokens;
  const renderedPercent = new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(usedPercent);

  return (
    <DialogTrigger asChild>
      {children ?? (
        <Button variant="ghost" className={cn("flex-row items-center gap-2", className)} testID={testID}>
          <Text className="font-medium text-muted-foreground">{renderedPercent}</Text>
          <ContextIcon />
        </Button>
      )}
    </DialogTrigger>
  );
};

// ============================================================================
// ContextContent
// ============================================================================

export type ContextContentProps = ViewProps;

export const ContextContent = ({
  className,
  ...props
}: ContextContentProps) => (
  <DialogContent className={cn("min-w-60 divide-y overflow-hidden p-0", className)} {...props} />
);

// ============================================================================
// ContextContentHeader
// ============================================================================

export type ContextContentHeaderProps = ViewProps & {
  children?: ReactNode;
};

export const ContextContentHeader = ({
  children,
  className,
  ...props
}: ContextContentHeaderProps) => {
  const { usedTokens, maxTokens } = useContextValue();
  const usedPercent = usedTokens / maxTokens;
  const displayPct = new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(usedPercent);
  const used = new Intl.NumberFormat("en-US", { notation: "compact" }).format(usedTokens);
  const total = new Intl.NumberFormat("en-US", { notation: "compact" }).format(maxTokens);

  return (
    <View className={cn("w-full gap-2 p-3", className)} {...props}>
      {children ?? (
        <>
          <View className="flex-row items-center justify-between gap-3">
            <Text className="text-xs">{displayPct}</Text>
            <Text className="font-mono text-xs text-muted-foreground">
              {used} / {total}
            </Text>
          </View>
          <Progress className="bg-muted" value={usedPercent * PERCENT_MAX} />
        </>
      )}
    </View>
  );
};

// ============================================================================
// ContextContentBody
// ============================================================================

export type ContextContentBodyProps = ViewProps;

export const ContextContentBody = ({
  children,
  className,
  ...props
}: ContextContentBodyProps) => (
  <View className={cn("w-full p-3", className)} {...props}>
    {children}
  </View>
);

// ============================================================================
// ContextContentFooter
// ============================================================================

export type ContextContentFooterProps = ViewProps & {
  children?: ReactNode;
};

export const ContextContentFooter = ({
  children,
  className,
  ...props
}: ContextContentFooterProps) => {
  const { totalCost } = useContextValue();
  const costText = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalCost ?? 0);

  return (
    <View
      className={cn(
        "flex-row w-full items-center justify-between gap-3 bg-secondary p-3",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <Text className="text-xs text-muted-foreground">Total cost</Text>
          <Text className="text-xs">{costText}</Text>
        </>
      )}
    </View>
  );
};

// ============================================================================
// TokensWithCost — internal helper
// ============================================================================

const TokensWithCost = ({
  tokens,
  costText,
}: {
  tokens?: number;
  costText?: string;
}) => (
  <Text className="text-xs">
    {tokens === undefined
      ? "—"
      : new Intl.NumberFormat("en-US", { notation: "compact" }).format(tokens)}
    {costText ? (
      <Text className="ml-2 text-xs text-muted-foreground"> • {costText}</Text>
    ) : null}
  </Text>
);

// ============================================================================
// ContextInputUsage
// ============================================================================

export type ContextInputUsageProps = ViewProps & {
  children?: ReactNode;
  costText?: string;
};

export const ContextInputUsage = ({
  className,
  children,
  costText,
  ...props
}: ContextInputUsageProps) => {
  const { usage } = useContextValue();
  const inputTokens = usage?.inputTokens ?? 0;

  if (children) {
    return <>{children}</>;
  }

  if (!inputTokens) {
    return null;
  }

  return (
    <View
      className={cn("flex-row items-center justify-between", className)}
      {...props}
    >
      <Text className="text-xs text-muted-foreground">Input</Text>
      <TokensWithCost tokens={inputTokens} costText={costText} />
    </View>
  );
};

// ============================================================================
// ContextOutputUsage
// ============================================================================

export type ContextOutputUsageProps = ViewProps & {
  children?: ReactNode;
  costText?: string;
};

export const ContextOutputUsage = ({
  className,
  children,
  costText,
  ...props
}: ContextOutputUsageProps) => {
  const { usage } = useContextValue();
  const outputTokens = usage?.outputTokens ?? 0;

  if (children) {
    return <>{children}</>;
  }

  if (!outputTokens) {
    return null;
  }

  return (
    <View
      className={cn("flex-row items-center justify-between", className)}
      {...props}
    >
      <Text className="text-xs text-muted-foreground">Output</Text>
      <TokensWithCost tokens={outputTokens} costText={costText} />
    </View>
  );
};

// ============================================================================
// ContextReasoningUsage
// ============================================================================

export type ContextReasoningUsageProps = ViewProps & {
  children?: ReactNode;
  costText?: string;
};

export const ContextReasoningUsage = ({
  className,
  children,
  costText,
  ...props
}: ContextReasoningUsageProps) => {
  const { usage } = useContextValue();
  const reasoningTokens = usage?.reasoningTokens ?? 0;

  if (children) {
    return <>{children}</>;
  }

  if (!reasoningTokens) {
    return null;
  }

  return (
    <View
      className={cn("flex-row items-center justify-between", className)}
      {...props}
    >
      <Text className="text-xs text-muted-foreground">Reasoning</Text>
      <TokensWithCost tokens={reasoningTokens} costText={costText} />
    </View>
  );
};

// ============================================================================
// ContextCacheUsage
// ============================================================================

export type ContextCacheUsageProps = ViewProps & {
  children?: ReactNode;
  costText?: string;
};

export const ContextCacheUsage = ({
  className,
  children,
  costText,
  ...props
}: ContextCacheUsageProps) => {
  const { usage } = useContextValue();
  const cacheTokens = usage?.cachedInputTokens ?? 0;

  if (children) {
    return <>{children}</>;
  }

  if (!cacheTokens) {
    return null;
  }

  return (
    <View
      className={cn("flex-row items-center justify-between", className)}
      {...props}
    >
      <Text className="text-xs text-muted-foreground">Cache</Text>
      <TokensWithCost tokens={cacheTokens} costText={costText} />
    </View>
  );
};
