export type BlockType =
  | "heading"
  | "paragraph"
  | "image"

export interface Block {

  id: string

  type: BlockType

  props: {

    text?: string

    src?: string

    alt?: string

  }

}