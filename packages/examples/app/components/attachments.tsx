import { View, Text, ScrollView, Pressable } from "react-native";

// TODO: Import from @ai-native-elements/react-native once attachments component is available
// import { Attachments, Attachment, AttachmentPreview, AttachmentInfo, AttachmentRemove, AttachmentEmpty } from "@ai-native-elements/react-native";

export default function AttachmentsPage() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-6">
        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            File Attachments
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {[
              { name: "screenshot.png", size: "2.4 MB", icon: "🖼️" },
              { name: "report.pdf", size: "1.1 MB", icon: "📄" },
              { name: "data.csv", size: "340 KB", icon: "📊" },
            ].map((file) => (
              <View
                key={file.name}
                testID={`attachment-${file.name}`}
                className="flex-row items-center gap-2 rounded-lg border bg-background px-3 py-2"
              >
                <Text className="text-sm">{file.icon}</Text>
                <View>
                  <Text className="text-sm font-medium text-foreground">{file.name}</Text>
                  <Text className="text-xs text-muted-foreground">{file.size}</Text>
                </View>
                <Pressable
                  testID={`attachment-remove-${file.name}`}
                  className="ml-1 h-5 w-5 items-center justify-center rounded-full bg-muted"
                >
                  <Text className="text-xs text-muted-foreground">✕</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Image Attachments
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {["photo1.jpg", "photo2.png", "diagram.svg"].map((name) => (
              <View
                key={name}
                testID={`attachment-img-${name}`}
                className="relative rounded-lg border bg-muted w-20 h-20 items-center justify-center"
              >
                <Text className="text-2xl">🖼️</Text>
                <Pressable
                  testID={`attachment-img-remove-${name}`}
                  className="absolute top-1 right-1 h-5 w-5 items-center justify-center rounded-full bg-background border"
                >
                  <Text className="text-xs text-muted-foreground">✕</Text>
                </Pressable>
                <Text className="text-xs text-muted-foreground mt-1" numberOfLines={1}>
                  {name}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Empty State
          </Text>
          <View
            testID="attachments-empty"
            className="rounded-lg border border-dashed bg-background p-8 items-center justify-center"
          >
            <Text className="text-2xl mb-2">📎</Text>
            <Text className="text-sm text-muted-foreground">No attachments yet</Text>
            <Text className="text-xs text-muted-foreground mt-1">
              Add files to include with your message
            </Text>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Usage
          </Text>
          <View className="bg-muted rounded-lg p-4">
            <Text className="text-sm text-muted-foreground font-mono">
              {`import { Attachments, Attachment, AttachmentInfo, AttachmentRemove } from "@ai-native-elements/react-native";

<Attachments>
  <Attachment>
    <AttachmentPreview />
    <AttachmentInfo name="file.pdf" size="1.2 MB" />
    <AttachmentRemove onPress={() => remove(id)} />
  </Attachment>
  <AttachmentEmpty />
</Attachments>`}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
