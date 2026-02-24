# AI Native Elements - Component Porting Progress

This document tracks the progress of porting [Vercel AI Elements](https://github.com/vercel/ai-elements) to React Native using [NativeWind](https://github.com/nativewind/nativewind) and [React Native Reusables](https://github.com/founded-labs/react-native-reusables).

## Legend
- [ ] Not started
- [~] In progress
- [x] Completed

---

## Setup & Infrastructure

- [x] Initialize library project
- [x] Configure NativeWind v4
- [x] Set up build tooling (tsup)
- [x] Configure path aliases
- [x] Set up theming (light/dark mode CSS variables)
- [x] Create base utilities (`cn`, etc.)

---

## Chatbot Components (29)

### Core Chat
- [x] `conversation` - Chat container with auto-scroll
- [x] `message` - Message display with role-based styling
- [x] `prompt-input` - User input with attachments
- [ ] `response` - Response container wrapper

### Content Display
- [ ] `code-block` - Syntax highlighted code display
- [x] `reasoning` - Collapsible chain-of-thought
- [x] `chain-of-thought` - Multi-step reasoning display
- [x] `sources` - Citation list display
- [ ] `inline-citation` - Inline reference markers
- [ ] `context` - Context/background display
- [x] `image` - Image rendering in messages

### Tool Interactions
- [ ] `tool` - Tool call display
- [ ] `confirmation` - Tool approval workflow

### Planning & Tasks
- [x] `plan` - AI-generated plans display
- [x] `task` - Individual task display
- [x] `queue` - Task queue management

### UI Feedback
- [x] `loader` - Spinning loader indicator
- [x] `shimmer` - Loading skeleton placeholder
- [x] `suggestion` - Quick suggestion chips

### Actions & Navigation
- [ ] `actions` - Pre-built action buttons
- [ ] `branch` - Conversation branching
- [ ] `open-in-chat` - Chat navigation link

### Agent & Model
- [ ] `agent` - Agent display
- [ ] `persona` - Agent profile/avatar
- [ ] `model-selector` - AI model picker

### Media & Voice
- [ ] `attachments` - File attachments display
- [ ] `audio-player` - Audio message player
- [ ] `speech-input` - Voice-to-text input
- [ ] `transcription` - Transcription display
- [ ] `mic-selector` - Microphone picker
- [ ] `voice-selector` - Voice selection

---

## Development/Utility Components (11)

- [ ] `terminal` - Terminal output display
- [ ] `sandbox` - Code execution environment
- [ ] `file-tree` - File explorer tree
- [ ] `snippet` - Small code samples
- [ ] `commit` - Git commit display
- [ ] `schema-display` - Data schema viewer
- [ ] `test-results` - Test execution results
- [ ] `stack-trace` - Error stack trace display
- [ ] `checkpoint` - Workflow checkpoints
- [ ] `environment-variables` - Env var display
- [ ] `package-info` - Package metadata

---

## Summary

| Category | Total | Completed |
|----------|-------|-----------|
| Setup | 6 | 6 |
| Chatbot | 29 | 9 |
| Dev/Utility | 11 | 0 |
| **Total** | **46** | **16** |

### Not Porting
- **Vibe-Coding Components** (artifact, web-preview) - Web-specific features
- **Workflow Components** (canvas, node, edge, connection, panel, toolbar, controls) - Requires ReactFlow which has no React Native equivalent

---

## Notes

### Platform Considerations
- Voice components will need `expo-av` or similar

### Dependencies to Research
- Syntax highlighting: `react-native-syntax-highlighter` or `shiki` alternative
- Markdown rendering: `react-native-markdown-display` or custom solution
- Animations: `react-native-reanimated` (already in RN Reusables)

### Architecture Decisions
- Follow shadcn/ui composition pattern (same as original)
- Use CSS variables via NativeWind for theming
- Maintain TypeScript types from original library
