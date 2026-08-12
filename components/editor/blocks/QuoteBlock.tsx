"use client";

import { useState } from "react";

import InlineTextEditor from "./InlineTextEditor";
import LinkedText from "./LinkedText";
import { TextLink } from "./types";

type QuoteBlockProps = {
    text: string;
    author: string;
    links?: TextLink[];
    alignment?: "left" | "center" | "right";

    onTextChange?: (
        text: string
    ) => void;

    onAuthorChange?: (
        author: string
    ) => void;
};

export default function QuoteBlock({
    text,
    author,
    links = [],
    alignment = "left",
    onTextChange,
    onAuthorChange,
}: QuoteBlockProps) {
    const [editingText, setEditingText] =
        useState(false);

    const [editingAuthor, setEditingAuthor] =
        useState(false);

    return (
        <blockquote
            className="text-lg italic leading-7 text-gray-700"
            style={{
                overflowWrap:
                    "anywhere",
                textAlign:
                    alignment,
            }}
        >
            {editingText &&
            onTextChange ? (
                <InlineTextEditor
                    value={text}
                    onChange={
                        onTextChange
                    }
                    onFinish={() =>
                        setEditingText(false)
                    }
                    multiline={true}
                    className="text-lg italic leading-7 text-gray-700"
                    style={{
                        overflowWrap:
                            "anywhere",
                        textAlign:
                            alignment,
                    }}
                />
            ) : (
                <span
                    onDoubleClick={(
                        event
                    ) => {
                        event.stopPropagation();

                        if (
                            onTextChange
                        ) {
                            setEditingText(
                                true
                            );
                        }
                    }}
                    style={{
                        cursor:
                            onTextChange
                                ? "text"
                                : "default",
                    }}
                >
                    “
                    <LinkedText
                        text={text}
                        links={links}
                        field="text"
                    />
                    ”
                </span>
            )}

            <footer
                className="mt-3 text-sm text-gray-400"
                style={{
                    overflowWrap:
                        "anywhere",
                    textAlign:
                        alignment,
                }}
            >
                {editingAuthor &&
                onAuthorChange ? (
                    <InlineTextEditor
                        value={author}
                        onChange={
                            onAuthorChange
                        }
                        onFinish={() =>
                            setEditingAuthor(
                                false
                            )
                        }
                        multiline={false}
                        className="text-sm text-gray-400"
                        style={{
                            overflowWrap:
                                "anywhere",
                            textAlign:
                                alignment,
                        }}
                    />
                ) : (
                    <span
                        onDoubleClick={(
                            event
                        ) => {
                            event.stopPropagation();

                            if (
                                onAuthorChange
                            ) {
                                setEditingAuthor(
                                    true
                                );
                            }
                        }}
                        style={{
                            cursor:
                                onAuthorChange
                                    ? "text"
                                    : "default",
                        }}
                    >
                        —{" "}
                        <LinkedText
                            text={author}
                            links={links}
                            field="author"
                        />
                    </span>
                )}
            </footer>
        </blockquote>
    );
}