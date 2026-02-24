import { View, Text, ScrollView } from "react-native";
import {
  EnvironmentVariables,
  EnvironmentVariablesHeader,
  EnvironmentVariablesTitle,
  EnvironmentVariablesToggle,
  EnvironmentVariablesContent,
  EnvironmentVariable,
  EnvironmentVariableGroup,
  EnvironmentVariableName,
  EnvironmentVariableValue,
  EnvironmentVariableCopyButton,
  EnvironmentVariableRequired,
} from "@ai-native-elements/react-native";

export default function EnvironmentVariablesPage() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-6">
        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Basic Environment Variables
          </Text>
          <EnvironmentVariables testID="env-vars-basic">
            <EnvironmentVariablesHeader testID="env-vars-header">
              <EnvironmentVariablesTitle />
              <EnvironmentVariablesToggle testID="env-vars-toggle" />
            </EnvironmentVariablesHeader>
            <EnvironmentVariablesContent>
              <EnvironmentVariable
                testID="env-var-api-key"
                name="OPENAI_API_KEY"
                value="sk-proj-abc123xyz789"
              />
              <EnvironmentVariable
                testID="env-var-org"
                name="OPENAI_ORG_ID"
                value="org-XYZ123"
              />
              <EnvironmentVariable
                testID="env-var-model"
                name="DEFAULT_MODEL"
                value="gpt-4o"
              />
            </EnvironmentVariablesContent>
          </EnvironmentVariables>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            With Required Badge &amp; Copy
          </Text>
          <EnvironmentVariables testID="env-vars-required">
            <EnvironmentVariablesHeader>
              <EnvironmentVariablesTitle>API Configuration</EnvironmentVariablesTitle>
              <EnvironmentVariablesToggle testID="env-vars-toggle-required" />
            </EnvironmentVariablesHeader>
            <EnvironmentVariablesContent>
              <EnvironmentVariable
                testID="env-var-anthropic-key"
                name="ANTHROPIC_API_KEY"
                value="sk-ant-api03-secret-key-here"
              >
                <EnvironmentVariableGroup>
                  <EnvironmentVariableName />
                  <EnvironmentVariableRequired />
                </EnvironmentVariableGroup>
                <EnvironmentVariableGroup>
                  <EnvironmentVariableValue />
                  <EnvironmentVariableCopyButton testID="env-copy-anthropic" />
                </EnvironmentVariableGroup>
              </EnvironmentVariable>
              <EnvironmentVariable
                testID="env-var-base-url"
                name="API_BASE_URL"
                value="https://api.anthropic.com/v1"
              >
                <EnvironmentVariableGroup>
                  <EnvironmentVariableName />
                </EnvironmentVariableGroup>
                <EnvironmentVariableGroup>
                  <EnvironmentVariableValue />
                  <EnvironmentVariableCopyButton
                    testID="env-copy-base-url"
                    copyFormat="export"
                  />
                </EnvironmentVariableGroup>
              </EnvironmentVariable>
              <EnvironmentVariable
                testID="env-var-timeout"
                name="REQUEST_TIMEOUT"
                value="30000"
              />
            </EnvironmentVariablesContent>
          </EnvironmentVariables>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Usage
          </Text>
          <View className="bg-muted rounded-lg p-4">
            <Text className="text-sm text-muted-foreground font-mono">
              {`import { EnvironmentVariables, EnvironmentVariable } from "@ai-native-elements/react-native";

<EnvironmentVariables>
  <EnvironmentVariablesHeader>
    <EnvironmentVariablesTitle />
    <EnvironmentVariablesToggle />
  </EnvironmentVariablesHeader>
  <EnvironmentVariablesContent>
    <EnvironmentVariable name="API_KEY" value="secret" />
  </EnvironmentVariablesContent>
</EnvironmentVariables>`}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
