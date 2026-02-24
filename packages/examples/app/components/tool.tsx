import { View, Text, ScrollView } from "react-native";
import {
  Tool,
  ToolHeader,
  ToolContent,
  ToolInput,
  ToolOutput,
} from "@ai-native-elements/react-native";
import type { ToolState } from "@ai-native-elements/react-native";

export default function ToolPage() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-6">
        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Completed Tool Call
          </Text>
          <Tool testID="tool-completed">
            <ToolHeader
              testID="tool-completed-header"
              type="tool-invocation"
              state="output-available"
              title="getWeather"
            />
            <ToolContent testID="tool-completed-content">
              <ToolInput
                testID="tool-completed-input"
                input={{ location: "San Francisco", units: "fahrenheit" }}
              />
              <ToolOutput
                testID="tool-completed-output"
                output={{ temperature: 72, condition: "sunny", humidity: 45 }}
              />
            </ToolContent>
          </Tool>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Running Tool Call
          </Text>
          <Tool testID="tool-running">
            <ToolHeader
              testID="tool-running-header"
              type="tool-invocation"
              state="input-available"
              title="searchDatabase"
            />
            <ToolContent>
              <ToolInput
                testID="tool-running-input"
                input={{ query: "SELECT * FROM users WHERE active = true", limit: 10 }}
              />
            </ToolContent>
          </Tool>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Error Tool Call
          </Text>
          <Tool testID="tool-error">
            <ToolHeader
              testID="tool-error-header"
              type="tool-invocation"
              state="output-error"
              title="fetchAPI"
            />
            <ToolContent>
              <ToolInput
                testID="tool-error-input"
                input={{ url: "https://api.example.com/data", method: "GET" }}
              />
              <ToolOutput
                testID="tool-error-output"
                output={null}
                errorText="Connection timeout: The server did not respond within 30 seconds."
              />
            </ToolContent>
          </Tool>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Awaiting Approval
          </Text>
          <Tool testID="tool-approval">
            <ToolHeader
              testID="tool-approval-header"
              type="tool-invocation"
              state="approval-requested"
              title="deleteRecords"
            />
            <ToolContent>
              <ToolInput
                testID="tool-approval-input"
                input={{ table: "logs", where: { age: "> 90 days" } }}
              />
            </ToolContent>
          </Tool>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            All States
          </Text>
          {(
            [
              "input-streaming",
              "input-available",
              "approval-requested",
              "approval-responded",
              "output-available",
              "output-error",
              "output-denied",
            ] as ToolState[]
          ).map((state) => (
            <Tool key={state} testID={`tool-state-${state}`}>
              <ToolHeader
                type="tool-invocation"
                state={state}
                title={state}
              />
            </Tool>
          ))}
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Usage
          </Text>
          <View className="bg-muted rounded-lg p-4">
            <Text className="text-sm text-muted-foreground font-mono">
              {`import { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput } from "@ai-native-elements/react-native";

<Tool>
  <ToolHeader
    type="tool-invocation"
    state="output-available"
    title="myTool"
  />
  <ToolContent>
    <ToolInput input={{ key: "value" }} />
    <ToolOutput output={{ result: "data" }} />
  </ToolContent>
</Tool>`}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
