"use client";

import { useState } from "react";

import InlineTextEditor from "./InlineTextEditor";
import LinkedText from "./LinkedText";
import { TextLink } from "./types";

type HeadingBlockProps = {
    text: string;
    links?: TextLink[];
    alignment?: "left" | "center" | "right";
    onChange?: (text: string) => void;
};

export default function HeadingBlock({
    text,
    links = [],
    alignment = "left",
    onChange,
}: HeadingBlockProps) {
    const [isEditing, setIsEditing] =
        useState(false);

    if (
        isEditing &&
        onChange
    ) {
        return (
            <InlineTextEditor
                value={text}
                onChange={onChange}
                onFinish={() =>
                    setIsEditing(false)
                }
                multiline={true}
                className="text-4xl font-bold"
                style={{
                    overflowWrap:
                        "anywhere",
                    textAlign:
                        alignment,
                }}
            />
        );
    }

    return (
        <h1
            onDoubleClick={(event) => {
                event.stopPropagation();

                if (onChange) {
                    setIsEditing(true);
                }
            }}
            className="break-words text-4xl font-bold"
            style={{
                overflowWrap:
                    "anywhere",
                textAlign:
                    alignment,
                cursor: onChange
                    ? "text"
                    : "default",
            }}
        >
            <LinkedText
                text={text}
                links={links}
                field="text"
            />
        </h1>
    );
}