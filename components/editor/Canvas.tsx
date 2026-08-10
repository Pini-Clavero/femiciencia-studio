"use client";

import { useState } from "react";

import HeadingBlock from "./blocks/HeadingBlock";
import ParagraphBlock from "./blocks/ParagraphBlock";
import DividerBlock from "./blocks/DividerBlock";
import QuoteBlock from "./blocks/QuoteBlock";
import ImageBlock from "./blocks/ImageBlock";
import DoubleImageBlock from "./blocks/DoubleImageBlock";
import TextImageBlock from "./blocks/TextImageBlock";
import { NewsletterBlock } from "./blocks/types";

type BlockType =
  | "heading"
  | "paragraph"
  | "divider"
  | "quote"
  | "image"
  | "double-image"
  | "text-image";

type CanvasProps = {
  blocks: NewsletterBlock[];
  selectedBlockId: string | null;
  setSelectedBlockId: (id: string) => void;
  onAddBlock: (type: BlockType, afterBlockId?: string) => void;
  onDuplicateBlock: (blockId: string) => void;
  onDeleteBlock: (blockId: string) => void;
  onMoveBlock: (
    draggedBlockId: string,
    targetBlockId: string
  ) => void;
};

export default function Canvas({
  blocks,
  selectedBlockId,
  setSelectedBlockId,
  onAddBlock,
  onDuplicateBlock,
  onDeleteBlock,
  onMoveBlock,
}: CanvasProps) {
  const [insertAfterBlockId, setInsertAfterBlockId] =
    useState<string | null>(null);

  const [draggedBlockId, setDraggedBlockId] =
    useState<string | null>(null);

  const [dragOverBlockId, setDragOverBlockId] =
    useState<string | null>(null);

  const handleAddBlock = (type: BlockType) => {
    if (!insertAfterBlockId) {
      return;
    }

    onAddBlock(type, insertAfterBlockId);
    setInsertAfterBlockId(null);
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    blockId: string
  ) => {
    setDraggedBlockId(blockId);

    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", blockId);
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    blockId: string
  ) => {
    event.preventDefault();

    if (!draggedBlockId || draggedBlockId === blockId) {
      return;
    }

    event.dataTransfer.dropEffect = "move";

    setDragOverBlockId(blockId);
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    targetBlockId: string
  ) => {
    event.preventDefault();

    const draggedId =
      event.dataTransfer.getData("text/plain") ||
      draggedBlockId;

    if (!draggedId || draggedId === targetBlockId) {
      setDraggedBlockId(null);
      setDragOverBlockId(null);
      return;
    }

    onMoveBlock(draggedId, targetBlockId);

    setDraggedBlockId(null);
    setDragOverBlockId(null);
  };

  const handleDragEnd = () => {
    setDraggedBlockId(null);
    setDragOverBlockId(null);
  };

  return (
    <section className="flex flex-1 justify-center overflow-y-auto p-10">
      <div className="min-h-[900px] w-[600px] rounded-2xl bg-white p-8 shadow-sm">

        {blocks.length === 0 && (
          <div className="flex min-h-[800px] items-center justify-center text-center">
            <div>
              <p className="text-lg text-gray-500">
                Tu newsletter comienza aquí
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Elegí un bloque de la biblioteca para comenzar.
              </p>
            </div>
          </div>
        )}

        {blocks.map((block) => {
          const isSelected = selectedBlockId === block.id;
          const isInsertMenuOpen =
            insertAfterBlockId === block.id;
          const isDragged = draggedBlockId === block.id;
          const isDragOver = dragOverBlockId === block.id;

          return (
            <div
              key={block.id}
              onDragOver={(event) =>
                handleDragOver(event, block.id)
              }
              onDrop={(event) =>
                handleDrop(event, block.id)
              }
              className="relative"
            >

              {/* INDICADOR DE POSICIÓN */}
              {isDragOver && (
                <div className="absolute -top-1 left-0 right-0 z-20 h-1 rounded-full bg-pink-400" />
              )}

              <div
                onClick={() =>
                  setSelectedBlockId(block.id)
                }
                className={`min-w-0 max-w-full overflow-hidden cursor-pointer rounded-lg p-2 transition ${
                  isSelected
                    ? "outline outline-2 outline-offset-2 outline-pink-400"
                    : "outline-none"
                } ${
                  isDragged
                    ? "opacity-40"
                    : "opacity-100"
                }`}
              >

                {/* HANDLE DE ARRASTRE */}
                <div className="mb-1 flex h-5 items-center">
                  <div
                    draggable
                    onDragStart={(event) =>
                      handleDragStart(
                        event,
                        block.id
                      )
                    }
                    onDragEnd={handleDragEnd}
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                    className="flex h-5 w-7 cursor-grab items-center justify-center rounded text-gray-300 transition hover:bg-gray-100 hover:text-gray-500 active:cursor-grabbing"
                    title="Arrastrar bloque"
                  >
                    ⋮⋮
                  </div>
                </div>

                {block.type === "heading" && (
                  <HeadingBlock
                    text={block.props.text}
                  />
                )}

                {block.type === "paragraph" && (
                  <ParagraphBlock
                    text={block.props.text}
                    links={block.props.links}
                  />
                )}

                {block.type === "divider" && (
                  <DividerBlock />
                )}

                {block.type === "quote" && (
                  <QuoteBlock
                    text={block.props.text}
                    author={block.props.author}
                  />
                )}

                {block.type === "image" &&
                  block.props.src && (
                    <ImageBlock
                      src={block.props.src}
                      caption={block.props.caption}
                    />
                  )}

                {block.type === "double-image" && (
                  <DoubleImageBlock
                    leftSrc={block.props.leftSrc}
                    leftCaption={block.props.leftCaption}
                    rightSrc={block.props.rightSrc}
                    rightCaption={block.props.rightCaption}
                  />
                )}

                {block.type === "text-image" && (
                  <TextImageBlock
                    text={block.props.text}
                    imageSrc={block.props.imageSrc}
                    imageCaption={
                      block.props.imageCaption
                    }
                    imagePosition={
                      block.props.imagePosition
                    }
                  />
                )}
              </div>

              {/* ACCIONES DEL BLOQUE */}
              {isSelected && (
                <div className="flex justify-center gap-2 py-2">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onDuplicateBlock(block.id);
                    }}
                    className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition hover:border-gray-300 hover:bg-gray-50"
                  >
                    Duplicar
                  </button>

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onDeleteBlock(block.id);
                    }}
                    className="rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-500 shadow-sm transition hover:bg-red-50"
                  >
                    Eliminar
                  </button>
                </div>
              )}

              {/* BOTÓN + */}
              <div className="relative flex justify-center py-2">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();

                    setInsertAfterBlockId(
                      isInsertMenuOpen
                        ? null
                        : block.id
                    );
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-white text-lg text-gray-500 shadow-sm transition hover:border-pink-400 hover:bg-pink-50 hover:text-pink-500"
                  aria-label="Agregar bloque"
                >
                  +
                </button>

                {/* MENÚ DE INSERCIÓN */}
                {isInsertMenuOpen && (
                  <div className="absolute top-full z-50 mt-1 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                    <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Agregar bloque
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        handleAddBlock("heading")
                      }
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      Título
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleAddBlock("paragraph")
                      }
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      Párrafo
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleAddBlock("quote")
                      }
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      Cita
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleAddBlock("divider")
                      }
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      Separador
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleAddBlock("image")
                      }
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      Imagen
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleAddBlock(
                          "double-image"
                        )
                      }
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      Imagen doble
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleAddBlock(
                          "text-image"
                        )
                      }
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      Texto + Imagen
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}