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
        </aside>
    );
}