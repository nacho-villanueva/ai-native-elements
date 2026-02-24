import { View, Text, ScrollView } from "react-native";
import {
  PackageInfo,
  PackageInfoHeader,
  PackageInfoName,
  PackageInfoChangeType,
  PackageInfoVersion,
  PackageInfoDescription,
  PackageInfoContent,
  PackageInfoDependencies,
  PackageInfoDependency,
} from "@ai-native-elements/react-native";

export default function PackageInfoPage() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-6">
        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Major Update
          </Text>
          <PackageInfo
            testID="package-info-major"
            name="react"
            currentVersion="18.2.0"
            newVersion="19.0.0"
            changeType="major"
          />
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Minor Update
          </Text>
          <PackageInfo
            testID="package-info-minor"
            name="@ai-native-elements/react-native"
            currentVersion="0.3.1"
            newVersion="0.4.0"
            changeType="minor"
          />
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Patch Update
          </Text>
          <PackageInfo
            testID="package-info-patch"
            name="typescript"
            currentVersion="5.3.2"
            newVersion="5.3.3"
            changeType="patch"
          />
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            With Description &amp; Dependencies
          </Text>
          <PackageInfo
            testID="package-info-full"
            name="nativewind"
            currentVersion="4.0.1"
            newVersion="4.1.0"
            changeType="minor"
          >
            <PackageInfoHeader>
              <PackageInfoName />
              <PackageInfoChangeType />
            </PackageInfoHeader>
            <PackageInfoVersion />
            <PackageInfoDescription>
              Tailwind CSS for React Native using CSS variables
            </PackageInfoDescription>
            <PackageInfoContent>
              <PackageInfoDependencies>
                <PackageInfoDependency
                  testID="package-dep-tw"
                  name="tailwindcss"
                  version="^3.4.0"
                />
                <PackageInfoDependency
                  testID="package-dep-react-native"
                  name="react-native"
                  version=">=0.73.0"
                />
                <PackageInfoDependency
                  testID="package-dep-expo"
                  name="expo"
                  version=">=50.0.0"
                />
              </PackageInfoDependencies>
            </PackageInfoContent>
          </PackageInfo>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Added &amp; Removed
          </Text>
          <View className="gap-3">
            <PackageInfo
              testID="package-info-added"
              name="lucide-react-native"
              newVersion="0.460.0"
              changeType="added"
            />
            <PackageInfo
              testID="package-info-removed"
              name="@expo/vector-icons"
              currentVersion="14.0.2"
              changeType="removed"
            />
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-foreground mb-2">
            Usage
          </Text>
          <View className="bg-muted rounded-lg p-4">
            <Text className="text-sm text-muted-foreground font-mono">
              {`import { PackageInfo } from "@ai-native-elements/react-native";

<PackageInfo
  name="react"
  currentVersion="18.2.0"
  newVersion="19.0.0"
  changeType="major"
/>`}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
