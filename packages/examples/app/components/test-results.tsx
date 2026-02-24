import { View, Text, ScrollView } from "react-native";

// TODO: Import from @ai-native-elements/react-native once test-results component is available
// import { TestResults, TestSuite, Test, ... } from "@ai-native-elements/react-native";

export default function TestResultsPage() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-6">
        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Test Results — Passing
          </Text>
          <View className="rounded-lg border bg-background overflow-hidden">
            <View className="flex-row items-center justify-between px-4 py-3 border-b">
              <Text className="font-medium text-sm text-foreground">Test Results</Text>
              <View className="flex-row items-center gap-3">
                <Text className="text-xs text-green-600 dark:text-green-400 font-medium">
                  12 passed
                </Text>
                <Text className="text-xs text-muted-foreground">1.23s</Text>
              </View>
            </View>
            <View className="px-4 py-2">
              <View className="h-1.5 rounded-full bg-muted overflow-hidden mb-3">
                <View className="h-full bg-green-500 rounded-full" style={{ width: "100%" }} />
              </View>
              <View className="gap-1">
                {["renders correctly", "handles press events", "applies className", "accepts testID"].map((name) => (
                  <View key={name} className="flex-row items-center gap-2 py-1">
                    <Text className="text-xs text-green-600 dark:text-green-400">✓</Text>
                    <Text className="text-xs text-foreground">{name}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Test Results — With Failures
          </Text>
          <View className="rounded-lg border bg-background overflow-hidden">
            <View className="flex-row items-center justify-between px-4 py-3 border-b">
              <Text className="font-medium text-sm text-foreground">Test Results</Text>
              <View className="flex-row items-center gap-3">
                <Text className="text-xs text-green-600 dark:text-green-400 font-medium">8 passed</Text>
                <Text className="text-xs text-red-600 dark:text-red-400 font-medium">2 failed</Text>
                <Text className="text-xs text-muted-foreground">0.89s</Text>
              </View>
            </View>
            <View className="px-4 py-2">
              <View className="h-1.5 rounded-full bg-muted overflow-hidden mb-3">
                <View className="h-full bg-red-500 rounded-full" style={{ width: "20%" }} />
              </View>
              <View className="gap-1">
                <View className="flex-row items-center gap-2 py-1">
                  <Text className="text-xs text-red-600 dark:text-red-400">✕</Text>
                  <Text className="text-xs text-foreground">should handle edge case</Text>
                </View>
                <View className="rounded bg-muted p-2 ml-4 mb-1">
                  <Text className="text-xs font-mono text-muted-foreground">
                    Expected: true{"\n"}Received: false
                  </Text>
                </View>
                <View className="flex-row items-center gap-2 py-1">
                  <Text className="text-xs text-green-600 dark:text-green-400">✓</Text>
                  <Text className="text-xs text-foreground">renders with default props</Text>
                </View>
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
              {`import { TestResults, TestSuite, Test } from "@ai-native-elements/react-native";

<TestResults>
  <TestResultsHeader>
    <TestResultsSummary passed={12} failed={0} />
    <TestResultsDuration>1.23s</TestResultsDuration>
  </TestResultsHeader>
  <TestResultsContent>
    <TestSuite name="Button.test.tsx">
      <Test status="passed" name="renders correctly" />
    </TestSuite>
  </TestResultsContent>
</TestResults>`}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
