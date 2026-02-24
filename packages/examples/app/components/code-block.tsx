import { View, Text, ScrollView, Alert } from "react-native";
import {
  CodeBlock,
  CodeBlockContainer,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockFilename,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
} from "@ai-native-elements/react-native";

const SAMPLE_CODE_TS = `import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

export function useUser(id: number) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(\`/api/users/\${id}\`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, [id]);

  return { user, loading };
}`;

const SAMPLE_CODE_PYTHON = `def fibonacci(n: int) -> list[int]:
    """Generate fibonacci sequence up to n numbers."""
    if n <= 0:
        return []
    if n == 1:
        return [0]

    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence

# Print first 10 fibonacci numbers
result = fibonacci(10)
print(f"Fibonacci: {result}")`;

const SAMPLE_CODE_SHORT = `const greeting = "Hello, World!";
console.log(greeting);`;

export default function CodeBlockPage() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-6">
        {/* Basic CodeBlock */}
        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Basic Code Block
          </Text>
          <CodeBlock
            testID="code-block-basic"
            code={SAMPLE_CODE_SHORT}
            language="javascript"
          />
        </View>

        {/* With Header and Copy */}
        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            With Header and Copy Button
          </Text>
          <CodeBlock
            testID="code-block-header"
            code={SAMPLE_CODE_TS}
            language="typescript"
          >
            <CodeBlockHeader>
              <CodeBlockTitle>
                <CodeBlockFilename>useUser.ts</CodeBlockFilename>
              </CodeBlockTitle>
              <CodeBlockActions>
                <CodeBlockCopyButton
                  testID="code-block-copy"
                  onCopy={() => Alert.alert("Copied!", "Code copied to clipboard")}
                  onError={(err) => Alert.alert("Error", err.message)}
                />
              </CodeBlockActions>
            </CodeBlockHeader>
          </CodeBlock>
        </View>

        {/* With Line Numbers */}
        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            With Line Numbers
          </Text>
          <CodeBlock
            testID="code-block-lines"
            code={SAMPLE_CODE_PYTHON}
            language="python"
            showLineNumbers
          >
            <CodeBlockHeader>
              <CodeBlockTitle>
                <CodeBlockFilename>fibonacci.py</CodeBlockFilename>
              </CodeBlockTitle>
              <CodeBlockActions>
                <CodeBlockCopyButton testID="code-block-copy-python" />
              </CodeBlockActions>
            </CodeBlockHeader>
          </CodeBlock>
        </View>

        {/* Composed manually */}
        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Composed (Manual)
          </Text>
          <CodeBlockContainer testID="code-block-composed" language="typescript">
            <CodeBlockHeader>
              <CodeBlockTitle>
                <CodeBlockFilename>app.tsx</CodeBlockFilename>
              </CodeBlockTitle>
            </CodeBlockHeader>
            <CodeBlockContent
              code={SAMPLE_CODE_SHORT}
              language="typescript"
            />
          </CodeBlockContainer>
        </View>

        {/* Usage */}
        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Usage
          </Text>
          <View className="bg-muted rounded-lg p-4">
            <Text className="text-sm text-muted-foreground font-mono">
              {`import {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockFilename,
  CodeBlockActions,
  CodeBlockCopyButton,
} from "@ai-native-elements/react-native";

<CodeBlock code={code} language="typescript">
  <CodeBlockHeader>
    <CodeBlockTitle>
      <CodeBlockFilename>file.ts</CodeBlockFilename>
    </CodeBlockTitle>
    <CodeBlockActions>
      <CodeBlockCopyButton />
    </CodeBlockActions>
  </CodeBlockHeader>
</CodeBlock>`}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
