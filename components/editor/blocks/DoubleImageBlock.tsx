"use client";

import { useState } from "react";

import InlineTextEditor from "./InlineTextEditor";
import LinkedText from "./LinkedText";
import { TextLink } from "./types";

type DoubleImageBlockProps = {
    leftSrc: string;
    leftCaption: string;

    rightSrc: string;
    rightCaption: string;

    links?: TextLink[];

    gap?: number;

    onLeftCaptionChange?: (
        caption: string
    ) => void;

    onRightCaptionChange?: (
        caption: string
    ) => void;
};

export default function DoubleImageBlock({
    leftSrc,
    leftCaption,
    rightSrc,
    rightCaption,
    links = [],
    gap = 16,
    onLeftCaptionChange,
    onRightCaptionChange,
}: DoubleImageBlockProps) {
    const [
        editingLeftCaption,
        setEditingLeftCaption,
    ] = useState(false);

    const [
        editingRightCaption,
        setEditingRightCaption,
    ] = useState(false);

    return (
        <div
            className="grid grid-cols-2"
            style={{
                gap: `${gap}px`,
            }}
        >
            <figure className="min-w-0">
                {leftSrc && (
                    <img
                        src={leftSrc}
                        alt={leftCaption}
                        className="h-[220px] w-full object-cover"
                    />
                )}

                {leftCaption !==
                    undefined && (
                    <>
                        {!editingLeftCaption ? (
                            <div
                                onDoubleClick={(
                                    event
                                ) => {
                                    event.stopPropagation();

                                    if (
                                        onLeftCaptionChange
                                    ) {
                                        setEditingLeftCaption(
                                            true
                                        );
                                    }
                                }}
                                className="mt-2 min-h-[20px] text-center text-xs leading-5 text-gray-400"
                                style={{
                                    cursor:
                                        onLeftCaptionChange
                                            ? "text"
                                            : "default",
                                }}
                            >
                                <LinkedText
                                    text={
                                        leftCaption
                                    }
                                    links={
                                        links
                                    }
                                    field="leftCaption"
                                />
                            </div>
                        ) : (
                            onLeftCaptionChange && (
                                <InlineTextEditor
                                    value={
                                        leftCaption
                                    }
                                    onChange={
                                        onLeftCaptionChange
                                    }
                                    onFinish={() =>
                                        setEditingLeftCaption(
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

            <figure className="min-w-0">
                {rightSrc && (
                    <img
                        src={rightSrc}
                        alt={rightCaption}
                        className="h-[220px] w-full object-cover"
                    />
                )}

                {rightCaption !==
                    undefined && (
                    <>
                        {!editingRightCaption ? (
                            <div
                                onDoubleClick={(
                                    event
                                ) => {
                                    event.stopPropagation();

                                    if (
                                        onRightCaptionChange
                                    ) {
                                        setEditingRightCaption(
                                            true
                                        );
                                    }
                                }}
                                className="mt-2 min-h-[20px] text-center text-xs leading-5 text-gray-400"
                                style={{
                                    cursor:
                                        onRightCaptionChange
                                            ? "text"
                                            : "default",
                                }}
                            >
                                <LinkedText
                                    text={
                                        rightCaption
                                    }
                                    links={
                                        links
                                    }
                                    field="rightCaption"
                                />
                            </div>
                        ) : (
                            onRightCaptionChange && (
                                <InlineTextEditor
                                    value={
                                        rightCaption
                                    }
                                    onChange={
                                        onRightCaptionChange
                                    }
                                    onFinish={() =>
                                        setEditingRightCaption(
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
        </div>
    );
}