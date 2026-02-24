import { View, Text, ScrollView } from "react-native";

// TODO: Import from @ai-native-elements/react-native once schema-display component is available
// import { SchemaDisplay, SchemaDisplayHeader, ... } from "@ai-native-elements/react-native";

export default function SchemaDisplayPage() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-6">
        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Schema Display
          </Text>
          <View className="rounded-lg border bg-background p-4">
            <View className="flex-row items-center gap-2 mb-3">
              <View className="rounded px-2 py-1 bg-green-100 dark:bg-green-900/30">
                <Text className="text-xs font-mono font-bold text-green-700 dark:text-green-400">
                  GET
                </Text>
              </View>
              <Text className="font-mono text-sm text-foreground">/api/users/:id</Text>
            </View>
            <Text className="text-sm text-muted-foreground mb-3">
              Retrieve a user by their unique identifier
            </Text>
            <View className="border-t pt-3">
              <Text className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Parameters
              </Text>
              <View className="gap-2">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    <Text className="font-mono text-sm text-foreground">id</Text>
                    <View className="rounded px-1.5 py-0.5 bg-secondary">
                      <Text className="text-xs text-secondary-foreground">string</Text>
                    </View>
                    <View className="rounded px-1.5 py-0.5 bg-red-100 dark:bg-red-900/30">
                      <Text className="text-xs text-red-700 dark:text-red-400">required</Text>
                    </View>
                  </View>
                </View>
                <Text className="text-xs text-muted-foreground pl-4">
                  The unique identifier for the user
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            POST Endpoint
          </Text>
          <View className="rounded-lg border bg-background p-4">
            <View className="flex-row items-center gap-2 mb-3">
              <View className="rounded px-2 py-1 bg-blue-100 dark:bg-blue-900/30">
                <Text className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400">
                  POST
                </Text>
              </View>
              <Text className="font-mono text-sm text-foreground">/api/messages</Text>
            </View>
            <Text className="text-sm text-muted-foreground">
              Send a message to the AI assistant
            </Text>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Usage
          </Text>
          <View className="bg-muted rounded-lg p-4">
            <Text className="text-sm text-muted-foreground font-mono">
              {`import { SchemaDisplay } from "@ai-native-elements/react-native";

<SchemaDisplay>
  <SchemaDisplayHeader>
    <SchemaDisplayMethod>GET</SchemaDisplayMethod>
    <SchemaDisplayPath>/api/users/:id</SchemaDisplayPath>
  </SchemaDisplayHeader>
  <SchemaDisplayContent>
    <SchemaDisplayParameters>
      <SchemaDisplayParameter name="id" type="string" required />
    </SchemaDisplayParameters>
  </SchemaDisplayContent>
</SchemaDisplay>`}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
