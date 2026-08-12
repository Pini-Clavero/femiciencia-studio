"use client";

import { useEffect, useState } from "react";

import Header from "@/components/editor/Header";
import Sidebar from "@/components/editor/Sidebar";
import Canvas from "@/components/editor/Canvas";
import Properties from "@/components/editor/Properties";
import StatusBar from "@/components/editor/StatusBar";

import { createBlock } from "@/components/editor/blocks/blockFactory";
import {
    Newsletter,
    NewsletterBlock,
    BlockType,
} from "@/components/editor/blocks/types";

const STORAGE_KEY = "femiciencia-studio-newsletter";

const createInitialNewsletter = (): Newsletter => ({
    id: crypto.randomUUID(),
    title: "Nuevo newsletter",
    volume: "XXX",
    date: new Date().toISOString().split("T")[0],
    blocks: [],
});

export default function EditorPage() {
    const [newsletter, setNewsletter] =
        useState<Newsletter | null>(null);

    const [selectedBlockId, setSelectedBlockId] =
        useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    const [isSaving, setIsSaving] = useState(false);

    /*
     * CARGAR NEWSLETTER GUARDADO
     */
    useEffect(() => {
        try {
            const savedNewsletter =
                localStorage.getItem(STORAGE_KEY);

            if (!savedNewsletter) {
                setNewsletter(createInitialNewsletter());
                return;
            }

            const parsedData = JSON.parse(savedNewsletter);

            /*
             * Compatibilidad con el formato anterior:
             *
             * NewsletterBlock[]
             */
            if (Array.isArray(parsedData)) {
                setNewsletter({
                    ...createInitialNewsletter(),
                    blocks: parsedData,
                });

                return;
            }

            /*
             * Formato actual:
             *
             * Newsletter
             */
            if (
                parsedData &&
                typeof parsedData === "object" &&
                Array.isArray(parsedData.blocks)
            ) {
                setNewsletter(parsedData as Newsletter);
                return;
            }

            setNewsletter(createInitialNewsletter());
        } catch (error) {
            console.error(
                "No se pudo cargar el newsletter guardado:",
                error
            );

            setNewsletter(createInitialNewsletter());
        } finally {
            setIsLoading(false);
        }
    }, []);

    /*
     * GUARDADO AUTOMÁTICO
     */
    useEffect(() => {
        if (isLoading || !newsletter) {
            return;
        }

        setIsSaving(true);

        const saveTimeout = window.setTimeout(() => {
            try {
                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(newsletter)
                );

                setIsSaving(false);
            } catch (error) {
                console.error(
                    "No se pudo guardar el newsletter:",
                    error
                );

                setIsSaving(false);
            }
        }, 500);

        return () => {
            window.clearTimeout(saveTimeout);
        };
    }, [newsletter, isLoading]);

    /*
     * ACTUALIZAR PROPIEDADES DE UN BLOQUE
     */
    const updateBlock = (
    blockId: string,
    updatedProps: Record<string, any>
) => {
    setNewsletter((currentNewsletter) => {
        if (!currentNewsletter) {
            return currentNewsletter;
        }

        return {
            ...currentNewsletter,
            blocks: currentNewsletter.blocks.map(
                (block) => {
                    if (block.id !== blockId) {
                        return block;
                    }

                    return {
                        ...block,
                        props: {
                            ...block.props,
                            ...updatedProps,
                        },
                    };
                }
            ),
        };
    });
};

/*
 * ACTUALIZAR DATOS DEL NEWSLETTER
 */
const updateNewsletter = (
    updatedData: {
        title?: string;
        volume?: string;
        date?: string;
    }
) => {
    setNewsletter((currentNewsletter) => {
        if (!currentNewsletter) {
            return currentNewsletter;
        }

        return {
            ...currentNewsletter,
            ...updatedData,
        };
    });
};
    /*
     * AGREGAR BLOQUE
     */
    const addBlock = (
        type: BlockType,
        afterBlockId?: string
    ) => {
        const newBlock = createBlock(type);

        setNewsletter((currentNewsletter) => {
            if (!currentNewsletter) {
                return currentNewsletter;
            }

            const currentBlocks =
                currentNewsletter.blocks;

            if (!afterBlockId) {
                return {
                    ...currentNewsletter,
                    blocks: [
                        ...currentBlocks,
                        newBlock,
                    ],
                };
            }

            const blockIndex =
                currentBlocks.findIndex(
                    (block) =>
                        block.id === afterBlockId
                );

            if (blockIndex === -1) {
                return {
                    ...currentNewsletter,
                    blocks: [
                        ...currentBlocks,
                        newBlock,
                    ],
                };
            }

            return {
                ...currentNewsletter,
                blocks: [
                    ...currentBlocks.slice(
                        0,
                        blockIndex + 1
                    ),
                    newBlock,
                    ...currentBlocks.slice(
                        blockIndex + 1
                    ),
                ],
            };
        });

        setSelectedBlockId(newBlock.id);
    };

    /*
     * DUPLICAR BLOQUE
     */
    const duplicateBlock = (blockId: string) => {
        let duplicatedBlockId:
            string | null = null;

        setNewsletter((currentNewsletter) => {
            if (!currentNewsletter) {
                return currentNewsletter;
            }

            const currentBlocks =
                currentNewsletter.blocks;

            const blockIndex =
                currentBlocks.findIndex(
                    (block) =>
                        block.id === blockId
                );

            if (blockIndex === -1) {
                return currentNewsletter;
            }

            const originalBlock =
                currentBlocks[blockIndex];

            const duplicatedBlock:
                NewsletterBlock = {
                ...originalBlock,
                id: crypto.randomUUID(),
                props: {
                    ...originalBlock.props,
                },
            };

            duplicatedBlockId =
                duplicatedBlock.id;

            return {
                ...currentNewsletter,
                blocks: [
                    ...currentBlocks.slice(
                        0,
                        blockIndex + 1
                    ),
                    duplicatedBlock,
                    ...currentBlocks.slice(
                        blockIndex + 1
                    ),
                ],
            };
        });

        if (duplicatedBlockId) {
            setSelectedBlockId(
                duplicatedBlockId
            );
        }
    };

    /*
     * ELIMINAR BLOQUE
     */
    const deleteBlock = (blockId: string) => {
        setNewsletter((currentNewsletter) => {
            if (!currentNewsletter) {
                return currentNewsletter;
            }

            return {
                ...currentNewsletter,
                blocks:
                    currentNewsletter.blocks.filter(
                        (block) =>
                            block.id !== blockId
                    ),
            };
        });

        setSelectedBlockId(null);
    };

    /*
     * MOVER BLOQUE
     */
    const moveBlock = (
        draggedBlockId: string,
        targetBlockId: string
    ) => {
        setNewsletter((currentNewsletter) => {
            if (!currentNewsletter) {
                return currentNewsletter;
            }

            const currentBlocks =
                currentNewsletter.blocks;

            const draggedIndex =
                currentBlocks.findIndex(
                    (block) =>
                        block.id === draggedBlockId
                );

            const targetIndex =
                currentBlocks.findIndex(
                    (block) =>
                        block.id === targetBlockId
                );

            if (
                draggedIndex === -1 ||
                targetIndex === -1 ||
                draggedIndex === targetIndex
            ) {
                return currentNewsletter;
            }

            const newBlocks = [
                ...currentBlocks,
            ];

            const [draggedBlock] =
                newBlocks.splice(
                    draggedIndex,
                    1
                );

            const adjustedTargetIndex =
                draggedIndex < targetIndex
                    ? targetIndex - 1
                    : targetIndex;

            newBlocks.splice(
                adjustedTargetIndex,
                0,
                draggedBlock
            );

            return {
                ...currentNewsletter,
                blocks: newBlocks,
            };
        });

        setSelectedBlockId(
            draggedBlockId
        );
    };

    if (isLoading || !newsletter) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <p className="text-sm text-gray-400">
                    Cargando newsletter...
                </p>
            </div>
        );
    }

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-gray-50">

            <Header
    isSaving={isSaving}
    title={newsletter.title}
    volume={newsletter.volume}
    date={newsletter.date}
    onUpdateNewsletter={updateNewsletter}
/>

            <main className="flex min-h-0 flex-1 overflow-hidden">

                {/* BIBLIOTECA */}
                <aside className="w-72 shrink-0 overflow-y-auto border-r bg-white">
                    <Sidebar
                        onAddHeading={() =>
                            addBlock("heading")
                        }
                        onAddParagraph={() =>
                            addBlock("paragraph")
                        }
                        onAddDivider={() =>
                            addBlock("divider")
                        }
                        onAddQuote={() =>
                            addBlock("quote")
                        }
                        onAddImage={() =>
                            addBlock("image")
                        }
                        onAddDoubleImage={() =>
                            addBlock("double-image")
                        }
                        onAddTextImage={() =>
                            addBlock("text-image")
                        }
                    />
                </aside>

                {/* CANVAS CENTRAL */}
                <Canvas
                    blocks={newsletter.blocks}
                    selectedBlockId={
                        selectedBlockId
                    }
                    setSelectedBlockId={
                        setSelectedBlockId
                    }
                    onAddBlock={addBlock}
                    onDuplicateBlock={
                        duplicateBlock
                    }
                    onDeleteBlock={
                        deleteBlock
                    }
                    onMoveBlock={moveBlock}
                    onUpdateBlock={
                        updateBlock
                    }
                />

                {/* PROPIEDADES */}
                <aside className="w-80 shrink-0 overflow-y-auto border-l bg-white">
                    <Properties
    selectedBlockId={selectedBlockId}
    blocks={newsletter.blocks}
    updateBlock={updateBlock}
/>
                </aside>

            </main>

            <StatusBar />

        </div>
    );
}