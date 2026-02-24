import { View, Text, ScrollView } from "react-native";
import { Loader } from "@ai-native-elements/react-native";
import { useTheme } from "../_layout";

export default function LoaderPage() {
  const { darkMode } = useTheme();
  const color = darkMode ? "#fafafa" : "#09090b";

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-6">
        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Sizes
          </Text>
          <View className="bg-card border border-border rounded-lg p-4">
            <View testID="loader-sizes" className="flex-row items-center gap-6">
              <View className="items-center gap-2">
                <Loader testID="loader-16" size={16} color={color} />
                <Text className="text-xs text-muted-foreground">16px</Text>
              </View>
              <View className="items-center gap-2">
                <Loader testID="loader-24" size={24} color={color} />
                <Text className="text-xs text-muted-foreground">24px</Text>
              </View>
              <View className="items-center gap-2">
                <Loader testID="loader-32" size={32} color={color} />
                <Text className="text-xs text-muted-foreground">32px</Text>
              </View>
              <View className="items-center gap-2">
                <Loader testID="loader-48" size={48} color={color} />
                <Text className="text-xs text-muted-foreground">48px</Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Colors
          </Text>
          <View className="bg-card border border-border rounded-lg p-4">
            <View testID="loader-colors" className="flex-row items-center gap-6">
              <View className="items-center gap-2">
                <Loader testID="loader-blue" size={24} color="#2563eb" />
                <Text className="text-xs text-muted-foreground">Blue</Text>
              </View>
              <View className="items-center gap-2">
                <Loader testID="loader-green" size={24} color="#16a34a" />
                <Text className="text-xs text-muted-foreground">Green</Text>
              </View>
              <View className="items-center gap-2">
                <Loader testID="loader-red" size={24} color="#dc2626" />
                <Text className="text-xs text-muted-foreground">Red</Text>
              </View>
              <View className="items-center gap-2">
                <Loader testID="loader-purple" size={24} color="#9333ea" />
                <Text className="text-xs text-muted-foreground">Purple</Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Usage
          </Text>
          <View className="bg-muted rounded-lg p-4">
            <Text className="text-sm text-muted-foreground font-mono">
              {`import { Loader } from "@ai-native-elements/react-native";

<Loader size={24} color="#2563eb" />`}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
