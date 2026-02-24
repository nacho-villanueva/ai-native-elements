import { View, Text, ScrollView } from "react-native";
import {
  Commit,
  CommitHeader,
  CommitHash,
  CommitMessage,
  CommitMetadata,
  CommitSeparator,
  CommitInfo,
  CommitAuthor,
  CommitAuthorAvatar,
  CommitTimestamp,
  CommitActions,
  CommitCopyButton,
  CommitContent,
  CommitFiles,
  CommitFile,
  CommitFileInfo,
  CommitFileStatus,
  CommitFileIcon,
  CommitFilePath,
  CommitFileChanges,
  CommitFileAdditions,
  CommitFileDeletions,
} from "@ai-native-elements/react-native";

const YESTERDAY = new Date(Date.now() - 86400000);
const TWO_DAYS_AGO = new Date(Date.now() - 2 * 86400000);

export default function CommitPage() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-6">
        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Basic Commit
          </Text>
          <Commit testID="commit-basic">
            <CommitHeader testID="commit-header-basic">
              <CommitHash>a1b2c3d</CommitHash>
              <CommitInfo>
                <CommitMessage>feat: add file tree component</CommitMessage>
                <CommitMetadata>
                  <CommitAuthor>
                    <CommitAuthorAvatar initials="JD" />
                  </CommitAuthor>
                  <CommitSeparator />
                  <CommitTimestamp date={YESTERDAY} />
                </CommitMetadata>
              </CommitInfo>
              <CommitActions>
                <CommitCopyButton testID="commit-copy-basic" hash="a1b2c3d" />
              </CommitActions>
            </CommitHeader>
          </Commit>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Commit with Files (Expandable)
          </Text>
          <Commit testID="commit-with-files">
            <CommitHeader testID="commit-header-files">
              <CommitHash>e4f5g6h</CommitHash>
              <CommitInfo>
                <CommitMessage>fix: resolve navigation crash on Android</CommitMessage>
                <CommitMetadata>
                  <CommitAuthor>
                    <CommitAuthorAvatar initials="AS" />
                  </CommitAuthor>
                  <CommitSeparator />
                  <CommitTimestamp date={TWO_DAYS_AGO} />
                </CommitMetadata>
              </CommitInfo>
              <CommitActions>
                <CommitCopyButton testID="commit-copy-files" hash="e4f5g6h" />
              </CommitActions>
            </CommitHeader>
            <CommitContent testID="commit-content-files">
              <CommitFiles>
                <CommitFile>
                  <CommitFileInfo>
                    <CommitFileStatus status="modified" />
                    <CommitFileIcon />
                    <CommitFilePath>src/navigation/RootNavigator.tsx</CommitFilePath>
                  </CommitFileInfo>
                  <CommitFileChanges>
                    <CommitFileAdditions count={12} />
                    <CommitFileDeletions count={8} />
                  </CommitFileChanges>
                </CommitFile>
                <CommitFile>
                  <CommitFileInfo>
                    <CommitFileStatus status="added" />
                    <CommitFileIcon />
                    <CommitFilePath>src/navigation/__tests__/RootNavigator.test.tsx</CommitFilePath>
                  </CommitFileInfo>
                  <CommitFileChanges>
                    <CommitFileAdditions count={45} />
                  </CommitFileChanges>
                </CommitFile>
                <CommitFile>
                  <CommitFileInfo>
                    <CommitFileStatus status="deleted" />
                    <CommitFileIcon />
                    <CommitFilePath>src/navigation/legacy.ts</CommitFilePath>
                  </CommitFileInfo>
                  <CommitFileChanges>
                    <CommitFileDeletions count={120} />
                  </CommitFileChanges>
                </CommitFile>
              </CommitFiles>
            </CommitContent>
          </Commit>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Usage
          </Text>
          <View className="bg-muted rounded-lg p-4">
            <Text className="text-sm text-muted-foreground font-mono">
              {`import { Commit, CommitHeader, CommitHash, CommitMessage } from "@ai-native-elements/react-native";

<Commit>
  <CommitHeader>
    <CommitHash>a1b2c3d</CommitHash>
    <CommitMessage>feat: add feature</CommitMessage>
  </CommitHeader>
</Commit>`}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
