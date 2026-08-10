"use client";

import { useState } from "react";

import Header from "@/components/editor/Header";
import Sidebar from "@/components/editor/Sidebar";
import Canvas from "@/components/editor/Canvas";
import Properties from "@/components/editor/Properties";
import StatusBar from "@/components/editor/StatusBar";

import { createBlock } from "@/components/editor/blocks/blockFactory";
import { NewsletterBlock } from "@/components/editor/blocks/types";

type BlockType =
  | "heading"
  | "paragraph"
  | "divider"
  | "quote"
  | "image"
  | "double-image"
  | "text-image";

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
    type: BlockType,
    afterBlockId?: string
  ) => {
    const newBlock = createBlock(type);

    setBlocks((currentBlocks) => {
      if (!afterBlockId) {
        return [...currentBlocks, newBlock];
      }

      const blockIndex = currentBlocks.findIndex(
        (block) => block.id === afterBlockId
      );

      if (blockIndex === -1) {
        return [...currentBlocks, newBlock];
      }

      return [
        ...currentBlocks.slice(0, blockIndex + 1),
        newBlock,
        ...currentBlocks.slice(blockIndex + 1),
      ];
    });

    setSelectedBlockId(newBlock.id);
  };

  const duplicateBlock = (blockId: string) => {
    let duplicatedBlockId: string | null = null;

    setBlocks((currentBlocks) => {
      const blockIndex = currentBlocks.findIndex(
        (block) => block.id === blockId
      );

      if (blockIndex === -1) {
        return currentBlocks;
      }

      const originalBlock = currentBlocks[blockIndex];

      const duplicatedBlock: NewsletterBlock = {
        ...originalBlock,
        id: crypto.randomUUID(),
        props: {
          ...originalBlock.props,
        },
      };

      duplicatedBlockId = duplicatedBlock.id;

      return [
        ...currentBlocks.slice(0, blockIndex + 1),
        duplicatedBlock,
        ...currentBlocks.slice(blockIndex + 1),
      ];
    });

    if (duplicatedBlockId) {
      setSelectedBlockId(duplicatedBlockId);
    }
  };

  const deleteBlock = (blockId: string) => {
    setBlocks((currentBlocks) =>
      currentBlocks.filter((block) => block.id !== blockId)
    );

    setSelectedBlockId(null);
  };

  const moveBlock = (
    draggedBlockId: string,
    targetBlockId: string
  ) => {
    setBlocks((currentBlocks) => {
      const draggedIndex = currentBlocks.findIndex(
        (block) => block.id === draggedBlockId
      );

      const targetIndex = currentBlocks.findIndex(
        (block) => block.id === targetBlockId
      );

      if (draggedIndex === -1 || targetIndex === -1) {
        return currentBlocks;
      }

      if (draggedIndex === targetIndex) {
        return currentBlocks;
      }

      const newBlocks = [...currentBlocks];

      const [draggedBlock] = newBlocks.splice(draggedIndex, 1);

      const adjustedTargetIndex =
        draggedIndex < targetIndex
          ? targetIndex - 1
          : targetIndex;

      newBlocks.splice(adjustedTargetIndex, 0, draggedBlock);

      return newBlocks;
    });

    setSelectedBlockId(draggedBlockId);
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
          onDuplicateBlock={duplicateBlock}
          onDeleteBlock={deleteBlock}
          onMoveBlock={moveBlock}
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