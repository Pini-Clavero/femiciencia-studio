"use client";

import { useState } from "react";

import InlineTextEditor from "./InlineTextEditor";
import LinkedText from "./LinkedText";
import { TextLink } from "./types";

type TextImageBlockProps = {
    text: string;

    imageSrc: string;
    imageCaption: string;

    imagePosition: "left" | "right";

    imageWidth?: number;

    links?: TextLink[];

    onTextChange?: (
        text: string
    ) => void;

    onCaptionChange?: (
        caption: string
    ) => void;
};

export default function TextImageBlock({
    text,
    imageSrc,
    imageCaption,
    imagePosition,
    imageWidth = 220,
    links = [],
    onTextChange,
    onCaptionChange,
}: TextImageBlockProps) {
    const [editingText, setEditingText] =
        useState(false);

    const [
        editingCaption,
        setEditingCaption,
    ] = useState(false);

    const image = (
        <figure
            className="shrink-0"
            style={{
                width: `${imageWidth}px`,
                maxWidth: "100%",
            }}
        >
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={imageCaption}
                    className="h-auto w-full object-cover"
                />
            )}

            {imageCaption !==
                undefined && (
                <>
                    {!editingCaption ? (
                        <div
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
                            className="mt-2 min-h-[20px] text-center text-xs leading-5 text-gray-400"
                            style={{
                                cursor:
                                    onCaptionChange
                                        ? "text"
                                        : "default",
                            }}
                        >
                            <LinkedText
                                text={
                                    imageCaption
                                }
                                links={
                                    links
                                }
                                field="imageCaption"
                            />
                        </div>
                    ) : (
                        onCaptionChange && (
                            <InlineTextEditor
                                value={
                                    imageCaption
                                }
                                onChange={
                                    onCaptionChange
                                }
                                onFinish={() =>
                                    setEditingCaption(
                                        false
                                    )
                                }
                                multiline={
                                    true
                                }
                                className="mt-2 text-center text-xs leading-5 text-gray-400"
                            />
                        )
                    )}
                </>
            )}
        </figure>
    );

    const content = (
        <div className="min-w-0 flex-1">
            {!editingText ? (
                <div
                    onDoubleClick={(
                        event
                    ) => {
                        event.stopPropagation();

                        if (onTextChange) {
                            setEditingText(
                                true
                            );
                        }
                    }}
                    className="min-h-[20px] text-base leading-7 text-gray-700"
                    style={{
                        overflowWrap:
                            "anywhere",
                        cursor:
                            onTextChange
                                ? "text"
                                : "default",
                    }}
                >
                    <LinkedText
                        text={text}
                        links={links}
                        field="text"
                    />
                </div>
            ) : (
                onTextChange && (
                    <InlineTextEditor
                        value={text}
                        onChange={
                            onTextChange
                        }
                        onFinish={() =>
                            setEditingText(
                                false
                            )
                        }
                        multiline={true}
                        className="text-base leading-7 text-gray-700"
                        style={{
                            overflowWrap:
                                "anywhere",
                        }}
                    />
                )
            )}
        </div>
    );

    return (
        <div className="flex items-start gap-6">
            {imagePosition ===
            "left" ? (
                <>
                    {image}
                    {content}
                </>
            ) : (
                <>
                    {content}
                    {image}
                </>
            )}
        </div>
    );
}