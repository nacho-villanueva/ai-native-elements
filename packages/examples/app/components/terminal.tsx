import { View, Text, ScrollView, Pressable } from "react-native";
import { useState } from "react";
import {
  Terminal,
  TerminalHeader,
  TerminalTitle,
  TerminalStatus,
  TerminalActions,
  TerminalCopyButton,
  TerminalClearButton,
  TerminalContent,
} from "@ai-native-elements/react-native";

const SAMPLE_OUTPUT = `$ npm install
added 1245 packages in 12s

$ npm run build
> my-app@1.0.0 build
> tsc && vite build

vite v5.0.0 building for production...
\u2713 42 modules transformed.
dist/index.html          0.46 kB \u2502 gzip:  0.30 kB
dist/assets/index.js   142.35 kB \u2502 gzip: 45.67 kB
dist/assets/index.css    2.18 kB \u2502 gzip:  0.94 kB
\u2713 built in 1.23s`;

const STREAMING_LINES = [
  "$ running tests...\n",
  "PASS src/utils.test.ts\n",
  "PASS src/hooks.test.ts\n",
  "PASS src/components/Button.test.tsx\n",
  "FAIL src/components/Modal.test.tsx\n",
  "  \u2715 should render correctly\n",
  "    Expected: true\n",
  "    Received: false\n",
  "\nTest Suites: 1 failed, 3 passed, 4 total\n",
  "Tests:       1 failed, 12 passed, 13 total\n",
];

export default function TerminalPage() {
  const [output, setOutput] = useState(SAMPLE_OUTPUT);
  const [streamOutput, setStreamOutput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const startStreaming = () => {
    setStreamOutput("");
    setIsStreaming(true);
    let index = 0;
    const interval = setInterval(() => {
      if (index < STREAMING_LINES.length) {
        setStreamOutput((prev) => prev + STREAMING_LINES[index]);
        index++;
      } else {
        setIsStreaming(false);
        clearInterval(interval);
      }
    }, 500);
  };

  const handleClear = () => {
    setOutput("");
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-6">
        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Default Terminal
          </Text>
          <Terminal
            testID="terminal-default"
            output={output}
            onClear={handleClear}
          />
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Streaming Output
          </Text>
          <Terminal
            testID="terminal-streaming"
            output={streamOutput}
            isStreaming={isStreaming}
          />
          <Pressable
            testID="terminal-start-stream"
            onPress={startStreaming}
            className="mt-2 bg-primary rounded-md px-4 py-2 self-start"
          >
            <Text className="text-primary-foreground text-sm font-medium">
              {isStreaming ? "Streaming..." : "Start Stream"}
            </Text>
          </Pressable>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Custom Composition
          </Text>
          <Terminal
            testID="terminal-custom"
            output="Hello from custom terminal!"
          >
            <TerminalHeader>
              <TerminalTitle>Build Output</TerminalTitle>
              <TerminalActions>
                <TerminalCopyButton testID="terminal-copy" />
              </TerminalActions>
            </TerminalHeader>
            <TerminalContent />
          </Terminal>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Usage
          </Text>
          <View className="bg-muted rounded-lg p-4">
            <Text className="text-sm text-muted-foreground font-mono">
              {`import { Terminal } from "@ai-native-elements/react-native";

<Terminal
  output={output}
  isStreaming={isStreaming}
  onClear={() => setOutput("")}
/>`}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
