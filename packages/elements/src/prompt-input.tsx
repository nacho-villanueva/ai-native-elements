"use client";

import {
  View,
  TextInput,
  type ViewProps,
  type TextInputProps,
} from "react-native";
import { Text, Button, type ButtonProps } from "@ai-native-elements/shadcn-ui";
import { cn } from "./utils";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type PropsWithChildren,
  type RefObject,
  forwardRef,
} from "react";
import { Loader } from "./loader";

// ============================================================================
// Types
// ============================================================================

export type ChatStatus = "idle" | "submitted" | "streaming" | "error";

export interface PromptInputMessage {
  text: string;
  files?: FileAttachment[];
}

export interface FileAttachment {
  id: string;
  type: "file";
  uri: string;
  mediaType: string;
  filename: string;
}

// ============================================================================
// Provider Context & Types (matches reference API)
// ============================================================================

export interface AttachmentsContext {
  files: FileAttachment[];
  add: (files: FileAttachment[]) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export interface TextInputContext {
  value: string;
  setInput: (v: string) => void;
  clear: () => void;
}

export interface PromptInputControllerProps {
  textInput: TextInputContext;
  attachments: AttachmentsContext;
}

const PromptInputController = createContext<PromptInputControllerProps | null>(
  null
);
const ProviderAttachmentsContext = createContext<AttachmentsContext | null>(
  null
);

export const usePromptInputController = () => {
  const ctx = useContext(PromptInputController);
  if (!ctx) {
    throw new Error(
      "Wrap your component inside <PromptInputProvider> to use usePromptInputController()."
    );
  }
  return ctx;
};

const useOptionalPromptInputController = () =>
  useContext(PromptInputController);

export const useProviderAttachments = () => {
  const ctx = useContext(ProviderAttachmentsContext);
  if (!ctx) {
    throw new Error(
      "Wrap your component inside <PromptInputProvider> to use useProviderAttachments()."
    );
  }
  return ctx;
};

const useOptionalProviderAttachments = () =>
  useContext(ProviderAttachmentsContext);

// ============================================================================
// PromptInputProvider (global state management)
// ============================================================================

export type PromptInputProviderProps = PropsWithChildren<{
  initialInput?: string;
}>;

/**
 * Optional global provider that lifts PromptInput state outside of PromptInput.
 * If you don't use it, PromptInput stays fully self-managed.
 */
export function PromptInputProvider({
  initialInput: initialTextInput = "",
  children,
}: PromptInputProviderProps) {
  const [textInput, setTextInput] = useState(initialTextInput);
  const clearInput = useCallback(() => setTextInput(""), []);

  const [attachmentFiles, setAttachmentFiles] = useState<FileAttachment[]>([]);

  const add = useCallback((files: FileAttachment[]) => {
    if (files.length === 0) return;
    setAttachmentFiles((prev) => prev.concat(files));
  }, []);

  const remove = useCallback((id: string) => {
    setAttachmentFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const clearAttachments = useCallback(() => {
    setAttachmentFiles([]);
  }, []);

  const attachments = useMemo<AttachmentsContext>(
    () => ({
      files: attachmentFiles,
      add,
      remove,
      clear: clearAttachments,
    }),
    [attachmentFiles, add, remove, clearAttachments]
  );

  const controller = useMemo<PromptInputControllerProps>(
    () => ({
      textInput: {
        value: textInput,
        setInput: setTextInput,
        clear: clearInput,
      },
      attachments,
    }),
    [textInput, clearInput, attachments]
  );

  return (
    <PromptInputController.Provider value={controller}>
      <ProviderAttachmentsContext.Provider value={attachments}>
        {children}
      </ProviderAttachmentsContext.Provider>
    </PromptInputController.Provider>
  );
}

// ============================================================================
// Component Context & Hooks
// ============================================================================

const LocalAttachmentsContext = createContext<AttachmentsContext | null>(null);

export const usePromptInputAttachments = () => {
  const provider = useOptionalProviderAttachments();
  const local = useContext(LocalAttachmentsContext);
  const context = local ?? provider;
  if (!context) {
    throw new Error(
      "usePromptInputAttachments must be used within a PromptInput or PromptInputProvider"
    );
  }
  return context;
};

// ============================================================================
// Local PromptInput Context
// ============================================================================

interface PromptInputContextType {
  value: string;
  setValue: (value: string) => void;
  submit: () => void;
  clear: () => void;
}

const PromptInputContext = createContext<PromptInputContextType | null>(null);

export const usePromptInput = () => {
  const context = useContext(PromptInputContext);

  if (!context) {
    throw new Error(
      "usePromptInput must be used within a PromptInput component"
    );
  }

  return context;
};

// ============================================================================
// PromptInput
// ============================================================================

export type PromptInputProps = ViewProps & {
  /**
   * Callback when the form is submitted
   */
  onSubmit: (message: PromptInputMessage) => void | Promise<void>;
  /**
   * Initial input value
   */
  initialValue?: string;
};

export const PromptInput = ({
  className,
  children,
  onSubmit,
  initialValue = "",
  ...props
}: PromptInputProps) => {
  const controller = useOptionalPromptInputController();
  const usingProvider = !!controller;

  const [localValue, setLocalValue] = useState(initialValue);
  const [localFiles, setLocalFiles] = useState<FileAttachment[]>([]);

  const value = usingProvider ? controller.textInput.value : localValue;
  const setValue = usingProvider ? controller.textInput.setInput : setLocalValue;
  const files = usingProvider ? controller.attachments.files : localFiles;

  const clearLocal = useCallback(() => {
    if (usingProvider) {
      controller.textInput.clear();
      controller.attachments.clear();
    } else {
      setLocalValue("");
      setLocalFiles([]);
    }
  }, [usingProvider, controller]);

  const submit = useCallback(() => {
    if (value.trim() || files.length > 0) {
      const result = onSubmit({ text: value.trim(), files });

      if (result instanceof Promise) {
        result.then(() => clearLocal()).catch(() => {
          // Don't clear on error - user may want to retry
        });
      } else {
        clearLocal();
      }
    }
  }, [value, files, onSubmit, clearLocal]);

  const contextValue = useMemo<PromptInputContextType>(
    () => ({
      value,
      setValue,
      submit,
      clear: clearLocal,
    }),
    [value, setValue, submit, clearLocal]
  );

  const localAttachments = useMemo<AttachmentsContext>(
    () => ({
      files: localFiles,
      add: (newFiles) => setLocalFiles((prev) => prev.concat(newFiles)),
      remove: (id) => setLocalFiles((prev) => prev.filter((f) => f.id !== id)),
      clear: () => setLocalFiles([]),
    }),
    [localFiles]
  );

  return (
    <PromptInputContext.Provider value={contextValue}>
      <LocalAttachmentsContext.Provider
        value={usingProvider ? controller.attachments : localAttachments}
      >
        <View
          className={cn(
            "w-full overflow-hidden rounded-3xl border border-border bg-card shadow-sm",
            className
          )}
          {...props}
        >
          {children}
        </View>
      </LocalAttachmentsContext.Provider>
    </PromptInputContext.Provider>
  );
};

// ============================================================================
// PromptInputTextarea
// ============================================================================

export type PromptInputTextareaProps = Omit<TextInputProps, "value" | "onChangeText"> & {
  placeholder?: string;
};

export const PromptInputTextarea = forwardRef<TextInput, PromptInputTextareaProps>(
  (
    {
      className,
      placeholder = "What would you like to know?",
      onSubmitEditing,
      ...props
    },
    ref
  ) => {
    const { value, setValue, submit } = usePromptInput();
    const attachments = usePromptInputAttachments();

    const handleSubmitEditing = useCallback(() => {
      submit();
    }, [submit]);

    return (
      <TextInput
        ref={ref}
        className={cn(
          "min-h-[56px] max-h-[150px] w-full px-4 pt-4 pb-2 text-base text-foreground",
          className
        )}
        value={value}
        onChangeText={setValue}
        onSubmitEditing={handleSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor="#a1a1aa"
        multiline
        textAlignVertical="top"
        returnKeyType="send"
        blurOnSubmit={false}
        {...props}
      />
    );
  }
);

PromptInputTextarea.displayName = "PromptInputTextarea";

// ============================================================================
// PromptInputActions (container for action buttons)
// ============================================================================

export type PromptInputActionsProps = ViewProps;

export const PromptInputActions = ({
  className,
  ...props
}: PromptInputActionsProps) => (
  <View
    className={cn(
      "flex-row items-center justify-between gap-2 px-3 py-2 border-t border-input",
      className
    )}
    {...props}
  />
);

// ============================================================================
// PromptInputTools (left side tools container)
// ============================================================================

export type PromptInputToolsProps = ViewProps;

export const PromptInputTools = ({
  className,
  ...props
}: PromptInputToolsProps) => (
  <View
    className={cn("flex-row items-center gap-1", className)}
    {...props}
  />
);

// ============================================================================
// PromptInputButton
// ============================================================================

export type PromptInputButtonProps = ButtonProps;

export const PromptInputButton = ({
  className,
  variant = "ghost",
  size = "icon",
  ...props
}: PromptInputButtonProps) => (
  <Button
    className={cn(className)}
    variant={variant}
    size={size}
    {...props}
  />
);

// ============================================================================
// PromptInputSubmit
// ============================================================================

export type PromptInputSubmitProps = ButtonProps & {
  status?: ChatStatus;
  onStop?: () => void;
  loadingColor?: string;
};

export const PromptInputSubmit = ({
  className,
  variant = "default",
  size = "icon",
  status,
  onStop,
  loadingColor = "#fff",
  children,
  ...props
}: PromptInputSubmitProps) => {
  const { submit, value } = usePromptInput();
  const attachments = usePromptInputAttachments();
  const isGenerating = status === "submitted" || status === "streaming";
  const isDisabled = !isGenerating && !value.trim() && attachments.files.length === 0;

  const handlePress = useCallback(() => {
    if (isGenerating && onStop) {
      onStop();
      return;
    }
    submit();
  }, [isGenerating, onStop, submit]);

  // Corner-down-left arrow icon (↵)
  let icon: ReactNode = <Text className="text-primary-foreground text-base font-medium">↵</Text>;

  if (status === "submitted") {
    icon = <Loader size={16} color={loadingColor} />;
  } else if (status === "streaming") {
    icon = <Text className="text-primary-foreground text-sm">■</Text>;
  } else if (status === "error") {
    icon = <Text className="text-primary-foreground text-lg">✕</Text>;
  }

  return (
    <Button
      aria-label={isGenerating ? "Stop" : "Submit"}
      className={cn(
        "rounded-xl h-10 w-10 bg-blue-500 active:bg-blue-600",
        isDisabled && "bg-gray-400",
        className
      )}
      onPress={handlePress}
      size={size}
      variant={variant}
      disabled={isDisabled}
      {...props}
    >
      {children ?? icon}
    </Button>
  );
};

// ============================================================================
// PromptInputHeader (for attachments/context above textarea)
// ============================================================================

export type PromptInputHeaderProps = ViewProps;

export const PromptInputHeader = ({
  className,
  ...props
}: PromptInputHeaderProps) => (
  <View
    className={cn(
      "flex-row flex-wrap items-center gap-1 px-3 py-2 border-b border-input",
      className
    )}
    {...props}
  />
);

// ============================================================================
// PromptInputBody (wrapper for textarea)
// ============================================================================

export type PromptInputBodyProps = ViewProps;

export const PromptInputBody = ({
  className,
  ...props
}: PromptInputBodyProps) => (
  <View className={cn("flex-1", className)} {...props} />
);

// ============================================================================
// PromptInputFooter (for actions below textarea)
// ============================================================================

export type PromptInputFooterProps = ViewProps;

export const PromptInputFooter = ({
  className,
  ...props
}: PromptInputFooterProps) => (
  <View
    className={cn(
      "flex-row items-center justify-between gap-2 px-4 py-3",
      className
    )}
    {...props}
  />
);

// ============================================================================
// PromptInputAttachment (for displaying attached files)
// ============================================================================

export type PromptInputAttachmentProps = ViewProps & {
  file: FileAttachment;
  onRemove?: (id: string) => void;
};

export const PromptInputAttachment = ({
  file,
  onRemove,
  className,
  ...props
}: PromptInputAttachmentProps) => (
  <View
    className={cn(
      "flex-row items-center gap-2 rounded-md bg-secondary px-2 py-1",
      className
    )}
    {...props}
  >
    <Text className="text-xs text-secondary-foreground" numberOfLines={1}>
      {file.filename}
    </Text>
    {onRemove && (
      <Button
        variant="ghost"
        size="icon"
        className="h-4 w-4"
        onPress={() => onRemove(file.id)}
      >
        <Text className="text-xs text-muted-foreground">×</Text>
      </Button>
    )}
  </View>
);

// ============================================================================
// PromptInputAttachments (container for attachments)
// ============================================================================

export type PromptInputAttachmentsProps = ViewProps;

export const PromptInputAttachments = ({
  className,
  children,
  ...props
}: PromptInputAttachmentsProps) => {
  const { files, remove } = usePromptInputAttachments();

  if (files.length === 0) return null;

  return (
    <View
      className={cn("flex-row flex-wrap gap-2 px-3 py-2", className)}
      {...props}
    >
      {children ??
        files.map((file) => (
          <PromptInputAttachment
            key={file.id}
            file={file}
            onRemove={remove}
          />
        ))}
    </View>
  );
};

// ============================================================================
// Controlled PromptInput (alternative API for external state management)
// ============================================================================

export type ControlledPromptInputProps = ViewProps & {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
};

export const ControlledPromptInput = ({
  className,
  children,
  value,
  onChangeText,
  onSubmit,
  ...props
}: ControlledPromptInputProps) => {
  const clear = useCallback(() => {
    onChangeText("");
  }, [onChangeText]);

  const contextValue = useMemo<PromptInputContextType>(
    () => ({
      value,
      setValue: onChangeText,
      submit: onSubmit,
      clear,
    }),
    [value, onChangeText, onSubmit, clear]
  );

  const emptyAttachments = useMemo<AttachmentsContext>(
    () => ({
      files: [],
      add: () => {},
      remove: () => {},
      clear: () => {},
    }),
    []
  );

  return (
    <PromptInputContext.Provider value={contextValue}>
      <LocalAttachmentsContext.Provider value={emptyAttachments}>
        <View
          className={cn(
            "w-full overflow-hidden rounded-3xl border border-border bg-card shadow-sm",
            className
          )}
          {...props}
        >
          {children}
        </View>
      </LocalAttachmentsContext.Provider>
    </PromptInputContext.Provider>
  );
};
