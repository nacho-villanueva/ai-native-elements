import "../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { View, Text, Pressable } from "react-native";
import { useState, createContext, useContext } from "react";

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function RootLayout() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <GestureHandlerRootView
        style={{ flex: 1 }}
        className={darkMode ? "dark" : ""}
      >
        <Drawer
          screenOptions={{
            headerStyle: {
              backgroundColor: darkMode ? "#09090b" : "#ffffff",
            },
            headerTintColor: darkMode ? "#fafafa" : "#09090b",
            drawerStyle: {
              backgroundColor: darkMode ? "#09090b" : "#ffffff",
            },
            drawerActiveTintColor: darkMode ? "#fafafa" : "#09090b",
            drawerInactiveTintColor: darkMode ? "#a1a1aa" : "#71717a",
            headerRight: () => (
              <Pressable
                testID="theme-toggle"
                onPress={toggleDarkMode}
                className="mr-4 px-3 py-1 bg-secondary rounded-md"
              >
                <Text className="text-secondary-foreground text-sm">
                  {darkMode ? "Light" : "Dark"}
                </Text>
              </Pressable>
            ),
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: () => <Text testID="nav-home" className="text-foreground">Home</Text>,
              title: "AI Native Elements",
            }}
          />
          <Drawer.Screen
            name="components/loader"
            options={{
              drawerLabel: () => <Text testID="nav-loader" className="text-foreground">Loader</Text>,
              title: "Loader",
            }}
          />
          <Drawer.Screen
            name="components/shimmer"
            options={{
              drawerLabel: () => <Text testID="nav-shimmer" className="text-foreground">Shimmer</Text>,
              title: "Shimmer",
            }}
          />
          <Drawer.Screen
            name="components/suggestion"
            options={{
              drawerLabel: () => <Text testID="nav-suggestion" className="text-foreground">Suggestion</Text>,
              title: "Suggestion",
            }}
          />
          <Drawer.Screen
            name="components/message"
            options={{
              drawerLabel: () => <Text testID="nav-message" className="text-foreground">Message</Text>,
              title: "Message",
            }}
          />
          <Drawer.Screen
            name="components/conversation"
            options={{
              drawerLabel: () => <Text testID="nav-conversation" className="text-foreground">Conversation</Text>,
              title: "Conversation",
            }}
          />
          <Drawer.Screen
            name="components/prompt-input"
            options={{
              drawerLabel: () => <Text testID="nav-prompt-input" className="text-foreground">Prompt Input</Text>,
              title: "Prompt Input",
            }}
          />
          <Drawer.Screen
            name="components/terminal"
            options={{
              drawerLabel: () => <Text testID="nav-terminal" className="text-foreground">Terminal</Text>,
              title: "Terminal",
            }}
          />
          <Drawer.Screen
            name="components/tool"
            options={{
              drawerLabel: () => <Text testID="nav-tool" className="text-foreground">Tool</Text>,
              title: "Tool",
            }}
          />
          <Drawer.Screen
            name="components/code-block"
            options={{
              drawerLabel: () => <Text testID="nav-code-block" className="text-foreground">Code Block</Text>,
              title: "Code Block",
            }}
          />
          <Drawer.Screen
            name="components/file-tree"
            options={{
              drawerLabel: () => <Text testID="nav-file-tree" className="text-foreground">File Tree</Text>,
              title: "File Tree",
            }}
          />
          <Drawer.Screen
            name="components/commit"
            options={{
              drawerLabel: () => <Text testID="nav-commit" className="text-foreground">Commit</Text>,
              title: "Commit",
            }}
          />
          <Drawer.Screen
            name="components/schema-display"
            options={{
              drawerLabel: () => <Text testID="nav-schema-display" className="text-foreground">Schema Display</Text>,
              title: "Schema Display",
            }}
          />
          <Drawer.Screen
            name="components/test-results"
            options={{
              drawerLabel: () => <Text testID="nav-test-results" className="text-foreground">Test Results</Text>,
              title: "Test Results",
            }}
          />
          <Drawer.Screen
            name="components/stack-trace"
            options={{
              drawerLabel: () => <Text testID="nav-stack-trace" className="text-foreground">Stack Trace</Text>,
              title: "Stack Trace",
            }}
          />
          <Drawer.Screen
            name="components/checkpoint"
            options={{
              drawerLabel: () => <Text testID="nav-checkpoint" className="text-foreground">Checkpoint</Text>,
              title: "Checkpoint",
            }}
          />
          <Drawer.Screen
            name="components/environment-variables"
            options={{
              drawerLabel: () => <Text testID="nav-environment-variables" className="text-foreground">Environment Variables</Text>,
              title: "Environment Variables",
            }}
          />
          <Drawer.Screen
            name="components/package-info"
            options={{
              drawerLabel: () => <Text testID="nav-package-info" className="text-foreground">Package Info</Text>,
              title: "Package Info",
            }}
          />
          <Drawer.Screen
            name="components/attachments"
            options={{
              drawerLabel: () => <Text testID="nav-attachments" className="text-foreground">Attachments</Text>,
              title: "Attachments",
            }}
          />
        </Drawer>
        <StatusBar style={darkMode ? "light" : "dark"} />
      </GestureHandlerRootView>
    </ThemeContext.Provider>
  );
}
