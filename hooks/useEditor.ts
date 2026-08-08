import { useState } from "react";
import { Block } from "@/types/block";

export function useEditor() {

  const [blocks, setBlocks] = useState<Block[]>([]);

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  return {

    blocks,

    setBlocks,

    selectedBlockId,

    setSelectedBlockId,

  };

}