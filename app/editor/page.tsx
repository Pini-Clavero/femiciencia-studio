"use client";

import { useState } from "react";

import Header from "@/components/editor/Header";
import Sidebar from "@/components/editor/Sidebar";
import Canvas from "@/components/editor/Canvas";
import Properties from "@/components/editor/Properties";
import StatusBar from "@/components/editor/StatusBar";

import { createBlock } from "@/components/editor/blocks/blockFactory";
import { NewsletterBlock } from "@/components/editor/blocks/types";

export default function EditorPage() {
  const [blocks, setBlocks] = useState<NewsletterBlock[]>([]);

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const updateBlock = (
    blockId: string,
    updatedProps: Record<string, any>
  ) => {
    setBlocks((currentBlocks) =>
      currentBlocks.map((block) => {
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
      })
    );
  };

  const addBlock = (
    type:
      | "heading"
      | "paragraph"
      | "divider"
      | "quote"
      | "image"
      | "double-image"
      | "text-image",
    afterBlockId?: string
  ) => {
    const newBlock = createBlock(type);

    setBlocks((currentBlocks) => {
      // Si no indicamos un bloque de referencia,
      // agregamos el nuevo bloque al final.
      if (!afterBlockId) {
        return [...currentBlocks, newBlock];
      }

      // Buscamos la posición del bloque después
      // del cual queremos insertar el nuevo bloque.
      const blockIndex = currentBlocks.findIndex(
        (block) => block.id === afterBlockId
      );

      // Si no encontramos el bloque de referencia,
      // mantenemos el comportamiento anterior.
      if (blockIndex === -1) {
        return [...currentBlocks, newBlock];
      }

      // Insertamos el nuevo bloque inmediatamente
      // después del bloque de referencia.
      return [
        ...currentBlocks.slice(0, blockIndex + 1),
        newBlock,
        ...currentBlocks.slice(blockIndex + 1),
      ];
    });

    setSelectedBlockId(newBlock.id);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 overflow-hidden">
        <Sidebar
          onAddHeading={() => addBlock("heading")}
          onAddParagraph={() => addBlock("paragraph")}
          onAddDivider={() => addBlock("divider")}
          onAddQuote={() => addBlock("quote")}
          onAddImage={() => addBlock("image")}
          onAddDoubleImage={() => addBlock("double-image")}
          onAddTextImage={() => addBlock("text-image")}
        />

        <Canvas
  blocks={blocks}
  selectedBlockId={selectedBlockId}
  setSelectedBlockId={setSelectedBlockId}
  onAddBlock={addBlock}
/>

        <Properties
          selectedBlockId={selectedBlockId}
          blocks={blocks}
          updateBlock={updateBlock}
        />
      </main>

      <StatusBar />
    </div>
  );
}