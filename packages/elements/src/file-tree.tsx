"use client";

import { View, type ViewProps, Pressable } from "react-native";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Text,
} from "@ai-native-elements/shadcn-ui";
import { cn } from "./utils";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

// ============================================================================
// FileTree Context
// ============================================================================

interface FileTreeContextType {
  expandedPaths: Set<string>;
  togglePath: (path: string) => void;
  selectedPath?: string;
  onSelect?: (path: string) => void;
}

const FileTreeContext = createContext<FileTreeContextType>({
  expandedPaths: new Set(),
  togglePath: () => undefined,
});

// ============================================================================
// FileTree (Root)
// ============================================================================

export type FileTreeProps = ViewProps & {
  expanded?: Set<string>;
  defaultExpanded?: Set<string>;
  selectedPath?: string;
  onSelect?: (path: string) => void;
  onExpandedChange?: (expanded: Set<string>) => void;
  children?: ReactNode;
  testID?: string;
};

export const FileTree = ({
  expanded: controlledExpanded,
  defaultExpanded = new Set(),
  selectedPath,
  onSelect,
  onExpandedChange,
  className,
  children,
  testID,
  ...props
}: FileTreeProps) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const expandedPaths = controlledExpanded ?? internalExpanded;

  const togglePath = (path: string) => {
    const newExpanded = new Set(expandedPaths);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setInternalExpanded(newExpanded);
    onExpandedChange?.(newExpanded);
  };

  return (
    <FileTreeContext.Provider
      value={{ expandedPaths, togglePath, selectedPath, onSelect }}
    >
      <View
        className={cn(
          "rounded-lg border bg-background font-mono",
          className
        )}
        accessibilityRole="none"
        testID={testID}
        {...props}
      >
        <View className="p-2">{children}</View>
      </View>
    </FileTreeContext.Provider>
  );
};

// ============================================================================
// FileTreeFolder Context
// ============================================================================

interface FileTreeFolderContextType {
  path: string;
  name: string;
  isExpanded: boolean;
}

const FileTreeFolderContext = createContext<FileTreeFolderContextType>({
  path: "",
  name: "",
  isExpanded: false,
});

// ============================================================================
// FileTreeFolder
// ============================================================================

export type FileTreeFolderProps = ViewProps & {
  path: string;
  name: string;
  children?: ReactNode;
  testID?: string;
};

export const FileTreeFolder = ({
  path,
  name,
  className,
  children,
  testID,
  ...props
}: FileTreeFolderProps) => {
  const { expandedPaths, togglePath, selectedPath, onSelect } =
    useContext(FileTreeContext);
  const isExpanded = expandedPaths.has(path);
  const isSelected = selectedPath === path;

  return (
    <FileTreeFolderContext.Provider value={{ path, name, isExpanded }}>
      <Collapsible onOpenChange={() => togglePath(path)} open={isExpanded}>
        <View
          className={cn("", className)}
          accessible={true}
          testID={testID}
          {...props}
        >
          <CollapsibleTrigger
            className={cn(
              "flex flex-row w-full items-center gap-1 rounded px-2 py-1",
              isSelected && "bg-muted"
            )}
            onPress={() => onSelect?.(path)}
          >
            <Text className="text-xs text-muted-foreground">
              {isExpanded ? "\u25BC" : "\u25B6"}
            </Text>
            <FileTreeIcon>
              <Text className="text-xs">
                {isExpanded ? "\uD83D\uDCC2" : "\uD83D\uDCC1"}
              </Text>
            </FileTreeIcon>
            <FileTreeName>{name}</FileTreeName>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <View className="ml-4 border-l pl-2">{children}</View>
          </CollapsibleContent>
        </View>
      </Collapsible>
    </FileTreeFolderContext.Provider>
  );
};

// ============================================================================
// FileTreeFile Context
// ============================================================================

interface FileTreeFileContextType {
  path: string;
  name: string;
}

const FileTreeFileContext = createContext<FileTreeFileContextType>({
  path: "",
  name: "",
});

// ============================================================================
// FileTreeFile
// ============================================================================

export type FileTreeFileProps = ViewProps & {
  path: string;
  name: string;
  icon?: ReactNode;
  children?: ReactNode;
  testID?: string;
};

export const FileTreeFile = ({
  path,
  name,
  icon,
  className,
  children,
  testID,
  ...props
}: FileTreeFileProps) => {
  const { selectedPath, onSelect } = useContext(FileTreeContext);
  const isSelected = selectedPath === path;

  return (
    <FileTreeFileContext.Provider value={{ path, name }}>
      <Pressable
        className={cn(
          "flex flex-row cursor-pointer items-center gap-1 rounded px-2 py-1",
          isSelected && "bg-muted",
          className
        )}
        onPress={() => onSelect?.(path)}
        accessible={true}
        testID={testID}
        {...props}
      >
        {children ?? (
          <>
            <View className="w-4" /> {/* Spacer for alignment */}
            <FileTreeIcon>
              {icon ?? (
                <Text className="text-xs text-muted-foreground">
                  {"\uD83D\uDCC4"}
                </Text>
              )}
            </FileTreeIcon>
            <FileTreeName>{name}</FileTreeName>
          </>
        )}
      </Pressable>
    </FileTreeFileContext.Provider>
  );
};

// ============================================================================
// FileTreeIcon
// ============================================================================

export type FileTreeIconProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const FileTreeIcon = ({
  className,
  children,
  testID,
  ...props
}: FileTreeIconProps) => (
  <View className={cn("shrink-0", className)} testID={testID} {...props}>
    {children}
  </View>
);

// ============================================================================
// FileTreeName
// ============================================================================

export type FileTreeNameProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const FileTreeName = ({
  className,
  children,
  testID,
  ...props
}: FileTreeNameProps) => (
  <View className={cn("flex-1 min-w-0", className)} testID={testID} {...props}>
    <Text className="truncate text-sm">{children}</Text>
  </View>
);

// ============================================================================
// FileTreeActions
// ============================================================================

export type FileTreeActionsProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const FileTreeActions = ({
  className,
  children,
  testID,
  ...props
}: FileTreeActionsProps) => (
  <View
    className={cn("ml-auto flex flex-row items-center gap-1", className)}
    testID={testID}
    {...props}
  >
    {children}
  </View>
);
