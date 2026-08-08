import { useState } from "react";


type PropertiesProps = {
    selectedBlockId: string | null;
    blocks: any[];
    updateBlock: (
        blockId: string,
        updatedProps: Record<string, any>
    ) => void;
};

export default function Properties({
    selectedBlockId,
    blocks,
    updateBlock,
}: PropertiesProps) {
    const selectedBlock = blocks.find(
        (block) => block.id === selectedBlockId
    );
    const [showLinkForm, setShowLinkForm] = useState(false);
    const [linkText, setLinkText] = useState("");
    const [linkUrl, setLinkUrl] = useState("");

    return (
        <aside className="w-80 border-l bg-white p-6">
            <h2 className="mb-6 text-lg font-semibold">
                Propiedades
            </h2>

            {!selectedBlock && (
                <p className="text-sm text-gray-500">
                    Selecciona un bloque para editar sus propiedades.
                </p>
            )}

            {selectedBlock?.type === "heading" && (
                <div>
                    <label
                        htmlFor="heading-text"
                        className="mb-2 block text-sm font-medium"
                    >
                        Título
                    </label>

                    <textarea
                        id="heading-text"
                        value={selectedBlock.props.text}
                        onChange={(event) =>
                            updateBlock(selectedBlock.id, {
                                text: event.target.value,
                            })
                        }
                        className="min-h-[100px] w-full resize-none rounded-lg border border-gray-200 p-3 text-sm outline-none transition focus:border-gray-400"
                    />
                </div>
            )}

            {selectedBlock?.type === "paragraph" && (
                <div>
                    <label
                        htmlFor="paragraph-text"
                        className="mb-2 block text-sm font-medium"
                    >
                        Texto
                    </label>

                    <textarea
                        id="paragraph-text"
                        value={selectedBlock.props.text}
                        onChange={(event) =>
                            updateBlock(selectedBlock.id, {
                                text: event.target.value,
                            })
                        }
                        className="min-h-[180px] w-full resize-none rounded-lg border border-gray-200 p-3 text-sm leading-6 outline-none transition focus:border-gray-400"
                    />
                    <div className="mt-6 border-t border-gray-100 pt-6">
                        <p className="mb-4 text-sm font-medium">
                            Links
                        </p>

                        {!showLinkForm && (
                            <button
                                type="button"
                                onClick={() => setShowLinkForm(true)}
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm transition hover:bg-gray-50"
                            >
                                + Agregar link
                            </button>
                        )}
                        {showLinkForm && (
                            <div className="space-y-4">
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
                                        value={linkText}
                                        onChange={(event) => setLinkText(event.target.value)}
                                        placeholder="Ej: Femiciencia"
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
                                    />
                                </div>

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
                                        value={linkUrl}
                                        onChange={(event) => setLinkUrl(event.target.value)}
                                        placeholder="https://..."
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowLinkForm(false);
                                            setLinkText("");
                                            setLinkUrl("");
                                        }}
                                        className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (!selectedBlockId || !linkText.trim() || !linkUrl.trim()) {
                                                return;
                                            }

                                            const selectedBlock = blocks.find(
                                                (block) => block.id === selectedBlockId
                                            );

                                            if (!selectedBlock) {
                                                return;
                                            }

                                            const currentLinks = selectedBlock.props.links || [];

                                            const normalizedUrl =
                                                linkUrl.startsWith("http://") ||
                                                    linkUrl.startsWith("https://")
                                                    ? linkUrl
                                                    : `https://${linkUrl}`;

                                            const newLink = {
                                                id: crypto.randomUUID(),
                                                text: linkText,
                                                url: normalizedUrl,
                                            };

                                            updateBlock(selectedBlockId, {
                                                links: [...currentLinks, newLink],
                                            });

                                            setLinkText("");
                                            setLinkUrl("");
                                            setShowLinkForm(false);
                                        }}
                                        className="flex-1 rounded-lg bg-gray-900 px-3 py-2 text-sm text-white"
                                    >
                                        Agregar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {selectedBlock?.props.links?.length > 0 && (
                <div className="mt-5 space-y-2">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Links agregados
                    </p>

                    {selectedBlock.props.links.map(
                        (link: {
                            id: string;
                            text: string;
                            url: string;
                        }) => (
                            <div
                                key={link.id}
                                className="rounded-lg bg-gray-50 p-3"
                            >
                                <p className="text-sm font-medium text-gray-700">
                                    {link.text}
                                </p>

                                <p className="mt-1 truncate text-xs text-gray-400">
                                    {link.url}
                                </p>
                            </div>
                        )
                    )}
                </div>
            )}

            {selectedBlock?.type === "quote" && (
                <div className="space-y-5">
                    <div>
                        <label
                            htmlFor="quote-text"
                            className="mb-2 block text-sm font-medium"
                        >
                            Cita
                        </label>

                        <textarea
                            id="quote-text"
                            value={selectedBlock.props.text}
                            onChange={(event) =>
                                updateBlock(selectedBlock.id, {
                                    text: event.target.value,
                                })
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
                            value={selectedBlock.props.author}
                            onChange={(event) =>
                                updateBlock(selectedBlock.id, {
                                    author: event.target.value,
                                })
                            }
                            className="w-full rounded-lg border border-gray-200 p-3 text-sm outline-none transition focus:border-gray-400"
                        />
                    </div>
                </div>
            )}
            {selectedBlock?.type === "image" && (
                <div className="space-y-5">
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
                            onChange={(event) => {
                                const file = event.target.files?.[0];

                                if (!file) {
                                    return;
                                }

                                const imageUrl = URL.createObjectURL(file);

                                updateBlock(selectedBlock.id, {
                                    src: imageUrl,
                                });
                            }}
                            className="w-full text-sm"
                        />
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
                            value={selectedBlock.props.caption}
                            onChange={(event) =>
                                updateBlock(selectedBlock.id, {
                                    caption: event.target.value,
                                })
                            }
                            placeholder="Información sobre la imagen..."
                            className="min-h-[100px] w-full resize-none rounded-lg border border-gray-200 p-3 text-sm leading-6 outline-none transition focus:border-gray-400"
                        />
                    </div>
                </div>
            )}
            {selectedBlock?.type === "double-image" && (
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
                                    onChange={(event) => {
                                        const file = event.target.files?.[0];

                                        if (!file) {
                                            return;
                                        }

                                        const imageUrl = URL.createObjectURL(file);

                                        updateBlock(selectedBlock.id, {
                                            leftSrc: imageUrl,
                                        });
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
                                    value={selectedBlock.props.leftCaption}
                                    onChange={(event) =>
                                        updateBlock(selectedBlock.id, {
                                            leftCaption: event.target.value,
                                        })
                                    }
                                    placeholder="Información sobre la imagen..."
                                    className="min-h-[80px] w-full resize-none rounded-lg border border-gray-200 p-3 text-sm leading-6 outline-none transition focus:border-gray-400"
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
                                    onChange={(event) => {
                                        const file = event.target.files?.[0];

                                        if (!file) {
                                            return;
                                        }

                                        const imageUrl = URL.createObjectURL(file);

                                        updateBlock(selectedBlock.id, {
                                            rightSrc: imageUrl,
                                        });
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
                                    value={selectedBlock.props.rightCaption}
                                    onChange={(event) =>
                                        updateBlock(selectedBlock.id, {
                                            rightCaption: event.target.value,
                                        })
                                    }
                                    placeholder="Información sobre la imagen..."
                                    className="min-h-[80px] w-full resize-none rounded-lg border border-gray-200 p-3 text-sm leading-6 outline-none transition focus:border-gray-400"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {selectedBlock?.type === "text-image" && (
                <div className="space-y-6">
                    <div>
                        <label
                            htmlFor="text-image-text"
                            className="mb-2 block text-xs font-medium text-gray-500"
                        >
                            Texto
                        </label>

                        <textarea
                            id="text-image-text"
                            value={selectedBlock.props.text}
                            onChange={(event) =>
                                updateBlock(selectedBlock.id, {
                                    text: event.target.value,
                                })
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
                                    updateBlock(selectedBlock.id, {
                                        imagePosition: "left",
                                    })
                                }
                                className={`rounded-lg border px-3 py-3 text-sm transition ${selectedBlock.props.imagePosition === "left"
                                        ? "border-gray-900 bg-gray-50 font-medium"
                                        : "border-gray-200 hover:bg-gray-50"
                                    }`}
                            >
                                ← Izquierda
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    updateBlock(selectedBlock.id, {
                                        imagePosition: "right",
                                    })
                                }
                                className={`rounded-lg border px-3 py-3 text-sm transition ${selectedBlock.props.imagePosition === "right"
                                        ? "border-gray-900 bg-gray-50 font-medium"
                                        : "border-gray-200 hover:bg-gray-50"
                                    }`}
                            >
                                Derecha →
                            </button>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                        <label
                            htmlFor="text-image-image"
                            className="mb-2 block text-xs font-medium text-gray-500"
                        >
                            Imagen
                        </label>

                        <input
                            id="text-image-image"
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                                const file = event.target.files?.[0];

                                if (!file) {
                                    return;
                                }

                                const imageUrl = URL.createObjectURL(file);

                                updateBlock(selectedBlock.id, {
                                    imageSrc: imageUrl,
                                });
                            }}
                            className="w-full text-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="text-image-caption"
                            className="mb-2 block text-xs font-medium text-gray-500"
                        >
                            Pie de imagen
                        </label>

                        <textarea
                            id="text-image-caption"
                            value={selectedBlock.props.imageCaption}
                            onChange={(event) =>
                                updateBlock(selectedBlock.id, {
                                    imageCaption: event.target.value,
                                })
                            }
                            placeholder="Información sobre la imagen..."
                            className="min-h-[80px] w-full resize-none rounded-lg border border-gray-200 p-3 text-sm leading-6 outline-none transition focus:border-gray-400"
                        />
                    </div>
                </div>
            )}
        </aside>
    );
}