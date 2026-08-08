export type TextLink = {
  id: string;
  text: string;
  url: string;
};

export type BlockType =
  | "heading"
  | "paragraph"
  | "divider"
  | "quote"
  | "image"
  | "double-image"
  | "text-image";

export type NewsletterBlock = {
  id: string;
  type: BlockType;
  props: Record<string, any>;
};