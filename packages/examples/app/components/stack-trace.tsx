import { View, Text, ScrollView } from "react-native";

// TODO: Import from @ai-native-elements/react-native once stack-trace component is available
// import { StackTrace, StackTraceHeader, StackTraceError, ... } from "@ai-native-elements/react-native";

export default function StackTracePage() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-6">
        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            TypeError Stack Trace
          </Text>
          <View className="rounded-lg border bg-background overflow-hidden">
            <View className="flex-row items-center justify-between px-4 py-3 border-b">
              <View className="flex-1">
                <Text className="text-xs font-mono font-semibold text-red-600 dark:text-red-400">
                  TypeError
                </Text>
                <Text className="text-sm text-foreground mt-0.5">
                  Cannot read properties of undefined (reading 'map')
                </Text>
              </View>
            </View>
            <View className="p-4 gap-2">
              {[
                { fn: "MessageList", file: "src/components/MessageList.tsx", line: 42 },
                { fn: "Conversation", file: "src/components/Conversation.tsx", line: 28 },
                { fn: "App", file: "App.tsx", line: 15 },
              ].map((frame, i) => (
                <View key={i} className="flex-row items-start gap-3">
                  <Text className="font-mono text-xs text-muted-foreground w-4">{i + 1}</Text>
                  <View>
                    <Text className="font-mono text-xs text-foreground font-medium">{frame.fn}</Text>
                    <Text className="font-mono text-xs text-muted-foreground">
                      {frame.file}:{frame.line}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            ReferenceError Stack Trace
          </Text>
          <View className="rounded-lg border bg-background overflow-hidden">
            <View className="flex-row items-center justify-between px-4 py-3 border-b">
              <View className="flex-1">
                <Text className="text-xs font-mono font-semibold text-orange-600 dark:text-orange-400">
                  ReferenceError
                </Text>
                <Text className="text-sm text-foreground mt-0.5">
                  fetchData is not defined
                </Text>
              </View>
            </View>
            <View className="p-4 gap-2">
              {[
                { fn: "useMessages", file: "src/hooks/useMessages.ts", line: 67 },
                { fn: "ChatPage", file: "src/pages/ChatPage.tsx", line: 12 },
              ].map((frame, i) => (
                <View key={i} className="flex-row items-start gap-3">
                  <Text className="font-mono text-xs text-muted-foreground w-4">{i + 1}</Text>
                  <View>
                    <Text className="font-mono text-xs text-foreground font-medium">{frame.fn}</Text>
                    <Text className="font-mono text-xs text-muted-foreground">
                      {frame.file}:{frame.line}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Usage
          </Text>
          <View className="bg-muted rounded-lg p-4">
            <Text className="text-sm text-muted-foreground font-mono">
              {`import { StackTrace } from "@ai-native-elements/react-native";

<StackTrace>
  <StackTraceHeader>
    <StackTraceError>
      <StackTraceErrorType>TypeError</StackTraceErrorType>
      <StackTraceErrorMessage>
        Cannot read properties of undefined
      </StackTraceErrorMessage>
    </StackTraceError>
  </StackTraceHeader>
  <StackTraceContent>
    <StackTraceFrames frames={frames} />
  </StackTraceContent>
</StackTrace>`}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
