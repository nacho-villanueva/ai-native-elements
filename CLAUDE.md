# AI Native Elements

A React Native port of [Vercel's AI Elements](https://github.com/vercel/ai-elements) library for building AI-native mobile applications.

## Project Overview

This library provides pre-built, customizable React Native components for AI-powered applications, styled with [NativeWind](https://github.com/nativewind/nativewind) (Tailwind CSS for React Native) and built on [React Native Reusables](https://github.com/founded-labs/react-native-reusables) patterns.

## Project Structure

Mirrors the original AI Elements monorepo structure:

```
ai-native-elements/
├── packages/
│   ├── elements/              # @ai-native-elements/react-native (AI components)
│   │   ├── src/               # All AI components flat here
│   │   │   ├── index.ts
│   │   │   ├── utils.ts
│   │   │   ├── loader.tsx
│   │   │   └── ...
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   ├── tsup.config.ts
│   │   └── package.json
│   │
│   ├── shadcn-ui/             # @ai-native-elements/shadcn-ui (base UI components)
│   │   ├── src/
│   │   │   ├── components/ui/  # Button, Card, Dialog, etc.
│   │   │   ├── lib/            # utils.ts
│   │   │   └── index.ts
│   │   ├── tailwind.config.js
│   │   ├── components.json
│   │   └── package.json
│   │
│   ├── examples/              # @ai-native-elements/examples (Expo test app)
│   │   ├── App.tsx
│   │   ├── tailwind.config.js
│   │   └── package.json
│   │
│   ├── tailwind-config/       # Shared Tailwind configuration
│   │   ├── index.js
│   │   ├── global.css
│   │   └── package.json
│   │
│   └── typescript-config/     # Shared TypeScript configuration
│       ├── base.json
│       ├── react-native.json
│       └── package.json
│
├── .reference/                # Reference repos (git-ignored)
│   └── ai-elements/           # Clone of original Vercel AI Elements
│
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.json
├── package.json
├── CLAUDE.md
└── TODO.md
```

## Packages

### @ai-native-elements/react-native (packages/elements)
The main AI components library - ports of Vercel's AI Elements.

### @ai-native-elements/shadcn-ui (packages/shadcn-ui)
Base UI components from react-native-reusables (shadcn/ui for React Native):
- Accordion, Alert, Alert Dialog, Aspect Ratio, Avatar
- Badge, Button, Card, Checkbox, Collapsible
- Context Menu, Dialog, Dropdown Menu, Hover Card
- Icon, Input, Label, Menubar
- Popover, Progress, Radio Group, Select
- Separator, Skeleton, Switch, Tabs
- Text, Textarea, Toggle, Toggle Group, Tooltip

## Tech Stack

- **React Native** - Mobile framework
- **NativeWind v4** - Tailwind CSS for React Native
- **React Native Reusables** - shadcn/ui patterns for React Native
- **@rn-primitives** - Accessible UI primitives
- **TypeScript** - Type safety
- **tsup** - Build tool for library bundling
- **pnpm** - Package manager
- **Turborepo** - Monorepo build system

## Commands

```bash
# From root
pnpm install             # Install all dependencies
pnpm build               # Build all packages
pnpm dev                 # Watch mode for all packages
pnpm typecheck           # Run TypeScript checks
```

## Component Migration Process

**IMPORTANT:** Always start by reading the reference implementation. The goal is to create a React Native port that matches the original API as closely as possible.

### Step 1: Read the Reference Implementation

```bash
# Reference location
.reference/ai-elements/packages/elements/src/[component].tsx
```

Before writing any code:
1. Read the **entire** reference file
2. Identify all exported components and their props
3. Note all sub-components (composition pattern)
4. Identify hooks and context providers
5. List all imports and dependencies

### Step 2: Analyze What Needs Adaptation

Create a mental map of what can be ported directly vs what needs React Native adaptation:

| Web (Reference) | React Native Equivalent |
|-----------------|------------------------|
| `<div>` | `<View>` |
| `<span>`, `<p>`, `<h1>` | `<Text>` (from shadcn-ui) |
| `<button>` | `<Button>` (from shadcn-ui) or `<Pressable>` |
| `<input>` | `<TextInput>` |
| `onClick` | `onPress` |
| `HTMLAttributes<HTMLDivElement>` | `ViewProps` |
| `ComponentProps<"div">` | `ViewProps` |
| CSS `group-[.is-user]:` selectors | Pass `from` prop explicitly |
| `className="hidden"` | `className="hidden"` or conditional render |
| Web-only libs (use-stick-to-bottom) | Native alternatives (ScrollView + refs) |

### Step 3: Write the Component

Follow this structure to match the reference:

```tsx
"use client";

// 1. React Native imports
import { View, type ViewProps } from "react-native";

// 2. shadcn-ui imports (match reference @repo/shadcn-ui imports)
import { Text, Button } from "@ai-native-elements/shadcn-ui";

// 3. Local utils
import { cn } from "./utils";

// 4. React imports
import { createContext, useContext, useState } from "react";

// ============================================================================
// Types (copy from reference, adapt HTMLAttributes -> ViewProps)
// ============================================================================

export type ComponentProps = ViewProps & {
  // Keep same props as reference
};

// ============================================================================
// Context (copy exactly from reference if present)
// ============================================================================

// ============================================================================
// Main Component
// ============================================================================

export const Component = ({ className, ...props }: ComponentProps) => (
  <View
    className={cn(
      // Copy Tailwind classes from reference exactly
      "flex w-full flex-col gap-2",
      className
    )}
    {...props}
  />
);

// ============================================================================
// Sub-components (maintain same export names as reference)
// ============================================================================
```

### Step 4: Match All Exports

The reference file's exports must match your implementation:

```tsx
// If reference exports these:
export { Message, MessageContent, MessageActions, MessageResponse };

// Your file must export the same:
export { Message, MessageContent, MessageActions, MessageResponse };
```

### Step 5: Handle Web-Only Features

Some features need React Native alternatives:

| Web Feature | React Native Solution |
|-------------|----------------------|
| `use-stick-to-bottom` | ScrollView with `scrollToEnd()` + `onScroll` tracking |
| File drag-and-drop | Omit or use `expo-document-picker` |
| `<input type="file">` | `expo-image-picker` or `expo-document-picker` |
| Streamdown (markdown) | `react-native-markdown-display` (see below) |
| CSS animations | `react-native-reanimated` |
| `framer-motion` | `react-native-reanimated` |
| Lucide icons | `lucide-react-native` or Text fallbacks |

### Markdown Rendering (MessageResponse)

The original AI Elements uses `Streamdown` for markdown rendering. We use `react-native-markdown-display` as the React Native equivalent.

**Implementation pattern** (from platform-biwa):

```tsx
import Markdown from "react-native-markdown-display";

// MessageResponse automatically uses react-native-markdown-display
// when installed as a peer dependency
<MessageResponse>
  {`# Markdown Content

This is **bold** and *italic*.

\`\`\`typescript
const code = "highlighted";
\`\`\`
`}
</MessageResponse>
```

**Customizing styles:**
```tsx
import { getDefaultMarkdownStyles } from "@ai-native-elements/react-native";

// Get default dark mode styles
const styles = getDefaultMarkdownStyles(false); // isUser = false

// Or customize
<MessageResponse markdownStyles={{
  ...styles,
  code_block: { ...styles.code_block, backgroundColor: '#2d2d2d' }
}}>
  {content}
</MessageResponse>
```

**Key styling elements:**
- Code blocks with monospace font and dark background
- Inline code with subtle background
- Headers with proper hierarchy
- Lists with proper spacing
- Blockquotes with left border
- Tables with borders
- Links styled without underlines

### Step 6: Update Exports and Create Example

1. Add exports to `packages/elements/src/index.ts`
2. Create example page in `packages/examples/app/components/[component].tsx`
3. Add route to `packages/examples/app/_layout.tsx`

### Step 7: Build and Test

```bash
pnpm build  # Verify no TypeScript errors
cd packages/examples && npx expo export --platform android  # Test bundling
```

### Step 8: Update TODO.md

Mark the component as complete and update counts.

---

## Migration Checklist

For each component, verify:

- [ ] Read reference implementation completely
- [ ] All exported components match reference names
- [ ] All props match reference (adapted for RN)
- [ ] All hooks match reference names
- [ ] Context providers match reference pattern
- [ ] Tailwind classes copied exactly where possible
- [ ] Added to `index.ts` exports
- [ ] Example page created
- [ ] Route added to drawer navigation
- [ ] Build passes
- [ ] TODO.md updated

---

## React Native Adaptations Reference

### CSS Group Selectors
Reference uses CSS group selectors that don't work in RN:
```tsx
// Reference (web)
className="group-[.is-user]:bg-secondary"

// React Native - pass prop explicitly
<MessageContent from={from}>
  // Then use: from === "user" ? "bg-secondary" : "bg-transparent"
```

### Conditional Display
```tsx
// Reference (web)
className={index === current ? "block" : "hidden"}

// React Native - same works with NativeWind
className={index === current ? "flex" : "hidden"}
```

### Scroll Containers
```tsx
// Reference (web) - use-stick-to-bottom
<StickToBottom>{children}</StickToBottom>

// React Native
<ScrollView
  ref={scrollViewRef}
  onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
>
  {children}
</ScrollView>
```

### Event Handlers
```tsx
// Reference (web)
onClick={handleClick}

// React Native
onPress={handlePress}
```

### Screen Reader Text
```tsx
// Reference (web)
<span className="sr-only">Label</span>

// React Native - use accessibilityLabel on parent
<Button accessibilityLabel="Label">
```

## Original AI Elements Components (48 files)

All components to port from `packages/elements/src/`:

```
agent.tsx           artifact.tsx        attachments.tsx
audio-player.tsx    canvas.tsx          chain-of-thought.tsx
checkpoint.tsx      code-block.tsx      commit.tsx
confirmation.tsx    connection.tsx      context.tsx
controls.tsx        conversation.tsx    edge.tsx
environment-variables.tsx               file-tree.tsx
image.tsx           inline-citation.tsx loader.tsx
message.tsx         mic-selector.tsx    model-selector.tsx
node.tsx            open-in-chat.tsx    package-info.tsx
panel.tsx           persona.tsx         plan.tsx
prompt-input.tsx    queue.tsx           reasoning.tsx
sandbox.tsx         schema-display.tsx  shimmer.tsx
snippet.tsx         sources.tsx         speech-input.tsx
stack-trace.tsx     suggestion.tsx      task.tsx
terminal.tsx        test-results.tsx    tool.tsx
toolbar.tsx         transcription.tsx   voice-selector.tsx
web-preview.tsx
```

## Progress Tracking

See `TODO.md` for detailed component porting progress.

## Reference Repository

The `.reference/ai-elements/` folder contains a clone of the original Vercel AI Elements repository for easy reference when porting components. This folder is git-ignored.

**Usage:**
- Original component source: `.reference/ai-elements/packages/elements/src/[component].tsx`
- Original shadcn-ui: `.reference/ai-elements/packages/shadcn-ui/`

## Notes for Claude

### Before Starting Any Component Migration

1. **ALWAYS read the reference first**: `.reference/ai-elements/packages/elements/src/[component].tsx`
2. Check `TODO.md` for current status
3. Understand ALL exports, props, hooks, and sub-components in the reference

### During Migration

1. **Match the reference API exactly** - same component names, same prop names, same hooks
2. Copy Tailwind classes verbatim where possible
3. Only deviate when React Native requires it (View/Text instead of div/span, onPress instead of onClick)
4. Document any significant deviations with comments

### File Locations

- AI components: `packages/elements/src/[component-name].tsx`
- Example pages: `packages/examples/app/components/[component-name].tsx`
- Drawer routes: `packages/examples/app/_layout.tsx`

### Imports

```tsx
// shadcn-ui components
import { Button, Text, Card } from "@ai-native-elements/shadcn-ui";

// Local utils
import { cn } from "./utils";

// Other AI elements (if needed)
import { Loader } from "./loader";
```

### After Migration

1. Add exports to `packages/elements/src/index.ts`
2. Create example page showing all variants
3. Add route to drawer navigation
4. Run `pnpm build` to verify
5. Update `TODO.md` with completion status

---

## Expo MCP Automation Testing

The project uses the Expo MCP for automated UI testing and navigation. **Always use testIDs for automation - never use coordinate-based taps.**

### Why testIDs?

- **Reliable**: Coordinate taps break when UI changes or screen sizes differ
- **Maintainable**: testIDs are self-documenting and easy to update
- **Consistent**: Works across different device resolutions

### testID Conventions

All interactive elements in the examples app should have testIDs following these patterns:

```tsx
// Navigation elements
testID="nav-home"           // Drawer navigation items
testID="nav-loader"
testID="nav-suggestion"

// Home page cards
testID="card-loader"        // Clickable cards on home
testID="card-shimmer"

// Component-specific elements
testID="suggestion-joke"    // Interactive component elements
testID="loader-blue"
testID="theme-toggle"

// Actions
testID="action-copy"        // Action buttons
testID="action-like"

// Form elements
testID="prompt-textarea-basic"
testID="prompt-submit-basic"
```

### Adding testIDs to Library Components

When creating new components in `packages/elements/src/`, **always include testID prop support**:

```tsx
export type MyComponentProps = ViewProps & {
  // ... other props
  testID?: string;  // Always include testID
};

export function MyComponent({ testID, ...props }: MyComponentProps) {
  return (
    <View testID={testID} {...props}>
      {/* ... */}
    </View>
  );
}
```

### Adding testIDs to Example Pages

When creating example pages in `packages/examples/app/components/`:

```tsx
// Good - uses testID
<Suggestion testID="suggestion-joke" suggestion="Tell me a joke" onPress={handlePress} />

// Bad - no testID, will require coordinate taps
<Suggestion suggestion="Tell me a joke" onPress={handlePress} />
```

### Using Expo MCP Tools

**IMPORTANT: Always use testID-based interactions, never coordinates.**

```tsx
// ✅ CORRECT - Use testID
automation_tap with testID="suggestion-joke"
automation_tap with testID="theme-toggle"
automation_tap with testID="nav-conversation"

// ❌ WRONG - Never use coordinates
automation_tap with x=350 y=605  // Fragile, breaks easily
```

Available Expo MCP tools:
- `automation_tap` - Tap by testID (preferred) or coordinates (avoid)
- `automation_take_screenshot` - Capture current screen
- `automation_find_view` - Find and inspect views by testID
- `expo_router_sitemap` - List all routes in the app
- `collect_app_logs` - Get JS console or native logs

### Hot Reload

All changes to the component library (`packages/elements/src/`) will automatically hot reload in the example app. Manual reload is rarely needed.

### Testing Checklist

When adding a new component:
- [ ] Add `testID` prop to the component type
- [ ] Pass `testID` to the root element
- [ ] Add testIDs to all interactive elements in the example page
- [ ] Verify automation works: `automation_tap with testID="your-test-id"`
- [ ] Take screenshot to confirm: `automation_take_screenshot`
