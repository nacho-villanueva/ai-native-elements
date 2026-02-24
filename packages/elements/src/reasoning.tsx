import { View, type ViewProps } from "react-native";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Text,
} from "@ai-native-elements/shadcn-ui";
import { cn } from "./utils";
import { Shimmer } from "./shimmer";
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
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

interface ReasoningContextValue {
  isStreaming: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  duration: number | undefined;
}

const ReasoningContext = createContext<ReasoningContextValue | null>(null);

export const useReasoning = () => {
  const context = useContext(ReasoningContext);
  if (!context) {
    throw new Error("Reasoning components must be used within Reasoning");
  }
  return context;
};

// ============================================================================
// Reasoning
// ============================================================================

export type ReasoningProps = ViewProps & {
  isStreaming?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  duration?: number;
  children?: ReactNode;
  testID?: string;
};

const AUTO_CLOSE_DELAY = 1000;
const MS_IN_S = 1000;

export const Reasoning = memo(
  ({
    className,
    isStreaming = false,
    open,
    defaultOpen = true,
    onOpenChange,
    duration: durationProp,
    children,
    testID,
    ...props
  }: ReasoningProps) => {
    const [isOpen, setIsOpen] = useControllableState({
      prop: open,
      defaultProp: defaultOpen,
      onChange: onOpenChange,
    });
    const [duration, setDuration] = useControllableState<number | undefined>({
      prop: durationProp,
      defaultProp: undefined,
    });

    const [hasAutoClosed, setHasAutoClosed] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);

    // Track duration when streaming starts and ends
    useEffect(() => {
      if (isStreaming) {
        if (startTime === null) {
          setStartTime(Date.now());
        }
      } else if (startTime !== null) {
        setDuration(Math.ceil((Date.now() - startTime) / MS_IN_S));
        setStartTime(null);
      }
    }, [isStreaming, startTime, setDuration]);

    // Auto-close when streaming ends (once only)
    useEffect(() => {
      if (defaultOpen && !isStreaming && isOpen && !hasAutoClosed) {
        const timer = setTimeout(() => {
          setIsOpen(false);
          setHasAutoClosed(true);
        }, AUTO_CLOSE_DELAY);

        return () => clearTimeout(timer);
      }
    }, [isStreaming, isOpen, defaultOpen, setIsOpen, hasAutoClosed]);

    const handleOpenChange = (newOpen: boolean) => {
      setIsOpen(newOpen);
    };

    return (
      <ReasoningContext.Provider
        value={{ isStreaming, isOpen: isOpen ?? defaultOpen, setIsOpen, duration }}
      >
        <Collapsible
          className={cn("mb-4", className)}
          onOpenChange={handleOpenChange}
          open={isOpen ?? defaultOpen}
          {...props}
          testID={testID}
        >
          {children}
        </Collapsible>
      </ReasoningContext.Provider>
    );
  }
);

// ============================================================================
// ReasoningTrigger
// ============================================================================

export type ReasoningTriggerProps = ViewProps & {
  getThinkingMessage?: (isStreaming: boolean, duration?: number) => ReactNode;
  children?: ReactNode;
  testID?: string;
};

const defaultGetThinkingMessage = (
  isStreaming: boolean,
  duration?: number
): ReactNode => {
  if (isStreaming || duration === 0) {
    return <Shimmer duration={1000}>Thinking...</Shimmer>;
  }
  if (duration === undefined) {
    return <Text>Thought for a few seconds</Text>;
  }
  return <Text>Thought for {duration} seconds</Text>;
};

export const ReasoningTrigger = memo(
  ({
    className,
    children,
    getThinkingMessage = defaultGetThinkingMessage,
    testID,
    ...props
  }: ReasoningTriggerProps) => {
    const { isStreaming, isOpen, duration } = useReasoning();

    return (
      <CollapsibleTrigger
        className={cn(
          "flex w-full flex-row items-center gap-2 text-sm",
          className
        )}
        testID={testID}
      >
        {children ?? (
          <>
            {/* Brain icon */}
            <Text className="text-muted-foreground">🧠</Text>
            <View className="flex-1">
              {getThinkingMessage(isStreaming, duration)}
            </View>
            {/* Chevron */}
            <Text
              className={cn(
                "text-muted-foreground",
                isOpen ? "rotate-180" : "rotate-0"
              )}
            >
              {"\u25BE"}
            </Text>
          </>
        )}
      </CollapsibleTrigger>
    );
  }
);

// ============================================================================
// ReasoningContent
// ============================================================================

export type ReasoningContentProps = ViewProps & {
  children: string;
  testID?: string;
};

export const ReasoningContent = memo(
  ({ className, children, testID, ...props }: ReasoningContentProps) => (
    <CollapsibleContent
      className={cn("mt-4", className)}
      testID={testID}
      {...props}
    >
      <Text className="text-sm text-muted-foreground">{children}</Text>
    </CollapsibleContent>
  )
);

Reasoning.displayName = "Reasoning";
ReasoningTrigger.displayName = "ReasoningTrigger";
ReasoningContent.displayName = "ReasoningContent";
