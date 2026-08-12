"use client";

import { useState } from "react";

import InlineTextEditor from "./InlineTextEditor";
import LinkedText from "./LinkedText";
import { TextLink } from "./types";

type ImageBlockProps = {
    src: string;
    caption: string;
    links?: TextLink[];
    alignment?: "left" | "center" | "right";
    width?: number;

    onCaptionChange?: (
        caption: string
    ) => void;
};

export default function ImageBlock({
    src,
    caption,
    links = [],
    alignment = "center",
    width = 300,
    onCaptionChange,
}: ImageBlockProps) {
    const [editingCaption, setEditingCaption] =
        useState(false);

    return (
        <figure
            className="flex w-full flex-col"
            style={{
                alignItems:
                    alignment === "left"
                        ? "flex-start"
                        : alignment === "right"
                        ? "flex-end"
                        : "center",
            }}
        >
            <img
                src={src}
                alt={caption}
                style={{
                    width: `${width}px`,
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "contain",
                }}
            />

            {caption &&
                !editingCaption && (
                    <figcaption
                        onDoubleClick={(
                            event
                        ) => {
                            event.stopPropagation();

                            if (
                                onCaptionChange
                            ) {
                                setEditingCaption(
                                    true
                                );
                            }
                        }}
                        className="mt-2 text-xs leading-5 text-gray-400"
                        style={{
                            width: `${width}px`,
                            maxWidth: "100%",
                            textAlign:
                                alignment,
                            cursor:
                                onCaptionChange
                                    ? "text"
                                    : "default",
                        }}
                    >
                        <LinkedText
                            text={caption}
                            links={links}
                            field="caption"
                        />
                    </figcaption>
                )}

            {editingCaption &&
                onCaptionChange && (
                    <div
                        style={{
                            width: `${width}px`,
                            maxWidth: "100%",
                        }}
                    >
                        <InlineTextEditor
                            value={caption}
                            onChange={
                                onCaptionChange
                            }
                            onFinish={() =>
                                setEditingCaption(
                                    false
                                )
                            }
                            multiline={true}
                            className="mt-2 text-xs leading-5 text-gray-400"
                            style={{
                                textAlign:
                                    alignment,
                            }}
                        />
                    </div>
                )}
        </figure>
    );
}