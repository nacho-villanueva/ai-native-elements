const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Watch all files in the monorepo
config.watchFolders = [monorepoRoot];

// Let Metro know where to resolve packages from
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];

// Resolve library packages to source files for hot reload
const librarySourceMap = {
  "@ai-native-elements/react-native": path.resolve(monorepoRoot, "packages/elements/src/index.ts"),
  "@ai-native-elements/shadcn-ui": path.resolve(monorepoRoot, "packages/shadcn-ui/src/index.ts"),
};

// Custom resolver for hot reload and @/ alias
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Resolve library packages to source files for hot reload
  if (librarySourceMap[moduleName]) {
    return {
      filePath: librarySourceMap[moduleName],
      type: "sourceFile",
    };
  }

  // Handle @/ imports from shadcn-ui
  if (moduleName.startsWith("@/") && context.originModulePath.includes("shadcn-ui")) {
    const newModuleName = moduleName.replace(
      "@/",
      path.resolve(monorepoRoot, "packages/shadcn-ui/src") + "/"
    );
    return context.resolveRequest(context, newModuleName, platform);
  }

  // Default resolution
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: "./global.css" });
