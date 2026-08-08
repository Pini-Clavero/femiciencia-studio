"use client";

import { useState } from "react";

import Header from "@/components/editor/Header";
import Sidebar from "@/components/editor/Sidebar";
import Canvas from "@/components/editor/Canvas";
import Properties from "@/components/editor/Properties";
import StatusBar from "@/components/editor/StatusBar";

export default function EditorPage() {
  const [blocks, setBlocks] = useState([
    {
      id: crypto.randomUUID(),
      type: "heading",
      props: {
        text: "Bienvenidas a Femiciencia",
      },
    },
  ]);

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

  const addHeading = () => {
    const newBlock = {
      id: crypto.randomUUID(),
      type: "heading",
      props: {
        text: "Nuevo título",
      },
    };

    setBlocks((currentBlocks) => [
      ...currentBlocks,
      newBlock,
    ]);

    setSelectedBlockId(newBlock.id);
  };

  return (
    <div className="flex h-screen flex-col bg-[#F8F8F7]">
      <Header />

      <main className="flex flex-1 overflow-hidden">
        <Sidebar onAddHeading={addHeading} />

        <Canvas
          blocks={blocks}
          selectedBlockId={selectedBlockId}
          setSelectedBlockId={setSelectedBlockId}
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