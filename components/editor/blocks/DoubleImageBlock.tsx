"use client";

import { useState } from "react";

import InlineTextEditor from "./InlineTextEditor";

type DoubleImageLink = {
    id: string;
    text: string;
    url: string;
    field?: string;
};

type DoubleImageBlockProps = {
    leftSrc: string;
    leftCaption: string;

    rightSrc: string;
    rightCaption: string;

    gap?: number;

    links?: DoubleImageLink[];

    onLeftCaptionChange?: (
        caption: string
    ) => void;

    onRightCaptionChange?: (
        caption: string
    ) => void;
};

function renderCaptionWithLinks(
    text: string,
    links: DoubleImageLink[],
    field: "leftCaption" | "rightCaption"
) {
    const fieldLinks = links.filter(
        (link) =>
            link.field === field &&
            link.text.trim() &&
            link.url.trim()
    );

    if (
        !text ||
        fieldLinks.length === 0
    ) {
        return text;
    }

    const parts: React.ReactNode[] = [];

    let currentPosition = 0;

    const matches: {
        start: number;
        end: number;
        link: DoubleImageLink;
    }[] = [];

    /*
     * Buscamos las coincidencias de los links
     * pertenecientes únicamente a este caption.
     *
     * Importante:
     * cada link se aplica solamente a su primera
     * coincidencia dentro del texto.
     *
     * Esto evita que una palabra repetida, por ejemplo
     * "Femiciencia", se convierta automáticamente
     * en múltiples links.
     */
    fieldLinks.forEach((link) => {
        const index = text.indexOf(
            link.text.trim()
        );

        if (index === -1) {
            return;
        }

        matches.push({
            start: index,
            end:
                index +
                link.text.trim().length,
            link,
        });
    });

    if (matches.length === 0) {
        return text;
    }

    /*
     * Ordenamos las coincidencias según su posición
     * dentro del texto.
     */
    matches.sort(
        (a, b) => {
            if (a.start !== b.start) {
                return a.start - b.start;
            }

            /*
             * Si dos links comienzan exactamente
             * en la misma posición, priorizamos
             * el texto más largo.
             *
             * Ejemplo:
             * "Femiciencia"
             * "Femiciencia.org"
             */
            return (
                b.end -
                b.start -
                (a.end - a.start)
            );
        }
    );

    /*
     * Eliminamos coincidencias superpuestas.
     */
    const validMatches: typeof matches =
        [];

    matches.forEach((match) => {
        const overlaps =
            validMatches.some(
                (existingMatch) =>
                    match.start <
                        existingMatch.end &&
                    match.end >
                        existingMatch.start
            );

        if (!overlaps) {
            validMatches.push(match);
        }
    });

    /*
     * Construimos el contenido final.
     */
    validMatches.forEach(
        (match) => {
            if (
                match.start >
                currentPosition
            ) {
                parts.push(
                    text.slice(
                        currentPosition,
                        match.start
                    )
                );
            }

            parts.push(
                <a
                    key={`${match.link.id}-${match.start}`}
                    href={match.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                    onClick={(event) => {
                        /*
                         * Evitamos que el click sobre
                         * el link también seleccione
                         * el bloque.
                         */
                        event.stopPropagation();
                    }}
                >
                    {text.slice(
                        match.start,
                        match.end
                    )}
                </a>
            );

            currentPosition = match.end;
        }
    );

    /*
     * Agregamos el texto restante.
     */
    if (
        currentPosition < text.length
    ) {
        parts.push(
            text.slice(currentPosition)
        );
    }

    return parts;
}

export default function DoubleImageBlock({
    leftSrc,
    leftCaption,
    rightSrc,
    rightCaption,
    gap = 16,
    links = [],
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

    const leftCaptionLinks =
        links.filter(
            (link) =>
                link.field ===
                "leftCaption"
        );

    const rightCaptionLinks =
        links.filter(
            (link) =>
                link.field ===
                "rightCaption"
        );

    return (
        <div
            className="grid grid-cols-2"
            style={{
                gap: `${gap}px`,
            }}
        >
            {/* IMAGEN IZQUIERDA */}

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
                    <div className="mt-2 min-h-[20px] text-center text-xs leading-5 text-gray-400">
                        {editingLeftCaption &&
                        onLeftCaptionChange ? (
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
                                multiline={true}
                                className="text-center text-xs leading-5 text-gray-400"
                                style={{
                                    overflowWrap:
                                        "anywhere",
                                }}
                            />
                        ) : (
                            <span
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
                                style={{
                                    cursor:
                                        onLeftCaptionChange
                                            ? "text"
                                            : "default",
                                    overflowWrap:
                                        "anywhere",
                                }}
                            >
                                {renderCaptionWithLinks(
                                    leftCaption,
                                    leftCaptionLinks,
                                    "leftCaption"
                                )}
                            </span>
                        )}
                    </div>
                )}
            </figure>

            {/* IMAGEN DERECHA */}

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
                    <div className="mt-2 min-h-[20px] text-center text-xs leading-5 text-gray-400">
                        {editingRightCaption &&
                        onRightCaptionChange ? (
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
                                multiline={true}
                                className="text-center text-xs leading-5 text-gray-400"
                                style={{
                                    overflowWrap:
                                        "anywhere",
                                }}
                            />
                        ) : (
                            <span
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
                                style={{
                                    cursor:
                                        onRightCaptionChange
                                            ? "text"
                                            : "default",
                                    overflowWrap:
                                        "anywhere",
                                }}
                            >
                                {renderCaptionWithLinks(
                                    rightCaption,
                                    rightCaptionLinks,
                                    "rightCaption"
                                )}
                            </span>
                        )}
                    </div>
                )}
            </figure>
        </div>
    );
}