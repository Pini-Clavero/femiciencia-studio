"use client";

import React from "react";

import { TextLink } from "./types";

type LinkedTextProps = {
    text: string;
    links?: TextLink[];
    field: string;
    className?: string;
    style?: React.CSSProperties;
};

type LinkMatch = {
    start: number;
    end: number;
    link: TextLink;
    occurrence: number;
};

function findOccurrences(
    text: string,
    searchText: string
): number[] {
    if (!searchText) {
        return [];
    }

    const positions: number[] = [];

    let searchPosition = 0;

    while (
        searchPosition <= text.length
    ) {
        const index = text.indexOf(
            searchText,
            searchPosition
        );

        if (index === -1) {
            break;
        }

        positions.push(index);

        searchPosition =
            index + searchText.length;
    }

    return positions;
}

export default function LinkedText({
    text,
    links = [],
    field,
    className,
    style,
}: LinkedTextProps) {
    const fieldLinks = links.filter(
        (link) =>
            (!link.field ||
                link.field === field) &&
            link.text &&
            link.url
    );

    if (fieldLinks.length === 0) {
        return (
            <span
                className={className}
                style={style}
            >
                {text}
            </span>
        );
    }

    const matches: LinkMatch[] = [];

    /*
     * Agrupamos los links por texto.
     *
     * Esto permite manejar correctamente:
     *
     * Femiciencia
     * Femiciencia
     * Femiciencia
     *
     * como tres apariciones independientes.
     */
    const groupedLinks =
        new Map<string, TextLink[]>();

    fieldLinks.forEach((link) => {
        const existing =
            groupedLinks.get(link.text) || [];

        existing.push(link);

        groupedLinks.set(
            link.text,
            existing
        );
    });

    groupedLinks.forEach(
        (groupLinks, linkText) => {
            const occurrences =
                findOccurrences(
                    text,
                    linkText
                );

            groupLinks.forEach(
                (link, linkIndex) => {
                    /*
                     * Links antiguos pueden no tener
                     * occurrence.
                     *
                     * En ese caso usamos el orden
                     * en el que aparecen dentro del
                     * array de links.
                     */
                    const occurrence =
                        typeof link.occurrence ===
                        "number"
                            ? link.occurrence
                            : linkIndex;

                    const start =
                        occurrences[
                            occurrence
                        ];

                    if (
                        start === undefined
                    ) {
                        return;
                    }

                    matches.push({
                        start,
                        end:
                            start +
                            linkText.length,
                        link,
                        occurrence,
                    });
                }
            );
        }
    );

    if (matches.length === 0) {
        return (
            <span
                className={className}
                style={style}
            >
                {text}
            </span>
        );
    }

    /*
     * Ordenamos por posición.
     */
    matches.sort(
        (a, b) => {
            if (
                a.start !== b.start
            ) {
                return (
                    a.start - b.start
                );
            }

            return (
                a.end - b.end
            );
        }
    );

    /*
     * Evitamos solapamientos.
     */
    const validMatches: LinkMatch[] =
        [];

    matches.forEach((match) => {
        const overlaps =
            validMatches.some(
                (existing) =>
                    match.start <
                        existing.end &&
                    match.end >
                        existing.start
            );

        if (!overlaps) {
            validMatches.push(match);
        }
    });

    const parts: React.ReactNode[] =
        [];

    let currentPosition = 0;

    validMatches.forEach(
        (match) => {
            if (
                match.start >
                currentPosition
            ) {
                parts.push(
                    <React.Fragment
                        key={`text-${match.start}`}
                    >
                        {text.slice(
                            currentPosition,
                            match.start
                        )}
                    </React.Fragment>
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
                        event.stopPropagation();
                    }}
                >
                    {text.slice(
                        match.start,
                        match.end
                    )}
                </a>
            );

            currentPosition =
                match.end;
        }
    );

    if (
        currentPosition <
        text.length
    ) {
        parts.push(
            <React.Fragment
                key={`text-${currentPosition}-end`}
            >
                {text.slice(
                    currentPosition
                )}
            </React.Fragment>
        );
    }

    return (
        <span
            className={className}
            style={style}
        >
            {parts}
        </span>
    );
}