# AI Native Elements - Component Porting Progress

This document tracks the progress of porting [Vercel AI Elements](https://github.com/vercel/ai-elements) to React Native using [NativeWind](https://github.com/nativewind/nativewind) and [React Native Reusables](https://github.com/founded-labs/react-native-reusables).

## Legend
- [ ] Not started
- [~] Source ported, missing example page
- [x] Completed (source + exported + example page)

---

## Setup & Infrastructure

- [x] Initialize library project
- [x] Configure NativeWind v4
- [x] Set up build tooling (tsup)
- [x] Configure path aliases
- [x] Set up theming (light/dark mode CSS variables)
- [x] Create base utilities (`cn`, etc.)

---

## Chatbot Components

### Core Chat
- [x] `conversation` - Chat container with auto-scroll
- [x] `message` - Message display with role-based styling
- [x] `prompt-input` - User input with attachments
- [ ] `response` - Response container wrapper

### Content Display
- [x] `code-block` - Syntax highlighted code display
- [~] `reasoning` - Collapsible chain-of-thought (no example page)
- [~] `chain-of-thought` - Multi-step reasoning display (no example page)
- [~] `sources` - Citation list display (no example page)
- [~] `inline-citation` - Inline reference markers (no example page)
- [~] `context` - Context/background display (no example page)
- [~] `image` - Image rendering in messages (no example page)

### Tool Interactions
- [x] `tool` - Tool call display
- [~] `confirmation` - Tool approval workflow (no example page)

### Planning & Tasks
- [~] `plan` - AI-generated plans display (no example page)
- [~] `task` - Individual task display (no example page)
- [~] `queue` - Task queue management (no example page)

### UI Feedback
- [x] `loader` - Spinning loader indicator
- [x] `shimmer` - Loading skeleton placeholder
- [x] `suggestion` - Quick suggestion chips

### Actions & Navigation
- [ ] `actions` - Pre-built action buttons
- [ ] `branch` - Conversation branching
- [x] `open-in-chat` - Chat navigation link

### Agent & Model
- [ ] `agent` - Agent display
- [ ] `persona` - Agent profile/avatar
- [x] `model-selector` - AI model picker

### Media & Voice
- [x] `attachments` - File attachments display (placeholder example)
- [ ] `audio-player` - Audio message player
- [ ] `speech-input` - Voice-to-text input
- [ ] `transcription` - Transcription display
- [ ] `mic-selector` - Microphone picker
- [ ] `voice-selector` - Voice selection

---

## Development/Utility Components

- [x] `terminal` - Terminal output display
- [~] `sandbox` - Code execution environment (no example page)
- [x] `file-tree` - File explorer tree
- [~] `snippet` - Small code samples (no example page)
- [x] `commit` - Git commit display
- [x] `schema-display` - Data schema viewer (placeholder example)
- [x] `test-results` - Test execution results (placeholder example)
- [x] `stack-trace` - Error stack trace display (placeholder example)
- [x] `checkpoint` - Workflow checkpoints
- [x] `environment-variables` - Env var display
- [x] `package-info` - Package metadata

---

## Known Issues

- `packages/elements/src/index.ts` has a **merge conflict** between two builder branches — needs manual resolution to include all exports: `schema-display`, `test-results`, `stack-trace`, `attachments`, `model-selector`, `open-in-chat`, `code-block`
- `packages/elements/src/plan.tsx:182` has a pre-existing TypeScript DTS type error (Button ref mismatch) that breaks `pnpm build`
- Example pages for `schema-display`, `test-results`, `stack-trace`, `attachments` are placeholder UIs — need to be wired to real component imports once index.ts conflict is resolved

---

## Summary

| Category | Total | Completed | In Progress |
|----------|-------|-----------|-------------|
| Setup | 6 | 6 | 0 |
| Chatbot | 28 | 9 | 7 |
| Dev/Utility | 11 | 8 | 2 |
| **Total** | **45** | **23** | **9** |

---

## Not Porting
- **Vibe-Coding Components** (`artifact`, `web-preview`) - Web-specific features
- **Workflow Components** (`canvas`, `node`, `edge`, `connection`, `panel`, `toolbar`, `controls`) - Requires ReactFlow which has no React Native equivalent

---

## Notes

### Platform Considerations
- Voice components will need `expo-av` or similar
- File attachments may need `expo-document-picker` / `expo-image-picker`

### Dependencies to Research
- Syntax highlighting: `react-native-syntax-highlighter` or `shiki` alternative
- Markdown rendering: `react-native-markdown-display` (already used in `message`)
- Animations: `react-native-reanimated` (already in RN Reusables)

### Architecture Decisions
- Follow shadcn/ui composition pattern (same as original)
- Use CSS variables via NativeWind for theming
- Maintain TypeScript types from original library
