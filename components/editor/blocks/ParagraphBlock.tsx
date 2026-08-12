"use client";

import { useState } from "react";

import InlineTextEditor from "./InlineTextEditor";
import LinkedText from "./LinkedText";
import { TextLink } from "./types";

type ParagraphBlockProps = {
    text: string;
    links?: TextLink[];
    alignment?: "left" | "center" | "right";
    onChange?: (text: string) => void;
};

export default function ParagraphBlock({
    text,
    links = [],
    alignment = "left",
    onChange,
}: ParagraphBlockProps) {
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
                className="text-base leading-7 text-gray-700"
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
        <p
            onDoubleClick={(event) => {
                event.stopPropagation();

                if (onChange) {
                    setIsEditing(true);
                }
            }}
            className="text-base leading-7 text-gray-700"
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
        </p>
    );
}