# AI Native Elements

A React Native port of [Vercel's AI Elements](https://github.com/vercel/ai-elements) - pre-built, customizable components for building AI-native mobile applications.

Built with [NativeWind](https://github.com/nativewind/nativewind) (Tailwind CSS for React Native) and following [React Native Reusables](https://github.com/founded-labs/react-native-reusables) patterns.

## Installation

```bash
npm install @ai-native-elements/react-native
# or
pnpm add @ai-native-elements/react-native
```

### Peer Dependencies

Make sure you have these installed in your project:

```bash
npm install nativewind react-native-reanimated
```

And configure NativeWind following their [installation guide](https://www.nativewind.dev/docs/getting-started/installation).

## Usage

```tsx
import { Message, Conversation, PromptInput } from "@ai-native-elements/react-native";

export function ChatScreen() {
  return (
    <Conversation>
      <Message role="user">
        Hello, how are you?
      </Message>
      <Message role="assistant">
        I'm doing well, thank you for asking!
      </Message>
      <PromptInput
        placeholder="Type a message..."
        onSubmit={(text) => console.log(text)}
      />
    </Conversation>
  );
}
```

## Components

### Chatbot Components
- `Conversation` - Chat container with auto-scroll
- `Message` - Message display with role-based styling
- `PromptInput` - User input with attachments
- `CodeBlock` - Syntax highlighted code display
- `Reasoning` - Collapsible chain-of-thought
- `Tool` - Tool call display
- `Suggestion` - Quick suggestion chips
- `Loader` / `Shimmer` - Loading states
- And many more...

### Vibe-Coding Components
- `Artifact` - Generated artifact display
- `WebPreview` - Embedded web preview

### Development Components
- `Terminal` - Terminal output display
- `FileTree` - File explorer tree
- `CodeSnippet` - Small code samples
- And more...

## Theming

Components use CSS variables for theming. Add these to your `global.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    /* ... see packages/elements/global.css for full list */
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    /* ... dark mode values */
  }
}
```

## Development

This is a monorepo using pnpm and Turborepo.

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Watch mode
pnpm dev

# Type check
pnpm typecheck
```

## Project Structure

```
ai-native-elements/
├── packages/
│   └── elements/          # @ai-native-elements/react-native
│       ├── src/           # Component source files
│       └── __tests__/     # Tests
├── pnpm-workspace.yaml
├── turbo.json
└── TODO.md                # Porting progress
```

## Contributing

See [TODO.md](./TODO.md) for the component porting progress and what needs to be done.

## License

MIT

## Credits

- [Vercel AI Elements](https://github.com/vercel/ai-elements) - Original library
- [NativeWind](https://github.com/nativewind/nativewind) - Tailwind CSS for React Native
- [React Native Reusables](https://github.com/founded-labs/react-native-reusables) - shadcn/ui patterns
