import { View, type ViewProps } from "react-native";
import {
  Badge,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Text,
} from "@ai-native-elements/shadcn-ui";
import { cn } from "./utils";
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

// ============================================================================
// useControllableState (inline replacement for @radix-ui/react-use-controllable-state)
// ============================================================================

function useControllableState<T>({
  prop,
  defaultProp,
  onChange,
}: {
  prop?: T;
  defaultProp?: T;
  onChange?: (value: T) => void;
}) {
  const [uncontrolled, setUncontrolled] = useState(defaultProp);
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolled;
  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );
  return [value, setValue] as const;
}

// ============================================================================
// Context
// ============================================================================

interface ChainOfThoughtContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ChainOfThoughtContext =
  createContext<ChainOfThoughtContextValue | null>(null);

const useChainOfThought = () => {
  const context = useContext(ChainOfThoughtContext);
  if (!context) {
    throw new Error(
      "ChainOfThought components must be used within ChainOfThought"
    );
  }
  return context;
};

// ============================================================================
// ChainOfThought
// ============================================================================

export type ChainOfThoughtProps = ViewProps & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
  testID?: string;
};

export const ChainOfThought = memo(
  ({
    className,
    open,
    defaultOpen = false,
    onOpenChange,
    children,
    testID,
    ...props
  }: ChainOfThoughtProps) => {
    const [isOpen, setIsOpen] = useControllableState({
      prop: open,
      defaultProp: defaultOpen,
      onChange: onOpenChange,
    });

    const chainOfThoughtContext = useMemo(
      () => ({ isOpen: isOpen ?? defaultOpen, setIsOpen }),
      [isOpen, defaultOpen, setIsOpen]
    );

    return (
      <ChainOfThoughtContext.Provider value={chainOfThoughtContext}>
        <View
          className={cn("max-w-prose space-y-4", className)}
          testID={testID}
          {...props}
        >
          {children}
        </View>
      </ChainOfThoughtContext.Provider>
    );
  }
);

// ============================================================================
// ChainOfThoughtHeader
// ============================================================================

export type ChainOfThoughtHeaderProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const ChainOfThoughtHeader = memo(
  ({ className, children, testID, ...props }: ChainOfThoughtHeaderProps) => {
    const { isOpen, setIsOpen } = useChainOfThought();

    return (
      <Collapsible onOpenChange={setIsOpen} open={isOpen} testID={testID}>
        <CollapsibleTrigger
          className={cn(
            "flex w-full flex-row items-center gap-2 text-sm",
            className
          )}
        >
          {/* Brain icon */}
          <Text className="text-muted-foreground">🧠</Text>
          <Text className="flex-1 text-left text-muted-foreground">
            {children ?? "Chain of Thought"}
          </Text>
          {/* Chevron */}
          <Text
            className={cn(
              "text-muted-foreground",
              isOpen ? "rotate-180" : "rotate-0"
            )}
          >
            {"\u25BE"}
          </Text>
        </CollapsibleTrigger>
      </Collapsible>
    );
  }
);

// ============================================================================
// ChainOfThoughtStep
// ============================================================================

export type ChainOfThoughtStepProps = ViewProps & {
  icon?: ReactNode;
  label: ReactNode;
  description?: ReactNode;
  status?: "complete" | "active" | "pending";
  children?: ReactNode;
  testID?: string;
};

export const ChainOfThoughtStep = memo(
  ({
    className,
    icon,
    label,
    description,
    status = "complete",
    children,
    testID,
    ...props
  }: ChainOfThoughtStepProps) => {
    const statusStyles = {
      complete: "text-muted-foreground",
      active: "text-foreground",
      pending: "text-muted-foreground opacity-50",
    };

    const defaultIcon = <Text className="text-sm">•</Text>;

    return (
      <View
        className={cn("flex-row gap-2 text-sm", className)}
        testID={testID}
        {...props}
      >
        <View className="relative mt-0.5">
          {icon ?? defaultIcon}
          {/* Vertical connector line */}
          <View
            className="absolute left-1/2 bottom-0 w-px bg-border"
            style={{ top: 28, marginLeft: -0.5 }}
          />
        </View>
        <View className="flex-1 space-y-2 overflow-hidden">
          <Text className={cn("text-sm", statusStyles[status])}>{label}</Text>
          {description && (
            <Text className="text-xs text-muted-foreground">{description}</Text>
          )}
          {children}
        </View>
      </View>
    );
  }
);

// ============================================================================
// ChainOfThoughtSearchResults
// ============================================================================

export type ChainOfThoughtSearchResultsProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const ChainOfThoughtSearchResults = memo(
  ({
    className,
    testID,
    ...props
  }: ChainOfThoughtSearchResultsProps) => (
    <View
      className={cn("flex-row flex-wrap items-center gap-2", className)}
      testID={testID}
      {...props}
    />
  )
);

// ============================================================================
// ChainOfThoughtSearchResult
// ============================================================================

export type ChainOfThoughtSearchResultProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const ChainOfThoughtSearchResult = memo(
  ({
    className,
    children,
    testID,
    ...props
  }: ChainOfThoughtSearchResultProps) => (
    <Badge
      className={cn("gap-1 px-2 py-0.5", className)}
      variant="secondary"
      testID={testID}
      {...props}
    >
      <Text className="font-normal text-xs text-secondary-foreground">
        {children}
      </Text>
    </Badge>
  )
);

// ============================================================================
// ChainOfThoughtContent
// ============================================================================

export type ChainOfThoughtContentProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const ChainOfThoughtContent = memo(
  ({ className, children, testID, ...props }: ChainOfThoughtContentProps) => {
    const { isOpen } = useChainOfThought();

    return (
      <Collapsible open={isOpen} testID={testID}>
        <CollapsibleContent
          className={cn("mt-2 space-y-3", className)}
          {...props}
        >
          {children}
        </CollapsibleContent>
      </Collapsible>
    );
  }
);

// ============================================================================
// ChainOfThoughtImage
// ============================================================================

export type ChainOfThoughtImageProps = ViewProps & {
  caption?: string;
  children?: ReactNode;
  testID?: string;
};

export const ChainOfThoughtImage = memo(
  ({
    className,
    children,
    caption,
    testID,
    ...props
  }: ChainOfThoughtImageProps) => (
    <View className={cn("mt-2 space-y-2", className)} testID={testID} {...props}>
      <View className="relative flex max-h-88 items-center justify-center overflow-hidden rounded-lg bg-muted p-3">
        {children}
      </View>
      {caption && (
        <Text className="text-xs text-muted-foreground">{caption}</Text>
      )}
    </View>
  )
);

ChainOfThought.displayName = "ChainOfThought";
ChainOfThoughtHeader.displayName = "ChainOfThoughtHeader";
ChainOfThoughtStep.displayName = "ChainOfThoughtStep";
ChainOfThoughtSearchResults.displayName = "ChainOfThoughtSearchResults";
ChainOfThoughtSearchResult.displayName = "ChainOfThoughtSearchResult";
ChainOfThoughtContent.displayName = "ChainOfThoughtContent";
ChainOfThoughtImage.displayName = "ChainOfThoughtImage";
