export type BlockType =
  | "heading"
  | "paragraph"
  | "divider"
  | "quote"
  | "image";

export type NewsletterBlock = {
  id: string;
  type: BlockType;
  props: Record<string, any>;
};