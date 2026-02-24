"use client";

import { View, type ViewProps } from "react-native";
import { Badge, Text } from "@ai-native-elements/shadcn-ui";
import { createContext, useContext, type ReactNode } from "react";
import { cn } from "./utils";

// ============================================================================
// Types
// ============================================================================

type ChangeType = "major" | "minor" | "patch" | "added" | "removed";

interface PackageInfoContextType {
  name: string;
  currentVersion?: string;
  newVersion?: string;
  changeType?: ChangeType;
}

const PackageInfoContext = createContext<PackageInfoContextType>({
  name: "",
});

// ============================================================================
// PackageInfo (root)
// ============================================================================

export type PackageInfoProps = ViewProps & {
  name: string;
  currentVersion?: string;
  newVersion?: string;
  changeType?: ChangeType;
  children?: ReactNode;
  testID?: string;
};

export const PackageInfo = ({
  name,
  currentVersion,
  newVersion,
  changeType,
  className,
  children,
  testID,
  ...props
}: PackageInfoProps) => (
  <PackageInfoContext.Provider value={{ name, currentVersion, newVersion, changeType }}>
    <View
      testID={testID}
      className={cn("rounded-lg border border-border bg-background p-4", className)}
      {...props}
    >
      {children ?? (
        <>
          <PackageInfoHeader>
            <PackageInfoName />
            {changeType && <PackageInfoChangeType />}
          </PackageInfoHeader>
          {(currentVersion || newVersion) && <PackageInfoVersion />}
        </>
      )}
    </View>
  </PackageInfoContext.Provider>
);

// ============================================================================
// PackageInfoHeader
// ============================================================================

export type PackageInfoHeaderProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const PackageInfoHeader = ({
  className,
  children,
  testID,
  ...props
}: PackageInfoHeaderProps) => (
  <View
    testID={testID}
    className={cn("flex flex-row items-center justify-between gap-2", className)}
    {...props}
  >
    {children}
  </View>
);

// ============================================================================
// PackageInfoName
// ============================================================================

export type PackageInfoNameProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const PackageInfoName = ({
  className,
  children,
  testID,
  ...props
}: PackageInfoNameProps) => {
  const { name } = useContext(PackageInfoContext);

  return (
    <View
      testID={testID}
      className={cn("flex flex-row items-center gap-2", className)}
      {...props}
    >
      <Text className="text-sm text-muted-foreground">{"\uD83D\uDCE6"}</Text>
      <Text className="font-medium font-mono text-sm text-foreground">
        {children ?? name}
      </Text>
    </View>
  );
};

// ============================================================================
// PackageInfoChangeType
// ============================================================================

const changeTypeStyles: Record<ChangeType, string> = {
  major: "bg-red-100 dark:bg-red-900/30",
  minor: "bg-yellow-100 dark:bg-yellow-900/30",
  patch: "bg-green-100 dark:bg-green-900/30",
  added: "bg-blue-100 dark:bg-blue-900/30",
  removed: "bg-gray-100 dark:bg-gray-900/30",
};

const changeTypeTextStyles: Record<ChangeType, string> = {
  major: "text-red-700 dark:text-red-400",
  minor: "text-yellow-700 dark:text-yellow-400",
  patch: "text-green-700 dark:text-green-400",
  added: "text-blue-700 dark:text-blue-400",
  removed: "text-gray-700 dark:text-gray-400",
};

const changeTypeIcons: Record<ChangeType, string> = {
  major: "\u2192",
  minor: "\u2192",
  patch: "\u2192",
  added: "+",
  removed: "\u2212",
};

export type PackageInfoChangeTypeProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const PackageInfoChangeType = ({
  className,
  children,
  testID,
  ...props
}: PackageInfoChangeTypeProps) => {
  const { changeType } = useContext(PackageInfoContext);

  if (!changeType) {
    return null;
  }

  return (
    <Badge
      className={cn(
        "gap-1 text-xs capitalize",
        changeTypeStyles[changeType],
        className
      )}
      variant="secondary"
      {...(testID ? { testID } : {})}
      {...props}
    >
      <Text className={cn("text-xs", changeTypeTextStyles[changeType])}>
        {changeTypeIcons[changeType]}
      </Text>
      <Text className={cn("text-xs capitalize", changeTypeTextStyles[changeType])}>
        {children ?? changeType}
      </Text>
    </Badge>
  );
};

// ============================================================================
// PackageInfoVersion
// ============================================================================

export type PackageInfoVersionProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const PackageInfoVersion = ({
  className,
  children,
  testID,
  ...props
}: PackageInfoVersionProps) => {
  const { currentVersion, newVersion } = useContext(PackageInfoContext);

  if (!(currentVersion || newVersion)) {
    return null;
  }

  return (
    <View
      testID={testID}
      className={cn(
        "mt-2 flex flex-row items-center gap-2",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          {currentVersion && (
            <Text className="font-mono text-sm text-muted-foreground">{currentVersion}</Text>
          )}
          {currentVersion && newVersion && (
            <Text className="text-sm text-muted-foreground">{"\u2192"}</Text>
          )}
          {newVersion && (
            <Text className="font-medium font-mono text-sm text-foreground">{newVersion}</Text>
          )}
        </>
      )}
    </View>
  );
};

// ============================================================================
// PackageInfoDescription
// ============================================================================

export type PackageInfoDescriptionProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const PackageInfoDescription = ({
  className,
  children,
  testID,
  ...props
}: PackageInfoDescriptionProps) => (
  <View
    testID={testID}
    className={cn("mt-2", className)}
    {...props}
  >
    <Text className="text-sm text-muted-foreground">{children}</Text>
  </View>
);

// ============================================================================
// PackageInfoContent
// ============================================================================

export type PackageInfoContentProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const PackageInfoContent = ({
  className,
  children,
  testID,
  ...props
}: PackageInfoContentProps) => (
  <View
    testID={testID}
    className={cn("mt-3 border-t border-border pt-3", className)}
    {...props}
  >
    {children}
  </View>
);

// ============================================================================
// PackageInfoDependencies
// ============================================================================

export type PackageInfoDependenciesProps = ViewProps & {
  children?: ReactNode;
  testID?: string;
};

export const PackageInfoDependencies = ({
  className,
  children,
  testID,
  ...props
}: PackageInfoDependenciesProps) => (
  <View
    testID={testID}
    className={cn("gap-2", className)}
    {...props}
  >
    <Text className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
      Dependencies
    </Text>
    <View className="gap-1">{children}</View>
  </View>
);

// ============================================================================
// PackageInfoDependency
// ============================================================================

export type PackageInfoDependencyProps = ViewProps & {
  name: string;
  version?: string;
  children?: ReactNode;
  testID?: string;
};

export const PackageInfoDependency = ({
  name,
  version,
  className,
  children,
  testID,
  ...props
}: PackageInfoDependencyProps) => (
  <View
    testID={testID}
    className={cn("flex flex-row items-center justify-between", className)}
    {...props}
  >
    {children ?? (
      <>
        <Text className="font-mono text-sm text-muted-foreground">{name}</Text>
        {version && (
          <Text className="font-mono text-xs text-foreground">{version}</Text>
        )}
      </>
    )}
  </View>
);
