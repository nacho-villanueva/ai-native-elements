import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { useTheme } from "./_layout";

const components = [
  { name: "Loader", href: "/components/loader", description: "Spinning loading indicator", testID: "card-loader" },
  { name: "Shimmer", href: "/components/shimmer", description: "Animated text loading placeholder", testID: "card-shimmer" },
  { name: "Suggestion", href: "/components/suggestion", description: "Quick suggestion chips", testID: "card-suggestion" },
  { name: "Prompt Input", href: "/components/prompt-input", description: "AI chat input with attachments", testID: "card-prompt-input" },
];

export default function Home() {
  const { darkMode } = useTheme();

  return (
    <View className="flex-1 bg-background p-4">
      <View className="mb-6">
        <Text className="text-2xl font-bold text-foreground mb-2">
          Components
        </Text>
        <Text className="text-muted-foreground">
          React Native port of Vercel AI Elements
        </Text>
      </View>

      <View className="gap-3">
        {components.map((component) => (
          <Link key={component.name} href={component.href as any} asChild>
            <Pressable testID={component.testID} className="bg-card border border-border rounded-lg p-4 active:opacity-70">
              <Text className="text-lg font-semibold text-card-foreground">
                {component.name}
              </Text>
              <Text className="text-sm text-muted-foreground mt-1">
                {component.description}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>

      <View className="mt-6 p-4 border border-dashed border-muted-foreground rounded-lg">
        <Text className="text-muted-foreground text-center">
          More components coming soon...
        </Text>
      </View>
    </View>
  );
}
