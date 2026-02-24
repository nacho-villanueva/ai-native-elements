import { View, Text, ScrollView } from "react-native";
import { useState } from "react";
import {
  FileTree,
  FileTreeFolder,
  FileTreeFile,
} from "@ai-native-elements/react-native";

export default function FileTreePage() {
  const [selectedPath, setSelectedPath] = useState<string | undefined>();

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-6">
        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Basic File Tree
          </Text>
          <FileTree testID="file-tree-basic" defaultExpanded={new Set(["src"])}>
            <FileTreeFolder path="src" name="src">
              <FileTreeFile
                testID="file-tree-file-index"
                path="src/index.ts"
                name="index.ts"
              />
              <FileTreeFile
                testID="file-tree-file-utils"
                path="src/utils.ts"
                name="utils.ts"
              />
              <FileTreeFolder path="src/components" name="components">
                <FileTreeFile
                  testID="file-tree-file-button"
                  path="src/components/button.tsx"
                  name="button.tsx"
                />
                <FileTreeFile
                  path="src/components/card.tsx"
                  name="card.tsx"
                />
              </FileTreeFolder>
            </FileTreeFolder>
            <FileTreeFolder path="tests" name="tests">
              <FileTreeFile
                path="tests/utils.test.ts"
                name="utils.test.ts"
              />
            </FileTreeFolder>
            <FileTreeFile path="package.json" name="package.json" />
            <FileTreeFile path="tsconfig.json" name="tsconfig.json" />
          </FileTree>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Selectable File Tree
          </Text>
          {selectedPath && (
            <Text className="text-sm text-muted-foreground mb-2">
              Selected: {selectedPath}
            </Text>
          )}
          <FileTree
            testID="file-tree-selectable"
            selectedPath={selectedPath}
            onSelect={setSelectedPath}
            defaultExpanded={new Set(["packages"])}
          >
            <FileTreeFolder path="packages" name="packages">
              <FileTreeFolder path="packages/elements" name="elements">
                <FileTreeFile
                  testID="file-tree-select-loader"
                  path="packages/elements/loader.tsx"
                  name="loader.tsx"
                />
                <FileTreeFile
                  testID="file-tree-select-shimmer"
                  path="packages/elements/shimmer.tsx"
                  name="shimmer.tsx"
                />
              </FileTreeFolder>
              <FileTreeFolder path="packages/examples" name="examples">
                <FileTreeFile
                  path="packages/examples/App.tsx"
                  name="App.tsx"
                />
              </FileTreeFolder>
            </FileTreeFolder>
          </FileTree>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Usage
          </Text>
          <View className="bg-muted rounded-lg p-4">
            <Text className="text-sm text-muted-foreground font-mono">
              {`import { FileTree, FileTreeFolder, FileTreeFile } from "@ai-native-elements/react-native";

<FileTree defaultExpanded={new Set(["src"])}>
  <FileTreeFolder path="src" name="src">
    <FileTreeFile path="src/index.ts" name="index.ts" />
  </FileTreeFolder>
</FileTree>`}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
