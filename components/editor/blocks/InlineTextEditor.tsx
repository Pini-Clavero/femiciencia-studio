"use client";

import {
    useEffect,
    useRef,
} from "react";

type InlineTextEditorProps = {
    value: string;
    onChange: (value: string) => void;
    onFinish: () => void;
    multiline?: boolean;
    className?: string;
    style?: React.CSSProperties;
};

export default function InlineTextEditor({
    value,
    onChange,
    onFinish,
    multiline = false,
    className = "",
    style,
}: InlineTextEditorProps) {
    const textareaRef =
        useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        const textarea =
            textareaRef.current;

        if (!textarea) {
            return;
        }

        textarea.focus();

        const cursorPosition =
            textarea.value.length;

        textarea.setSelectionRange(
            cursorPosition,
            cursorPosition
        );
    }, []);

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (
            event.key === "Escape"
        ) {
            event.preventDefault();
            onFinish();
            return;
        }

        if (
            event.key === "Enter" &&
            !multiline
        ) {
            event.preventDefault();
            onFinish();
        }
    };

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={(event) =>
                onChange(event.target.value)
            }
            onBlur={onFinish}
            onKeyDown={handleKeyDown}
            rows={multiline ? 4 : 1}
            className={`w-full resize-none border-none bg-transparent p-0 outline-none ${className}`}
            style={style}
        />
    );
}