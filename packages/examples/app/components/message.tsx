import { View, ScrollView, Alert } from "react-native";
import {
  Message,
  MessageContent,
  MessageText,
  MessageActions,
  MessageAction,
  MessageToolbar,
  MessageResponse,
  MessageBranch,
  MessageBranchContent,
  MessageBranchSelector,
  MessageBranchPrevious,
  MessageBranchNext,
  MessageBranchPage,
  getDefaultMarkdownStyles,
  getDefaultMarkdownStylesLight,
} from "@ai-native-elements/react-native";
import { Button, Text } from "@ai-native-elements/shadcn-ui";
import Markdown from "react-native-markdown-display";
import { useTheme } from "../_layout";

const sampleMarkdown = `# Hello World

This is a **markdown** response with various formatting.

## Code Example

Here's some inline \`code\` and a code block:

\`\`\`typescript
function greet(name: string) {
  return \`Hello, \${name}!\`;
}
\`\`\`

## Lists

- First item
- Second item
- Third item

1. Numbered one
2. Numbered two
3. Numbered three

## Blockquote

> This is a blockquote with some important information.

## Links and Emphasis

Check out [this link](https://example.com) for more info.

*Italic text* and **bold text** can be combined.
`;

export default function MessagePage() {
  const { darkMode } = useTheme();
  const markdownStyles = darkMode
    ? getDefaultMarkdownStyles(false)
    : getDefaultMarkdownStylesLight(false);

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-6">
        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            User Message
          </Text>
          <View className="bg-card border border-border rounded-lg p-4">
            <Message testID="message-user" from="user">
              <MessageContent from="user">
                <MessageText from="user">
                  Hello! Can you help me understand how React Native works?
                </MessageText>
              </MessageContent>
            </Message>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Assistant Message
          </Text>
          <View className="bg-card border border-border rounded-lg p-4">
            <Message testID="message-assistant" from="assistant">
              <MessageContent from="assistant">
                <MessageText from="assistant">
                  Of course! React Native is a framework for building native mobile apps using JavaScript and React. It allows you to write code once and deploy to both iOS and Android platforms.
                </MessageText>
              </MessageContent>
            </Message>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Markdown Response
          </Text>
          <Text className="text-sm text-muted-foreground mb-2">
            Using MessageResponse with react-native-markdown-display
          </Text>
          <View className="bg-card border border-border rounded-lg p-4">
            <Message testID="message-markdown" from="assistant">
              <MessageContent from="assistant">
                <MessageResponse
                  MarkdownComponent={Markdown}
                  markdownStyles={markdownStyles}
                >
                  {sampleMarkdown}
                </MessageResponse>
              </MessageContent>
            </Message>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Message with Actions
          </Text>
          <View className="bg-card border border-border rounded-lg p-4">
            <Message testID="message-with-actions" from="assistant">
              <MessageContent from="assistant">
                <MessageText from="assistant">
                  Here's a helpful response with action buttons.
                </MessageText>
              </MessageContent>
              <MessageActions>
                <MessageAction
                  testID="action-copy"
                  tooltip="Copy"
                  onPress={() => Alert.alert("Copied!")}
                >
                  <Text className="text-muted-foreground">Copy</Text>
                </MessageAction>
                <MessageAction
                  testID="action-like"
                  tooltip="Like"
                  onPress={() => Alert.alert("Liked!")}
                >
                  <Text className="text-muted-foreground">Like</Text>
                </MessageAction>
              </MessageActions>
            </Message>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Message with Toolbar
          </Text>
          <View className="bg-card border border-border rounded-lg p-4">
            <Message from="assistant">
              <MessageContent from="assistant">
                <MessageText from="assistant">
                  This message has a toolbar with additional actions.
                </MessageText>
              </MessageContent>
              <MessageToolbar>
                <Button variant="ghost" size="sm">
                  <Text className="text-muted-foreground text-sm">Regenerate</Text>
                </Button>
                <View className="flex-row gap-2">
                  <Button variant="ghost" size="sm">
                    <Text className="text-muted-foreground text-sm">Share</Text>
                  </Button>
                </View>
              </MessageToolbar>
            </Message>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Message Branching
          </Text>
          <View className="bg-card border border-border rounded-lg p-4">
            <MessageBranch testID="message-branch">
              <MessageBranchContent>
                <Message from="assistant">
                  <MessageContent from="assistant">
                    <MessageText from="assistant">
                      This is response version 1.
                    </MessageText>
                  </MessageContent>
                </Message>
                <Message from="assistant">
                  <MessageContent from="assistant">
                    <MessageText from="assistant">
                      This is response version 2 - an alternative answer.
                    </MessageText>
                  </MessageContent>
                </Message>
                <Message from="assistant">
                  <MessageContent from="assistant">
                    <MessageText from="assistant">
                      This is response version 3 - yet another variation.
                    </MessageText>
                  </MessageContent>
                </Message>
              </MessageBranchContent>
              <MessageBranchSelector testID="branch-selector">
                <MessageBranchPrevious testID="branch-prev" />
                <MessageBranchPage testID="branch-page" />
                <MessageBranchNext testID="branch-next" />
              </MessageBranchSelector>
            </MessageBranch>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Usage
          </Text>
          <View className="bg-muted rounded-lg p-4">
            <Text className="text-sm text-muted-foreground font-mono">
              {`import { Message, MessageContent, MessageResponse } from "@ai-native-elements/react-native";

// Simple text message
<Message from="user">
  <MessageContent from="user">
    <MessageText>Hello world!</MessageText>
  </MessageContent>
</Message>

// Markdown response
<Message from="assistant">
  <MessageContent from="assistant">
    <MessageResponse>
      {\`# Markdown Content

This is **bold** and *italic*.\`}
    </MessageResponse>
  </MessageContent>
</Message>`}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
