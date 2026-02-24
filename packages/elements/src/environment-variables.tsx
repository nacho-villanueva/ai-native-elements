"use client";

import { View, type ViewProps } from "react-native";
import * as Clipboard from "expo-clipboard";
import {
  Badge,
  Button,
  Switch,
  Text,
} from "@ai-native-elements/shadcn-ui";
import { cn } from "./utils";
import {
  createContext,
  useContext,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";

// ============================================================================
// EnvironmentVariables Context
// ============================================================================

interface EnvironmentVariablesContextType {
  showValues: boolean;
  setShowValues: (show: boolean) => void;
}

const EnvironmentVariablesContext =
  createContext<EnvironmentVariablesContextType>({
    showValues: false,
    setShowValues: () => undefined,
  });

// ============================================================================
// EnvironmentVariables (Root)
// ============================================================================

export type EnvironmentVariablesProps = ViewProps & {
  showValues?: boolean;
  defaultShowValues?: boolean;
  onShowValuesChange?: (show: boolean) => void;
  children?: ReactNode;
  testID?: string;
};

export const EnvironmentVariables = ({
  showValues: controlledShowValues,
  defaultShowValues = false,
  onShowValuesChange,
  className,
  children,
  testID,
  ...props
}: EnvironmentVariablesProps) => {
  const [internalShowValues, setInternalShowValues] =
    useState(defaultShowValues);
  const showValues = controlledShowValues ?? internalShowValues;

  const setShowValues = (show: boolean) => {
    setInternalShowValues(show);
    onShowValuesChange?.(show);
  };

  return (
    <EnvironmentVariablesContext.Provider value={{ showValues, setShowValues }}>
      <View
        className={cn("rounded-lg border bg-background", className)}
        testID={testID}
        {...props}
      >
        {children}
      </View>
    </EnvironmentVariablesContext.Provider>
  );
};

// ============================================================================
// EnvironmentVariablesHeader
// ============================================================================

export type EnvironmentVariablesHeaderProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const EnvironmentVariablesHeader = ({
  className,
  children,
  testID,
  ...props
}: EnvironmentVariablesHeaderProps) => (
  <View
    className={cn(
      "flex flex-row items-center justify-between border-b px-4 py-3",
      className
    )}
    testID={testID}
    {...props}
  >
    {children}
  </View>
);

// ============================================================================
// EnvironmentVariablesTitle
// ============================================================================

export type EnvironmentVariablesTitleProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const EnvironmentVariablesTitle = ({
  className,
  children,
  testID,
  ...props
}: EnvironmentVariablesTitleProps) => (
  <View className={className} testID={testID} {...props}>
    <Text className="font-medium text-sm">
      {children ?? "Environment Variables"}
    </Text>
  </View>
);

// ============================================================================
// EnvironmentVariablesToggle
// ============================================================================

export type EnvironmentVariablesToggleProps = ComponentProps<typeof Switch> & {
  testID?: string;
};

export const EnvironmentVariablesToggle = ({
  className,
  testID,
  ...props
}: EnvironmentVariablesToggleProps) => {
  const { showValues, setShowValues } = useContext(EnvironmentVariablesContext);

  return (
    <View
      className={cn("flex flex-row items-center gap-2", className)}
      testID={testID}
    >
      <Text className="text-muted-foreground text-xs">
        {showValues ? "\uD83D\uDC41" : "\uD83D\uDC41\u200D\uD83D\uDDE8"}
      </Text>
      <Switch
        {...props}
        aria-label="Toggle value visibility"
        checked={showValues}
        onCheckedChange={setShowValues}
      />
    </View>
  );
};

// ============================================================================
// EnvironmentVariablesContent
// ============================================================================

export type EnvironmentVariablesContentProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const EnvironmentVariablesContent = ({
  className,
  children,
  testID,
  ...props
}: EnvironmentVariablesContentProps) => (
  <View className={cn("divide-y", className)} testID={testID} {...props}>
    {children}
  </View>
);

// ============================================================================
// EnvironmentVariable Context
// ============================================================================

interface EnvironmentVariableContextType {
  name: string;
  value: string;
}

const EnvironmentVariableContext =
  createContext<EnvironmentVariableContextType>({
    name: "",
    value: "",
  });

// ============================================================================
// EnvironmentVariable
// ============================================================================

export type EnvironmentVariableProps = ViewProps & {
  name: string;
  value: string;
  children?: ReactNode;
  testID?: string;
};

export const EnvironmentVariable = ({
  name,
  value,
  className,
  children,
  testID,
  ...props
}: EnvironmentVariableProps) => (
  <EnvironmentVariableContext.Provider value={{ name, value }}>
    <View
      className={cn(
        "flex flex-row items-center justify-between gap-4 px-4 py-3",
        className
      )}
      testID={testID}
      {...props}
    >
      {children ?? (
        <>
          <View className="flex flex-row items-center gap-2">
            <EnvironmentVariableName />
          </View>
          <EnvironmentVariableValue />
        </>
      )}
    </View>
  </EnvironmentVariableContext.Provider>
);

// ============================================================================
// EnvironmentVariableGroup
// ============================================================================

export type EnvironmentVariableGroupProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const EnvironmentVariableGroup = ({
  className,
  children,
  testID,
  ...props
}: EnvironmentVariableGroupProps) => (
  <View
    className={cn("flex flex-row items-center gap-2", className)}
    testID={testID}
    {...props}
  >
    {children}
  </View>
);

// ============================================================================
// EnvironmentVariableName
// ============================================================================

export type EnvironmentVariableNameProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const EnvironmentVariableName = ({
  className,
  children,
  testID,
  ...props
}: EnvironmentVariableNameProps) => {
  const { name } = useContext(EnvironmentVariableContext);

  return (
    <View className={className} testID={testID} {...props}>
      <Text className="font-mono text-sm">{children ?? name}</Text>
    </View>
  );
};

// ============================================================================
// EnvironmentVariableValue
// ============================================================================

export type EnvironmentVariableValueProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const EnvironmentVariableValue = ({
  className,
  children,
  testID,
  ...props
}: EnvironmentVariableValueProps) => {
  const { value } = useContext(EnvironmentVariableContext);
  const { showValues } = useContext(EnvironmentVariablesContext);

  const displayValue = showValues
    ? value
    : "\u2022".repeat(Math.min(value.length, 20));

  return (
    <View className={className} testID={testID} {...props}>
      <Text className="font-mono text-muted-foreground text-sm">
        {children ?? displayValue}
      </Text>
    </View>
  );
};

// ============================================================================
// EnvironmentVariableCopyButton
// ============================================================================

export type EnvironmentVariableCopyButtonProps = ComponentProps<
  typeof Button
> & {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
  copyFormat?: "name" | "value" | "export";
  testID?: string;
};

export const EnvironmentVariableCopyButton = ({
  onCopy,
  onError,
  timeout = 2000,
  copyFormat = "value",
  children,
  className,
  testID,
  ...props
}: EnvironmentVariableCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const { name, value } = useContext(EnvironmentVariableContext);

  const copyToClipboard = async () => {
    let textToCopy = value;
    if (copyFormat === "name") {
      textToCopy = name;
    } else if (copyFormat === "export") {
      textToCopy = `export ${name}="${value}"`;
    }

    try {
      await Clipboard.setStringAsync(textToCopy);
      setIsCopied(true);
      onCopy?.();
      setTimeout(() => setIsCopied(false), timeout);
    } catch (error) {
      onError?.(error as Error);
    }
  };

  return (
    <Button
      className={cn("size-6 shrink-0", className)}
      onPress={copyToClipboard}
      size="icon"
      variant="ghost"
      {...(testID ? { testID } : {})}
      {...props}
    >
      {children ?? (
        <Text className="text-xs">
          {isCopied ? "\u2713" : "\u2398"}
        </Text>
      )}
    </Button>
  );
};

// ============================================================================
// EnvironmentVariableRequired
// ============================================================================

export type EnvironmentVariableRequiredProps = ComponentProps<typeof Badge> & {
  testID?: string;
};

export const EnvironmentVariableRequired = ({
  className,
  children,
  testID,
  ...props
}: EnvironmentVariableRequiredProps) => (
  <Badge
    className={cn("text-xs", className)}
    variant="secondary"
    {...(testID ? { testID } : {})}
    {...props}
  >
    {children ?? "Required"}
  </Badge>
);
