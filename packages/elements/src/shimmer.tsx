import { useEffect, useState } from "react";
import { Text, View, type TextProps, type LayoutChangeEvent } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { cn } from "./utils";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export interface ShimmerProps extends Omit<TextProps, "children"> {
  children: string;
  className?: string;
  duration?: number;
  baseColor?: string;
  highlightColor?: string;
}

export function Shimmer({
  children,
  className,
  duration = 2000,
  baseColor = "#71717a", // muted-foreground
  highlightColor = "#fafafa", // background/highlight
  style,
  ...props
}: ShimmerProps) {
  const [textWidth, setTextWidth] = useState(0);
  const translateX = useSharedValue(-1);

  const handleLayout = (event: LayoutChangeEvent) => {
    setTextWidth(event.nativeEvent.layout.width);
  };

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(1, {
        duration,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [duration, translateX]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value * textWidth }],
    };
  });

  return (
    <View onLayout={handleLayout} style={{ alignSelf: "flex-start" }}>
      <MaskedView
        maskElement={
          <Text className={cn("text-base", className)} style={style} {...props}>
            {children}
          </Text>
        }
      >
        {/* Base color layer */}
        <Text
          className={cn("text-base opacity-0", className)}
          style={style}
          {...props}
        >
          {children}
        </Text>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: baseColor,
          }}
        />
        {/* Animated highlight gradient */}
        <AnimatedLinearGradient
          colors={["transparent", highlightColor, "transparent"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[
            {
              position: "absolute",
              top: 0,
              bottom: 0,
              width: textWidth * 0.5,
              left: -textWidth * 0.25,
            },
            animatedStyle,
          ]}
        />
      </MaskedView>
    </View>
  );
}
