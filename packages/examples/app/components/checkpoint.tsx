import { View, Text, ScrollView } from "react-native";
import {
  Checkpoint,
  CheckpointIcon,
  CheckpointTrigger,
} from "@ai-native-elements/react-native";

export default function CheckpointPage() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-6">
        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Default Checkpoint
          </Text>
          <Checkpoint testID="checkpoint-default">
            <CheckpointIcon />
            <CheckpointTrigger testID="checkpoint-trigger-default">
              <Text className="text-sm text-muted-foreground">Step 1 of 3</Text>
            </CheckpointTrigger>
          </Checkpoint>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Custom Label
          </Text>
          <Checkpoint testID="checkpoint-custom">
            <CheckpointIcon>
              <Text className="text-sm">✅</Text>
            </CheckpointIcon>
            <CheckpointTrigger
              testID="checkpoint-trigger-custom"
              tooltip="View checkpoint details"
            >
              <Text className="text-sm text-muted-foreground">
                Checkpoint: Research Complete
              </Text>
            </CheckpointTrigger>
          </Checkpoint>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            In a Flow
          </Text>
          <View className="gap-3">
            <Checkpoint testID="checkpoint-flow-1">
              <CheckpointIcon>
                <Text className="text-sm">✅</Text>
              </CheckpointIcon>
              <CheckpointTrigger testID="checkpoint-trigger-flow-1">
                <Text className="text-sm text-muted-foreground">Planning phase</Text>
              </CheckpointTrigger>
            </Checkpoint>
            <Checkpoint testID="checkpoint-flow-2">
              <CheckpointIcon>
                <Text className="text-sm">⏳</Text>
              </CheckpointIcon>
              <CheckpointTrigger testID="checkpoint-trigger-flow-2">
                <Text className="text-sm text-muted-foreground">Implementation</Text>
              </CheckpointTrigger>
            </Checkpoint>
            <Checkpoint testID="checkpoint-flow-3">
              <CheckpointIcon>
                <Text className="text-sm">🔲</Text>
              </CheckpointIcon>
              <CheckpointTrigger testID="checkpoint-trigger-flow-3">
                <Text className="text-sm text-muted-foreground">Review &amp; Deploy</Text>
              </CheckpointTrigger>
            </Checkpoint>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Usage
          </Text>
          <View className="bg-muted rounded-lg p-4">
            <Text className="text-sm text-muted-foreground font-mono">
              {`import { Checkpoint, CheckpointIcon, CheckpointTrigger } from "@ai-native-elements/react-native";

<Checkpoint>
  <CheckpointIcon />
  <CheckpointTrigger>
    <Text>Step 1 of 3</Text>
  </CheckpointTrigger>
</Checkpoint>`}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
