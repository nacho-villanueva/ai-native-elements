import { View, Text } from "react-native";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
  ConversationWrapper,
  Message,
  MessageContent,
  MessageText,
} from "@ai-native-elements/react-native";

const sampleMessages = [
  { id: 1, from: "user" as const, text: "Hello! How are you?" },
  { id: 2, from: "assistant" as const, text: "Hi there! I'm doing great, thank you for asking. How can I help you today?" },
  { id: 3, from: "user" as const, text: "Can you explain what React Native is?" },
  { id: 4, from: "assistant" as const, text: "React Native is a popular open-source framework developed by Meta (formerly Facebook) for building mobile applications. It allows developers to use React and JavaScript to create native mobile apps for iOS and Android platforms.\n\nKey features include:\n\n1. Cross-platform development - Write once, run on both iOS and Android\n2. Native performance - Unlike hybrid apps, React Native renders using native components\n3. Hot reloading - See changes instantly during development\n4. Large ecosystem - Access to many third-party libraries and components\n5. JavaScript-based - Leverage existing JS skills for mobile development" },
  { id: 5, from: "user" as const, text: "That sounds interesting! What about NativeWind?" },
  { id: 6, from: "assistant" as const, text: "NativeWind is a styling library that brings Tailwind CSS to React Native. It allows you to use Tailwind's utility classes to style your React Native components, making it much easier to write consistent and maintainable styles.\n\nBenefits of NativeWind:\n\n- Familiar Tailwind syntax for React Native\n- Works with className prop\n- Supports dark mode out of the box\n- CSS variables for theming\n- TypeScript support\n- Great developer experience" },
  { id: 7, from: "user" as const, text: "How does it compare to StyleSheet?" },
  { id: 8, from: "assistant" as const, text: "Great question! Here's a comparison between NativeWind and React Native's built-in StyleSheet:\n\nStyleSheet (traditional approach):\n- More verbose syntax\n- Styles defined separately from components\n- Type-safe but requires more boilerplate\n- Native to React Native\n\nNativeWind:\n- Concise utility classes\n- Inline styling with className\n- Familiar if you know Tailwind\n- Easy responsive design\n- Quick prototyping\n\nBoth have their place - StyleSheet for complex, dynamic styles and NativeWind for rapid development with consistent design systems." },
];

export default function ConversationPage() {
  return (
    <View className="flex-1 bg-background">
      <View className="p-4 border-b border-border">
        <Text className="text-lg font-semibold text-foreground">
          Conversation Demo
        </Text>
        <Text className="text-sm text-muted-foreground">
          Scroll up to see the scroll-to-bottom button
        </Text>
      </View>

      <Conversation testID="conversation-demo" autoScroll={true} className="flex-1">
        <ConversationContent testID="conversation-content">
          {sampleMessages.map((msg) => (
            <Message testID={`message-${msg.id}`} key={msg.id} from={msg.from}>
              <MessageContent from={msg.from}>
                <MessageText from={msg.from}>{msg.text}</MessageText>
              </MessageContent>
            </Message>
          ))}
        </ConversationContent>
      </Conversation>

      <View className="p-4 border-t border-border">
        <View className="bg-muted rounded-lg p-4">
          <Text className="text-sm text-muted-foreground font-mono">
            {`import { Conversation, ConversationContent } from "@ai-native-elements/react-native";

<Conversation autoScroll={true}>
  <ConversationContent>
    {messages.map((msg) => (
      <Message key={msg.id} from={msg.from}>
        ...
      </Message>
    ))}
  </ConversationContent>
</Conversation>`}
          </Text>
        </View>
      </View>
    </View>
  );
}
