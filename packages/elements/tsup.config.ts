import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/components/**/*.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    "react",
    "react-native",
    "nativewind",
    "react-native-reanimated",
    "react-native-safe-area-context",
  ],
  treeshake: true,
  minify: false,
});
