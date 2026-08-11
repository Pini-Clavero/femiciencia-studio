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

export type TextAlignment = "left" | "center" | "right";

export type DividerStyle = "solid" | "dashed";

export type ImagePosition = "left" | "right";

export type NewsletterBlock = {
  id: string;
  type: BlockType;
  props: Record<string, any>;
};

export type Newsletter = {
  id: string;
  title: string;
  volume: string;
  date: string;
  blocks: NewsletterBlock[];
};