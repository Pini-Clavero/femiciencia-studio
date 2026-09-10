"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    NewsletterBlock,
    TextLink,
} from "@/components/editor/blocks/types";

type PropertiesProps = {
    selectedBlockId: string | null;
    blocks: NewsletterBlock[];

    updateBlock: (
        blockId: string,
        updatedProps: Record<string, any>
    ) => void;
};

type LinkField = {
    value: string;
    label: string;
};

function countOccurrences(
    text: string,
    searchText: string
): number {
    if (!text || !searchText) {
        return 0;
    }

    let count = 0;
    let position = 0;

    while (position <= text.length) {
        const index = text.indexOf(
            searchText,
            position
        );

        if (index === -1) {
            break;
        }

        count += 1;

        position =
            index + searchText.length;
    }

    return count;
}

export default function Properties({
    selectedBlockId,
    blocks,
    updateBlock,
}: PropertiesProps) {
    const selectedBlock =
        blocks.find(
            (block) =>
                block.id ===
                selectedBlockId
        );

    const [
        showLinkForm,
        setShowLinkForm,
    ] = useState(false);

    const [
        linkText,
        setLinkText,
    ] = useState("");

    const [
        linkUrl,
        setLinkUrl,
    ] = useState("");

    const [
        linkField,
        setLinkField,
    ] = useState("text");

    const [
        linkOccurrence,
        setLinkOccurrence,
    ] = useState(0);

    const updateSelectedBlock = (
        props: Record<string, any>
    ) => {
        if (!selectedBlock) {
            return;
        }

        updateBlock(
            selectedBlock.id,
            props
        );
    };

    useEffect(() => {
        setShowLinkForm(false);
        setLinkText("");
        setLinkUrl("");
        setLinkField("text");
        setLinkOccurrence(0);
    }, [selectedBlockId]);

    const getLinkFields =
        (): LinkField[] => {
            if (!selectedBlock) {
                return [];
            }

            switch (
            selectedBlock.type
            ) {
                case "heading":
                    return [
                        {
                            value: "text",
                            label: "Título",
                        },
                    ];

                case "paragraph":
                    return [
                        {
                            value: "text",
                            label: "Texto",
                        },
                    ];

                case "quote":
                    return [
                        {
                            value: "text",
                            label: "Cita",
                        },
                        {
                            value: "author",
                            label: "Autor",
                        },
                    ];

                case "image":
                    return [
                        {
                            value: "caption",
                            label: "Pie de imagen",
                        },
                    ];

                case "double-image":
                    return [
                        {
                            value: "leftCaption",
                            label: "Pie de imagen izquierda",
                        },
                        {
                            value: "rightCaption",
                            label: "Pie de imagen derecha",
                        },
                    ];

                case "text-image":
                    return [
                        {
                            value: "text",
                            label: "Texto",
                        },
                        {
                            value: "imageCaption",
                            label: "Pie de imagen",
                        },
                    ];

                default:
                    return [];
            }
        };

    const linkFields =
        getLinkFields();

    const getFieldText = (
        field: string
    ): string => {
        if (!selectedBlock) {
            return "";
        }

        return (
            selectedBlock.props[
            field
            ] || ""
        );
    };

    const occurrenceCount =
        useMemo(() => {
            return countOccurrences(
                getFieldText(
                    linkField
                ),
                linkText.trim()
            );
        }, [
            selectedBlock,
            linkField,
            linkText,
        ]);

    const currentLinks: TextLink[] =
        selectedBlock?.props
            .links || [];

    const usedOccurrences =
        useMemo(() => {
            return currentLinks
                .filter(
                    (link) =>
                        (link.field ||
                            "text") ===
                        linkField &&
                        link.text.trim() ===
                        linkText.trim()
                )
                .map(
                    (link) =>
                        link.occurrence
                )
                .filter(
                    (
                        occurrence
                    ): occurrence is number =>
                        typeof occurrence ===
                        "number"
                );
        }, [
            currentLinks,
            linkField,
            linkText,
        ]);

    const availableOccurrences =
        useMemo(() => {
            const occurrences =
                [];

            for (
                let i = 0;
                i <
                occurrenceCount;
                i += 1
            ) {
                if (
                    !usedOccurrences.includes(
                        i
                    )
                ) {
                    occurrences.push(
                        i
                    );
                }
            }

            return occurrences;
        }, [
            occurrenceCount,
            usedOccurrences,
        ]);

    useEffect(() => {
        if (
            availableOccurrences.length ===
            0
        ) {
            setLinkOccurrence(0);
            return;
        }

        if (
            !availableOccurrences.includes(
                linkOccurrence
            )
        ) {
            setLinkOccurrence(
                availableOccurrences[0]
            );
        }
    }, [
        availableOccurrences,
        linkOccurrence,
    ]);

    const AlignmentButtons =
        () => {
            if (!selectedBlock) {
                return null;
            }

            const currentAlignment =
                selectedBlock.props
                    .alignment ||
                "left";

            return (
                <div>
                    <p className="mb-3 text-xs font-medium text-gray-500">
                        Alineación
                    </p>

                    <div className="grid grid-cols-3 gap-2">
                        <button
                            type="button"
                            onClick={() =>
                                updateSelectedBlock(
                                    {
                                        alignment:
                                            "left",
                                    }
                                )
                            }
                            className={`rounded-lg border px-2 py-2 text-sm transition ${currentAlignment ===
                                    "left"
                                    ? "border-gray-900 bg-gray-50 font-medium"
                                    : "border-gray-200 hover:bg-gray-50"
                                }`}
                        >
                            Izq.
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                updateSelectedBlock(
                                    {
                                        alignment:
                                            "center",
                                    }
                                )
                            }
                            className={`rounded-lg border px-2 py-2 text-sm transition ${currentAlignment ===
                                    "center"
                                    ? "border-gray-900 bg-gray-50 font-medium"
                                    : "border-gray-200 hover:bg-gray-50"
                                }`}
                        >
                            Centro
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                updateSelectedBlock(
                                    {
                                        alignment:
                                            "right",
                                    }
                                )
                            }
                            className={`rounded-lg border px-2 py-2 text-sm transition ${currentAlignment ===
                                    "right"
                                    ? "border-gray-900 bg-gray-50 font-medium"
                                    : "border-gray-200 hover:bg-gray-50"
                                }`}
                        >
                            Der.
                        </button>
                    </div>
                </div>
            );
        };

    const addLink = () => {
        if (
            !selectedBlock ||
            !linkText.trim() ||
            !linkUrl.trim()
        ) {
            return;
        }

        if (
            occurrenceCount === 0
        ) {
            return;
        }

        if (
            availableOccurrences.length ===
            0
        ) {
            return;
        }

        const normalizedUrl =
            linkUrl.startsWith(
                "http://"
            ) ||
                linkUrl.startsWith(
                    "https://"
                )
                ? linkUrl.trim()
                : `https://${linkUrl.trim()}`;

        const links: TextLink[] =
            selectedBlock.props
                .links || [];

        const newLink: TextLink = {
            id: crypto.randomUUID(),
            text: linkText.trim(),
            url: normalizedUrl,
            field: linkField,
            occurrence:
                linkOccurrence,
        };

        updateSelectedBlock({
            links: [
                ...links,
                newLink,
            ],
        });

        setLinkText("");
        setLinkUrl("");
        setLinkOccurrence(0);
        setShowLinkForm(false);
    };

    const deleteLink = (
        linkId: string
    ) => {
        if (!selectedBlock) {
            return;
        }

        const links: TextLink[] =
            selectedBlock.props
                .links || [];

        const deletedLink =
            links.find(
                (link) =>
                    link.id ===
                    linkId
            );

        if (!deletedLink) {
            return;
        }

        const filteredLinks =
            links.filter(
                (link) =>
                    link.id !==
                    linkId
            );

        /*
         * Después de eliminar un link,
         * renumeramos las apariciones
         * del mismo texto y campo.
         *
         * Ejemplo:
         *
         * 0 -> Femiciencia
         * 1 -> Femiciencia
         * 2 -> Femiciencia
         *
         * Si eliminamos 1:
         *
         * 0 -> Femiciencia
         * 1 -> Femiciencia
         */
        const sameGroup =
            filteredLinks
                .filter(
                    (link) =>
                        link.text ===
                        deletedLink.text &&
                        (link.field ||
                            "text") ===
                        (deletedLink.field ||
                            "text")
                )
                .sort(
                    (a, b) =>
                        (a.occurrence ??
                            0) -
                        (b.occurrence ??
                            0)
                );

        const occurrenceMap =
            new Map<
                string,
                number
            >();

        sameGroup.forEach(
            (link, index) => {
                occurrenceMap.set(
                    link.id,
                    index
                );
            }
        );

        const normalizedLinks =
            filteredLinks.map(
                (link) => {
                    const newOccurrence =
                        occurrenceMap.get(
                            link.id
                        );

                    if (
                        newOccurrence ===
                        undefined
                    ) {
                        return link;
                    }

                    return {
                        ...link,
                        occurrence:
                            newOccurrence,
                    };
                }
            );

        updateSelectedBlock({
            links: normalizedLinks,
        });
    };

    const links: TextLink[] =
        selectedBlock?.props
            .links || [];

    const canAddLink =
        linkText.trim() &&
        linkUrl.trim() &&
        occurrenceCount >
        0 &&
        availableOccurrences.length >
        0;

    return (
        <aside className="w-80 overflow-y-auto border-l bg-white p-6">
            <h2 className="mb-6 text-lg font-semibold">
                Propiedades
            </h2>

            {!selectedBlock && (
                <p className="text-sm text-gray-500">
                    Selecciona un bloque
                    para editar sus
                    propiedades.
                </p>
            )}

            {/* TÍTULO */}

            {selectedBlock?.type ===
                "heading" && (
                    <div className="space-y-6">
                        <div>
                            <label
                                htmlFor="heading-text"
                                className="mb-2 block text-sm font-medium"
                            >
                                Título
                            </label>

                            <textarea
                                id="heading-text"
                                value={
                                    selectedBlock
                                        .props
                                        .text ||
                                    ""
                                }
                                onChange={(
                                    event
                                ) =>
                                    updateSelectedBlock(
                                        {
                                            text: event
                                                .target
                                                .value,
                                        }
                                    )
                                }
                                className="min-h-[100px] w-full resize-none rounded-lg border border-gray-200 p-3 text-sm outline-none transition focus:border-gray-400"
                            />
                        </div>

                        <AlignmentButtons />
                    </div>
                )}

            {/* PÁRRAFO */}

            {selectedBlock?.type ===
                "paragraph" && (
                    <div className="space-y-6">
                        <div>
                            <label
                                htmlFor="paragraph-text"
                                className="mb-2 block text-sm font-medium"
                            >
                                Texto
                            </label>

                            <textarea
                                id="paragraph-text"
                                value={
                                    selectedBlock
                                        .props
                                        .text ||
                                    ""
                                }
                                onChange={(
                                    event
                                ) =>
                                    updateSelectedBlock(
                                        {
                                            text: event
                                                .target
                                                .value,
                                        }
                                    )
                                }
                                className="min-h-[180px] w-full resize-none rounded-lg border border-gray-200 p-3 text-sm leading-6 outline-none transition focus:border-gray-400"
                            />
                        </div>

                        <AlignmentButtons />
                    </div>
                )}

            {/* SEPARADOR */}

            {selectedBlock?.type ===
                "divider" && (
                    <div>
                        <p className="mb-3 text-sm font-medium">
                            Estilo
                        </p>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() =>
                                    updateSelectedBlock(
                                        {
                                            style:
                                                "solid",
                                        }
                                    )
                                }
                                className={`rounded-lg border px-3 py-3 text-sm ${selectedBlock
                                        .props
                                        .style ===
                                        "solid"
                                        ? "border-gray-900 bg-gray-50 font-medium"
                                        : "border-gray-200 hover:bg-gray-50"
                                    }`}
                            >
                                Sólido
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    updateSelectedBlock(
                                        {
                                            style:
                                                "dashed",
                                        }
                                    )
                                }
                                className={`rounded-lg border px-3 py-3 text-sm ${selectedBlock
                                        .props
                                        .style ===
                                        "dashed"
                                        ? "border-gray-900 bg-gray-50 font-medium"
                                        : "border-gray-200 hover:bg-gray-50"
                                    }`}
                            >
                                Discontinuo
                            </button>
                        </div>
                    </div>
                )}

            {/* CITA */}

            {selectedBlock?.type ===
                "quote" && (
                    <div className="space-y-6">
                        <div>
                            <label
                                htmlFor="quote-text"
                                className="mb-2 block text-sm font-medium"
                            >
                                Cita
                            </label>

                            <textarea
                                id="quote-text"
                                value={
                                    selectedBlock
                                        .props
                                        .text ||
                                    ""
                                }
                                onChange={(
                                    event
                                ) =>
                                    updateSelectedBlock(
                                        {
                                            text: event
                                                .target
                                                .value,
                                        }
                                    )
                                }
                                className="min-h-[140px] w-full resize-none rounded-lg border border-gray-200 p-3 text-sm leading-6 outline-none transition focus:border-gray-400"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="quote-author"
                                className="mb-2 block text-sm font-medium"
                            >
                                Autor
                            </label>

                            <input
                                id="quote-author"
                                type="text"
                                value={
                                    selectedBlock
                                        .props
                                        .author ||
                                    ""
                                }
                                onChange={(
                                    event
                                ) =>
                                    updateSelectedBlock(
                                        {
                                            author: event
                                                .target
                                                .value,
                                        }
                                    )
                                }
                                className="w-full rounded-lg border border-gray-200 p-3 text-sm outline-none transition focus:border-gray-400"
                            />
                        </div>

                        <AlignmentButtons />
                    </div>
                )}

            {/* IMAGEN */}

            {selectedBlock?.type ===
                "image" && (
                    <div className="space-y-6">
                        <div>
                            <label
                                htmlFor="image-file"
                                className="mb-2 block text-sm font-medium"
                            >
                                Imagen
                            </label>

                            <input
                                id="image-file"
                                type="file"
                                accept="image/*"
                                onChange={(
                                    event
                                ) => {
                                    const file =
                                        event
                                            .target
                                            .files?.[0];

                                    if (!file) {
                                        return;
                                    }

                                    const reader = new FileReader();

                                    reader.onload = () => {
                                        if (
                                            typeof reader.result !==
                                            "string"
                                        ) {
                                            return;
                                        }

                                        updateSelectedBlock({
                                            src: reader.result,
                                        });
                                    };

                                    reader.readAsDataURL(file);
                                }}
                                className="w-full text-sm"
                            />
                        </div>

                        <AlignmentButtons />

                        <div>
                            <label
                                htmlFor="image-width"
                                className="mb-2 block text-sm font-medium"
                            >
                                Ancho máximo
                            </label>

                            <input
                                id="image-width"
                                type="number"
                                min="100"
                                max="600"
                                value={
                                    selectedBlock
                                        .props
                                        .width ||
                                    300
                                }
                                onChange={(
                                    event
                                ) =>
                                    updateSelectedBlock(
                                        {
                                            width:
                                                Number(
                                                    event
                                                        .target
                                                        .value
                                                ),
                                        }
                                    )
                                }
                                className="w-full rounded-lg border border-gray-200 p-3 text-sm outline-none focus:border-gray-400"
                            />

                            <p className="mt-1 text-xs text-gray-400">
                                Recomendado: máximo 300 px.
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="image-caption"
                                className="mb-2 block text-sm font-medium"
                            >
                                Pie de imagen
                            </label>

                            <textarea
                                id="image-caption"
                                value={
                                    selectedBlock
                                        .props
                                        .caption ||
                                    ""
                                }
                                onChange={(
                                    event
                                ) =>
                                    updateSelectedBlock(
                                        {
                                            caption:
                                                event
                                                    .target
                                                    .value,
                                        }
                                    )
                                }
                                placeholder="Información sobre la imagen..."
                                className="min-h-[100px] w-full resize-none rounded-lg border border-gray-200 p-3 text-sm leading-6 outline-none transition focus:border-gray-400"
                            />
                        </div>
                    </div>
                )}

            {/* DOBLE IMAGEN */}

            {selectedBlock?.type ===
                "double-image" && (
                    <div className="space-y-8">
                        <div>
                            <h3 className="mb-4 text-sm font-semibold text-gray-700">
                                Imagen izquierda
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="double-image-left"
                                        className="mb-2 block text-xs font-medium text-gray-500"
                                    >
                                        Imagen
                                    </label>

                                    <input
                                        id="double-image-left"
                                        type="file"
                                        accept="image/*"
                                        onChange={(
                                            event
                                        ) => {
                                            const file =
                                                event
                                                    .target
                                                    .files?.[0];

                                            if (
                                                !file
                                            ) {
                                                return;
                                            }

                                            const reader = new FileReader();

                                            reader.onload = () => {
                                                if (
                                                    typeof reader.result !==
                                                    "string"
                                                ) {
                                                    return;
                                                }

                                                updateSelectedBlock({
                                                    leftSrc: reader.result,
                                                });
                                            };

                                            reader.readAsDataURL(file);
                                        }}
                                        className="w-full text-sm"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="double-image-left-caption"
                                        className="mb-2 block text-xs font-medium text-gray-500"
                                    >
                                        Pie de imagen
                                    </label>

                                    <textarea
                                        id="double-image-left-caption"
                                        value={
                                            selectedBlock
                                                .props
                                                .leftCaption ||
                                            ""
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            updateSelectedBlock(
                                                {
                                                    leftCaption:
                                                        event
                                                            .target
                                                            .value,
                                                }
                                            )
                                        }
                                        placeholder="Información sobre la imagen..."
                                        className="min-h-[80px] w-full resize-none rounded-lg border border-gray-200 p-3 text-sm leading-6 outline-none focus:border-gray-400"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-8">
                            <h3 className="mb-4 text-sm font-semibold text-gray-700">
                                Imagen derecha
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="double-image-right"
                                        className="mb-2 block text-xs font-medium text-gray-500"
                                    >
                                        Imagen
                                    </label>

                                    <input
                                        id="double-image-right"
                                        type="file"
                                        accept="image/*"
                                        onChange={(
                                            event
                                        ) => {
                                            const file =
                                                event
                                                    .target
                                                    .files?.[0];

                                            if (
                                                !file
                                            ) {
                                                return;
                                            }

                                            const reader = new FileReader();

reader.onload = () => {
    if (
        typeof reader.result !==
        "string"
    ) {
        return;
    }

    updateSelectedBlock({
        rightSrc: reader.result,
    });
};

reader.readAsDataURL(file);
                                        }}
                                        className="w-full text-sm"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="double-image-right-caption"
                                        className="mb-2 block text-xs font-medium text-gray-500"
                                    >
                                        Pie de imagen
                                    </label>

                                    <textarea
                                        id="double-image-right-caption"
                                        value={
                                            selectedBlock
                                                .props
                                                .rightCaption ||
                                            ""
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            updateSelectedBlock(
                                                {
                                                    rightCaption:
                                                        event
                                                            .target
                                                            .value,
                                                }
                                            )
                                        }
                                        placeholder="Información sobre la imagen..."
                                        className="min-h-[80px] w-full resize-none rounded-lg border border-gray-200 p-3 text-sm leading-6 outline-none focus:border-gray-400"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                            <label
                                htmlFor="double-image-gap"
                                className="mb-2 block text-sm font-medium"
                            >
                                Separación
                            </label>

                            <input
                                id="double-image-gap"
                                type="number"
                                min="0"
                                max="60"
                                value={
                                    selectedBlock
                                        .props
                                        .gap ??
                                    16
                                }
                                onChange={(
                                    event
                                ) =>
                                    updateSelectedBlock(
                                        {
                                            gap:
                                                Number(
                                                    event
                                                        .target
                                                        .value
                                                ),
                                        }
                                    )
                                }
                                className="w-full rounded-lg border border-gray-200 p-3 text-sm outline-none focus:border-gray-400"
                            />
                        </div>
                    </div>
                )}

            {/* TEXTO + IMAGEN */}

            {selectedBlock?.type ===
                "text-image" && (
                    <div className="space-y-6">
                        <div>
                            <label
                                htmlFor="text-image-text"
                                className="mb-2 block text-sm font-medium"
                            >
                                Texto
                            </label>

                            <textarea
                                id="text-image-text"
                                value={
                                    selectedBlock
                                        .props
                                        .text ||
                                    ""
                                }
                                onChange={(
                                    event
                                ) =>
                                    updateSelectedBlock(
                                        {
                                            text: event
                                                .target
                                                .value,
                                        }
                                    )
                                }
                                className="min-h-[160px] w-full resize-none rounded-lg border border-gray-200 p-3 text-sm leading-6 outline-none transition focus:border-gray-400"
                            />
                        </div>

                        <div>
                            <p className="mb-3 text-xs font-medium text-gray-500">
                                Posición de la imagen
                            </p>

                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    onClick={() =>
                                        updateSelectedBlock(
                                            {
                                                imagePosition:
                                                    "left",
                                            }
                                        )
                                    }
                                    className={`rounded-lg border px-3 py-3 text-sm transition ${selectedBlock
                                            .props
                                            .imagePosition ===
                                            "left"
                                            ? "border-gray-900 bg-gray-50 font-medium"
                                            : "border-gray-200 hover:bg-gray-50"
                                        }`}
                                >
                                    ← Izquierda
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        updateSelectedBlock(
                                            {
                                                imagePosition:
                                                    "right",
                                            }
                                        )
                                    }
                                    className={`rounded-lg border px-3 py-3 text-sm transition ${selectedBlock
                                            .props
                                            .imagePosition ===
                                            "right"
                                            ? "border-gray-900 bg-gray-50 font-medium"
                                            : "border-gray-200 hover:bg-gray-50"
                                        }`}
                                >
                                    Derecha →
                                </button>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="text-image-image"
                                className="mb-2 block text-sm font-medium"
                            >
                                Imagen
                            </label>

                            <input
                                id="text-image-image"
                                type="file"
                                accept="image/*"
                                onChange={(
                                    event
                                ) => {
                                    const file =
                                        event
                                            .target
                                            .files?.[0];

                                    if (!file) {
                                        return;
                                    }

                                    const reader = new FileReader();

reader.onload = () => {
    if (
        typeof reader.result !==
        "string"
    ) {
        return;
    }

    updateSelectedBlock({
        imageSrc: reader.result,
    });
};

reader.readAsDataURL(file);
                                }}
                                className="w-full text-sm"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="text-image-width"
                                className="mb-2 block text-sm font-medium"
                            >
                                Ancho de imagen
                            </label>

                            <input
                                id="text-image-width"
                                type="number"
                                min="100"
                                max="400"
                                value={
                                    selectedBlock
                                        .props
                                        .imageWidth ||
                                    220
                                }
                                onChange={(
                                    event
                                ) =>
                                    updateSelectedBlock(
                                        {
                                            imageWidth:
                                                Number(
                                                    event
                                                        .target
                                                        .value
                                                ),
                                        }
                                    )
                                }
                                className="w-full rounded-lg border border-gray-200 p-3 text-sm outline-none focus:border-gray-400"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="text-image-caption"
                                className="mb-2 block text-sm font-medium"
                            >
                                Pie de imagen
                            </label>

                            <textarea
                                id="text-image-caption"
                                value={
                                    selectedBlock
                                        .props
                                        .imageCaption ||
                                    ""
                                }
                                onChange={(
                                    event
                                ) =>
                                    updateSelectedBlock(
                                        {
                                            imageCaption:
                                                event
                                                    .target
                                                    .value,
                                        }
                                    )
                                }
                                placeholder="Información sobre la imagen..."
                                className="min-h-[80px] w-full resize-none rounded-lg border border-gray-200 p-3 text-sm leading-6 outline-none focus:border-gray-400"
                            />
                        </div>
                    </div>
                )}

            {/* LINKS */}

            {selectedBlock &&
                linkFields.length >
                0 && (
                    <div className="mt-8 border-t border-gray-100 pt-6">
                        <p className="mb-4 text-sm font-medium">
                            Links
                        </p>

                        {!showLinkForm && (
                            <button
                                type="button"
                                onClick={() =>
                                    setShowLinkForm(
                                        true
                                    )
                                }
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm transition hover:bg-gray-50"
                            >
                                + Agregar link
                            </button>
                        )}

                        {showLinkForm && (
                            <div className="space-y-4">
                                {linkFields.length >
                                    1 && (
                                        <div>
                                            <label
                                                htmlFor="link-field"
                                                className="mb-2 block text-xs font-medium text-gray-500"
                                            >
                                                Aplicar link a
                                            </label>

                                            <select
                                                id="link-field"
                                                value={
                                                    linkField
                                                }
                                                onChange={(
                                                    event
                                                ) => {
                                                    setLinkField(
                                                        event
                                                            .target
                                                            .value
                                                    );

                                                    setLinkOccurrence(
                                                        0
                                                    );
                                                }}
                                                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
                                            >
                                                {linkFields.map(
                                                    (
                                                        field
                                                    ) => (
                                                        <option
                                                            key={
                                                                field.value
                                                            }
                                                            value={
                                                                field.value
                                                            }
                                                        >
                                                            {
                                                                field.label
                                                            }
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    )}

                                <div>
                                    <label
                                        htmlFor="link-text"
                                        className="mb-2 block text-xs font-medium text-gray-500"
                                    >
                                        Texto del link
                                    </label>

                                    <input
                                        id="link-text"
                                        type="text"
                                        value={
                                            linkText
                                        }
                                        onChange={(
                                            event
                                        ) => {
                                            setLinkText(
                                                event
                                                    .target
                                                    .value
                                            );

                                            setLinkOccurrence(
                                                0
                                            );
                                        }}
                                        placeholder="Ej: Femiciencia"
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
                                    />
                                </div>

                                {linkText.trim() &&
                                    occurrenceCount >
                                    0 && (
                                        <div>
                                            <label
                                                htmlFor="link-occurrence"
                                                className="mb-2 block text-xs font-medium text-gray-500"
                                            >
                                                Aparición
                                            </label>

                                            <select
                                                id="link-occurrence"
                                                value={
                                                    linkOccurrence
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    setLinkOccurrence(
                                                        Number(
                                                            event
                                                                .target
                                                                .value
                                                        )
                                                    )
                                                }
                                                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
                                            >
                                                {availableOccurrences.map(
                                                    (
                                                        occurrence
                                                    ) => (
                                                        <option
                                                            key={
                                                                occurrence
                                                            }
                                                            value={
                                                                occurrence
                                                            }
                                                        >
                                                            Aparición{" "}
                                                            {occurrence +
                                                                1}
                                                        </option>
                                                    )
                                                )}
                                            </select>

                                            {occurrenceCount >
                                                1 && (
                                                    <p className="mt-1 text-xs text-gray-400">
                                                        El texto aparece{" "}
                                                        {
                                                            occurrenceCount
                                                        }{" "}
                                                        veces en este campo.
                                                    </p>
                                                )}
                                        </div>
                                    )}

                                <div>
                                    <label
                                        htmlFor="link-url"
                                        className="mb-2 block text-xs font-medium text-gray-500"
                                    >
                                        URL
                                    </label>

                                    <input
                                        id="link-url"
                                        type="url"
                                        value={
                                            linkUrl
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setLinkUrl(
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                        placeholder="https://..."
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowLinkForm(
                                                false
                                            );
                                            setLinkText(
                                                ""
                                            );
                                            setLinkUrl(
                                                ""
                                            );
                                            setLinkOccurrence(
                                                0
                                            );
                                        }}
                                        className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="button"
                                        onClick={
                                            addLink
                                        }
                                        disabled={
                                            !canAddLink
                                        }
                                        className="flex-1 rounded-lg bg-gray-900 px-3 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        Agregar
                                    </button>
                                </div>
                            </div>
                        )}

                        {links.length >
                            0 && (
                                <div className="mt-6 space-y-2">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Links agregados
                                    </p>

                                    {links.map(
                                        (
                                            link
                                        ) => {
                                            const field =
                                                linkFields.find(
                                                    (
                                                        item
                                                    ) =>
                                                        item.value ===
                                                        link.field
                                                );

                                            return (
                                                <div
                                                    key={
                                                        link.id
                                                    }
                                                    className="rounded-lg bg-gray-50 p-3"
                                                >
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-medium text-gray-700">
                                                                {
                                                                    link.text
                                                                }
                                                            </p>

                                                            <p className="mt-1 truncate text-xs text-gray-400">
                                                                {
                                                                    link.url
                                                                }
                                                            </p>

                                                            {field && (
                                                                <p className="mt-2 text-[11px] text-gray-400">
                                                                    {
                                                                        field.label
                                                                    }

                                                                    {typeof link.occurrence ===
                                                                        "number" &&
                                                                        ` · Aparición ${link.occurrence +
                                                                        1
                                                                        }`}
                                                                </p>
                                                            )}
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                deleteLink(
                                                                    link.id
                                                                )
                                                            }
                                                            className="shrink-0 text-xs text-red-500 hover:text-red-700"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            )}
                    </div>
                )}
        </aside>
    );
}