import { View, Text, ScrollView, Alert } from "react-native";
import { Suggestions, Suggestion } from "@ai-native-elements/react-native";

export default function SuggestionPage() {
  const handlePress = (suggestion: string) => {
    Alert.alert("Selected", suggestion);
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-6">
        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Default
          </Text>
          <View className="bg-card border border-border rounded-lg p-4">
            <Suggestions testID="suggestions-default">
              <Suggestion testID="suggestion-joke" suggestion="Tell me a joke" onPress={handlePress} />
              <Suggestion testID="suggestion-poem" suggestion="Write a poem" onPress={handlePress} />
              <Suggestion testID="suggestion-ai" suggestion="Explain AI" onPress={handlePress} />
              <Suggestion testID="suggestion-code" suggestion="Help me code" onPress={handlePress} />
            </Suggestions>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Custom Labels
          </Text>
          <View className="bg-card border border-border rounded-lg p-4">
            <Suggestions>
              <Suggestion suggestion="joke" onPress={handlePress}>
                🎭 Joke
              </Suggestion>
              <Suggestion suggestion="poem" onPress={handlePress}>
                📝 Poem
              </Suggestion>
              <Suggestion suggestion="code" onPress={handlePress}>
                💻 Code
              </Suggestion>
              <Suggestion suggestion="explain" onPress={handlePress}>
                💡 Explain
              </Suggestion>
            </Suggestions>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Variants
          </Text>
          <View className="bg-card border border-border rounded-lg p-4 gap-3">
            <Suggestions testID="suggestions-variants">
              <Suggestion testID="suggestion-outline" suggestion="Outline" variant="outline" onPress={handlePress} />
              <Suggestion testID="suggestion-default" suggestion="Default" variant="default" onPress={handlePress} />
              <Suggestion testID="suggestion-secondary" suggestion="Secondary" variant="secondary" onPress={handlePress} />
              <Suggestion testID="suggestion-ghost" suggestion="Ghost" variant="ghost" onPress={handlePress} />
            </Suggestions>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Usage
          </Text>
          <View className="bg-muted rounded-lg p-4">
            <Text className="text-sm text-muted-foreground font-mono">
              {`import { Suggestions, Suggestion } from "@ai-native-elements/react-native";

<Suggestions>
  <Suggestion
    suggestion="Tell me a joke"
    onPress={(s) => console.log(s)}
  />
</Suggestions>`}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
