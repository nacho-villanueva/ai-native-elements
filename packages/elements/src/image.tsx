"use client";

import {
  Image as RNImage,
  type ImageProps as RNImageProps,
} from "react-native";
import { cn } from "./utils";

// ============================================================================
// Types
// ============================================================================

export type ImageProps = {
  base64?: string;
  uint8Array?: Uint8Array;
  mediaType?: string;
  className?: string;
  alt?: string;
  testID?: string;
} & Omit<RNImageProps, "source">;

// ============================================================================
// Image
// ============================================================================

export const Image = ({
  base64,
  uint8Array,
  mediaType,
  className,
  alt,
  testID,
  style,
  ...props
}: ImageProps) => (
  <RNImage
    accessibilityLabel={alt}
    className={cn("h-auto max-w-full overflow-hidden rounded-md", className)}
    resizeMode="contain"
    source={{ uri: `data:${mediaType ?? "image/png"};base64,${base64}` }}
    testID={testID}
    {...props}
  />
);
