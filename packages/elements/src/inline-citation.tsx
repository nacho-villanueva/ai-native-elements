"use client";

import {
  View,
  type ViewProps,
  ScrollView,
  type ScrollViewProps,
  Pressable,
  type PressableProps,
} from "react-native";
import {
  Badge,
  type BadgeProps,
  Text,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@ai-native-elements/shadcn-ui";
import { cn } from "./utils";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

// ============================================================================
// InlineCitation
// ============================================================================

export type InlineCitationProps = ViewProps;

export const InlineCitation = ({
  className,
  ...props
}: InlineCitationProps) => (
  <View
    className={cn("flex-row flex-wrap items-center gap-1", className)}
    {...props}
  />
);

// ============================================================================
// InlineCitationText
// ============================================================================

export type InlineCitationTextProps = {
  className?: string;
  children?: ReactNode;
  testID?: string;
};

export const InlineCitationText = ({
  className,
  children,
  testID,
}: InlineCitationTextProps) => (
  <Text className={cn("text-sm text-foreground", className)} testID={testID}>
    {children}
  </Text>
);

// ============================================================================
// InlineCitationCard — Dialog-based (no hover on mobile)
// ============================================================================

export type InlineCitationCardProps = {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  testID?: string;
};

export const InlineCitationCard = ({
  children,
  open,
  onOpenChange,
  testID,
}: InlineCitationCardProps) => (
  <View testID={testID}>
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog>
  </View>
);

// ============================================================================
// InlineCitationCardTrigger
// ============================================================================

export type InlineCitationCardTriggerProps = BadgeProps & {
  sources: string[];
};

const getHostname = (url: string): string => {
  try {
    // Extract hostname with regex to avoid URL API type issues in RN tsconfig
    const match = url.match(/^(?:https?:\/\/)?([^/?#]+)/);
    return match?.[1] ?? url;
  } catch {
    return url;
  }
};

export const InlineCitationCardTrigger = ({
  sources,
  className,
  ...props
}: InlineCitationCardTriggerProps) => (
  <DialogTrigger asChild>
    <Badge
      className={cn("ml-1 rounded-full", className)}
      variant="secondary"
      {...props}
    >
      <Text className="text-xs text-secondary-foreground">
        {sources[0]
          ? `${getHostname(sources[0])}${sources.length > 1 ? ` +${sources.length - 1}` : ""}`
          : "unknown"}
      </Text>
    </Badge>
  </DialogTrigger>
);

// ============================================================================
// InlineCitationCardBody
// ============================================================================

export type InlineCitationCardBodyProps = ViewProps;

export const InlineCitationCardBody = ({
  className,
  ...props
}: InlineCitationCardBodyProps) => (
  <DialogContent className={cn("w-full max-w-sm p-0", className)} {...props} />
);

// ============================================================================
// Carousel context — tracks scroll position for index display
// ============================================================================

interface CarouselContextValue {
  scrollRef: React.RefObject<ScrollView | null>;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  itemWidth: number;
  setItemWidth: (width: number) => void;
}

const CarouselContext = createContext<CarouselContextValue | undefined>(
  undefined
);

const useCarouselContext = () => {
  const ctx = useContext(CarouselContext);
  return ctx;
};

// ============================================================================
// InlineCitationCarousel
// ============================================================================

export type InlineCitationCarouselProps = ViewProps;

export const InlineCitationCarousel = ({
  className,
  children,
  ...props
}: InlineCitationCarouselProps) => {
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

  return (
    <CarouselContext.Provider
      value={{ scrollRef, currentIndex, setCurrentIndex, itemWidth, setItemWidth }}
    >
      <View className={cn("w-full", className)} {...props}>
        {children}
      </View>
    </CarouselContext.Provider>
  );
};

// ============================================================================
// InlineCitationCarouselContent
// ============================================================================

export type InlineCitationCarouselContentProps = ScrollViewProps;

export const InlineCitationCarouselContent = ({
  className,
  onLayout,
  ...props
}: InlineCitationCarouselContentProps) => {
  const ctx = useCarouselContext();

  const handleLayout = useCallback(
    (e: { nativeEvent: { layout: { width: number } } }) => {
      ctx?.setItemWidth(e.nativeEvent.layout.width);
      onLayout?.(e as Parameters<NonNullable<typeof onLayout>>[0]);
    },
    [ctx, onLayout]
  );

  const handleScroll = useCallback(
    (e: { nativeEvent: { contentOffset: { x: number } } }) => {
      if (ctx && ctx.itemWidth > 0) {
        const idx = Math.round(
          e.nativeEvent.contentOffset.x / ctx.itemWidth
        );
        ctx.setCurrentIndex(idx);
      }
    },
    [ctx]
  );

  return (
    <ScrollView
      ref={ctx?.scrollRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      onLayout={handleLayout}
      className={cn("flex-row", className)}
      {...props}
    />
  );
};

// ============================================================================
// InlineCitationCarouselItem
// ============================================================================

export type InlineCitationCarouselItemProps = ViewProps;

export const InlineCitationCarouselItem = ({
  className,
  ...props
}: InlineCitationCarouselItemProps) => {
  const ctx = useCarouselContext();

  return (
    <View
      className={cn("gap-2 p-4", className)}
      style={ctx?.itemWidth ? { width: ctx.itemWidth } : undefined}
      {...props}
    />
  );
};

// ============================================================================
// InlineCitationCarouselHeader
// ============================================================================

export type InlineCitationCarouselHeaderProps = ViewProps;

export const InlineCitationCarouselHeader = ({
  className,
  ...props
}: InlineCitationCarouselHeaderProps) => (
  <View
    className={cn(
      "flex-row items-center justify-between gap-2 rounded-t-md bg-secondary p-2",
      className
    )}
    {...props}
  />
);

// ============================================================================
// InlineCitationCarouselIndex
// ============================================================================

export type InlineCitationCarouselIndexProps = ViewProps & {
  children?: ReactNode;
};

export const InlineCitationCarouselIndex = ({
  children,
  className,
  ...props
}: InlineCitationCarouselIndexProps) => {
  const ctx = useCarouselContext();
  // We don't know total count easily from context; expose via children or derive from scroll
  // Default display: currentIndex + 1
  const display = children ?? (
    <Text className="text-xs text-muted-foreground">
      {(ctx?.currentIndex ?? 0) + 1}
    </Text>
  );

  return (
    <View
      className={cn("flex-1 items-end justify-center px-3 py-1", className)}
      {...props}
    >
      {display}
    </View>
  );
};

// ============================================================================
// InlineCitationCarouselPrev
// ============================================================================

export type InlineCitationCarouselPrevProps = PressableProps;

export const InlineCitationCarouselPrev = ({
  className,
  ...props
}: InlineCitationCarouselPrevProps) => {
  const ctx = useCarouselContext();

  const handlePress = useCallback(() => {
    if (ctx && ctx.currentIndex > 0) {
      const nextIndex = ctx.currentIndex - 1;
      ctx.scrollRef.current?.scrollTo({
        x: nextIndex * ctx.itemWidth,
        animated: true,
      });
      ctx.setCurrentIndex(nextIndex);
    }
  }, [ctx]);

  return (
    <Pressable
      accessibilityLabel="Previous"
      onPress={handlePress}
      className={cn("shrink-0 p-1", className)}
      {...props}
    >
      <Text className="text-sm text-muted-foreground">{"←"}</Text>
    </Pressable>
  );
};

// ============================================================================
// InlineCitationCarouselNext
// ============================================================================

export type InlineCitationCarouselNextProps = PressableProps;

export const InlineCitationCarouselNext = ({
  className,
  ...props
}: InlineCitationCarouselNextProps) => {
  const ctx = useCarouselContext();

  const handlePress = useCallback(() => {
    if (ctx) {
      const nextIndex = ctx.currentIndex + 1;
      ctx.scrollRef.current?.scrollTo({
        x: nextIndex * ctx.itemWidth,
        animated: true,
      });
      ctx.setCurrentIndex(nextIndex);
    }
  }, [ctx]);

  return (
    <Pressable
      accessibilityLabel="Next"
      onPress={handlePress}
      className={cn("shrink-0 p-1", className)}
      {...props}
    >
      <Text className="text-sm text-muted-foreground">{"→"}</Text>
    </Pressable>
  );
};

// ============================================================================
// InlineCitationSource
// ============================================================================

export type InlineCitationSourceProps = ViewProps & {
  title?: string;
  url?: string;
  description?: string;
};

export const InlineCitationSource = ({
  title,
  url,
  description,
  className,
  children,
  ...props
}: InlineCitationSourceProps) => (
  <View className={cn("gap-1", className)} {...props}>
    {title && (
      <Text
        className="text-sm font-medium leading-tight text-foreground"
        numberOfLines={1}
      >
        {title}
      </Text>
    )}
    {url && (
      <Text
        className="text-xs text-muted-foreground"
        numberOfLines={1}
      >
        {url}
      </Text>
    )}
    {description && (
      <Text
        className="text-sm leading-relaxed text-muted-foreground"
        numberOfLines={3}
      >
        {description}
      </Text>
    )}
    {children}
  </View>
);

// ============================================================================
// InlineCitationQuote
// ============================================================================

export type InlineCitationQuoteProps = ViewProps;

export const InlineCitationQuote = ({
  children,
  className,
  ...props
}: InlineCitationQuoteProps) => (
  <View
    className={cn("border-l-2 border-muted pl-3", className)}
    {...props}
  >
    <Text className="text-sm italic text-muted-foreground">{children}</Text>
  </View>
);
