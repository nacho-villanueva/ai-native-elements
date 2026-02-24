import { View, Text, ScrollView, Alert } from "react-native";
import { useState } from "react";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputBody,
  PromptInputFooter,
  PromptInputTools,
  PromptInputButton,
  PromptInputSubmit,
  ControlledPromptInput,
  type ChatStatus,
} from "@ai-native-elements/react-native";
import { useTheme } from "../_layout";

export default function PromptInputPage() {
  const { darkMode } = useTheme();
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [controlledValue, setControlledValue] = useState("");

  const handleSubmit = (message: { text: string }) => {
    Alert.alert("Submitted", message.text);
  };

  const handleSubmitWithStatus = async (message: { text: string }) => {
    setStatus("submitted");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("streaming");

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setStatus("idle");

    Alert.alert("Completed", message.text);
  };

  const handleControlledSubmit = () => {
    if (controlledValue.trim()) {
      Alert.alert("Controlled Submit", controlledValue);
      setControlledValue("");
    }
  };

  const loaderColor = darkMode ? "#fafafa" : "#09090b";

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-6">
        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Basic
          </Text>
          <View className="bg-card border border-border rounded-lg p-4">
            <PromptInput testID="prompt-input-basic" onSubmit={handleSubmit}>
              <PromptInputBody>
                <PromptInputTextarea testID="prompt-textarea-basic" placeholder="Type your message..." />
              </PromptInputBody>
              <PromptInputFooter>
                <PromptInputTools>
                  <PromptInputButton testID="prompt-btn-attachment" onPress={() => Alert.alert("Add attachment")}>
                    <Text className="text-muted-foreground">+</Text>
                  </PromptInputButton>
                </PromptInputTools>
                <PromptInputSubmit testID="prompt-submit-basic" loadingColor={loaderColor} />
              </PromptInputFooter>
            </PromptInput>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            With Status
          </Text>
          <Text className="text-sm text-muted-foreground mb-2">
            Shows loading states during submission
          </Text>
          <View className="bg-card border border-border rounded-lg p-4">
            <PromptInput onSubmit={handleSubmitWithStatus}>
              <PromptInputBody>
                <PromptInputTextarea placeholder="Submit to see status changes..." />
              </PromptInputBody>
              <PromptInputFooter>
                <View className="flex-row items-center">
                  <Text className="text-xs text-muted-foreground">
                    Status: {status}
                  </Text>
                </View>
                <PromptInputSubmit
                  status={status}
                  onStop={() => setStatus("idle")}
                  loadingColor={loaderColor}
                />
              </PromptInputFooter>
            </PromptInput>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Controlled
          </Text>
          <Text className="text-sm text-muted-foreground mb-2">
            External state management
          </Text>
          <View className="bg-card border border-border rounded-lg p-4">
            <ControlledPromptInput
              value={controlledValue}
              onChangeText={setControlledValue}
              onSubmit={handleControlledSubmit}
            >
              <PromptInputBody>
                <PromptInputTextarea placeholder="Controlled input..." />
              </PromptInputBody>
              <PromptInputFooter>
                <Text className="text-xs text-muted-foreground">
                  {controlledValue.length} chars
                </Text>
                <PromptInputSubmit loadingColor={loaderColor} />
              </PromptInputFooter>
            </ControlledPromptInput>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            With Multiple Tools
          </Text>
          <View className="bg-card border border-border rounded-lg p-4">
            <PromptInput onSubmit={handleSubmit}>
              <PromptInputBody>
                <PromptInputTextarea placeholder="Rich input with tools..." />
              </PromptInputBody>
              <PromptInputFooter>
                <PromptInputTools>
                  <PromptInputButton onPress={() => Alert.alert("Add image")}>
                    <Text className="text-muted-foreground">Image</Text>
                  </PromptInputButton>
                  <PromptInputButton onPress={() => Alert.alert("Add file")}>
                    <Text className="text-muted-foreground">File</Text>
                  </PromptInputButton>
                  <PromptInputButton onPress={() => Alert.alert("Voice input")}>
                    <Text className="text-muted-foreground">Mic</Text>
                  </PromptInputButton>
                </PromptInputTools>
                <PromptInputSubmit loadingColor={loaderColor} />
              </PromptInputFooter>
            </PromptInput>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Usage
          </Text>
          <View className="bg-muted rounded-lg p-4">
            <Text className="text-sm text-muted-foreground font-mono">
              {`import { PromptInput, PromptInputTextarea, PromptInputSubmit } from "@ai-native-elements/react-native";

<PromptInput onSubmit={(msg) => console.log(msg.text)}>
  <PromptInputBody>
    <PromptInputTextarea />
  </PromptInputBody>
  <PromptInputFooter>
    <PromptInputTools />
    <PromptInputSubmit />
  </PromptInputFooter>
</PromptInput>`}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
