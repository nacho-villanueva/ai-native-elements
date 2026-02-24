import { View, Text, ScrollView } from "react-native";
import { Shimmer } from "@ai-native-elements/react-native";

export default function ShimmerPage() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-6">
        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Default
          </Text>
          <View className="bg-card border border-border rounded-lg p-4">
            <View testID="shimmer-default" className="gap-3">
              <Shimmer testID="shimmer-loading">Loading content...</Shimmer>
              <Shimmer testID="shimmer-generating" className="text-lg">Generating response...</Shimmer>
              <Shimmer testID="shimmer-processing" className="text-xl">Processing request...</Shimmer>
            </View>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Different Durations
          </Text>
          <View className="bg-card border border-border rounded-lg p-4">
            <View testID="shimmer-durations" className="gap-3">
              <Shimmer testID="shimmer-fast" duration={1000}>Fast (1s)</Shimmer>
              <Shimmer testID="shimmer-normal" duration={2000}>Normal (2s)</Shimmer>
              <Shimmer testID="shimmer-slow" duration={4000}>Slow (4s)</Shimmer>
            </View>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Custom Colors
          </Text>
          <View className="bg-card border border-border rounded-lg p-4">
            <View testID="shimmer-colors" className="gap-3">
              <Shimmer testID="shimmer-blue" baseColor="#2563eb" highlightColor="#93c5fd">
                Blue shimmer
              </Shimmer>
              <Shimmer testID="shimmer-green" baseColor="#16a34a" highlightColor="#86efac">
                Green shimmer
              </Shimmer>
              <Shimmer testID="shimmer-purple" baseColor="#9333ea" highlightColor="#d8b4fe">
                Purple shimmer
              </Shimmer>
            </View>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Usage
          </Text>
          <View className="bg-muted rounded-lg p-4">
            <Text className="text-sm text-muted-foreground font-mono">
              {`import { Shimmer } from "@ai-native-elements/react-native";

<Shimmer duration={2000}>
  Loading...
</Shimmer>`}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
