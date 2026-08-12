export type TextLink = {
    id: string;
    text: string;
    url: string;

    /**
     * Campo textual al que pertenece el link.
     *
     * Ejemplos:
     * - text
     * - author
     * - caption
     * - leftCaption
     * - rightCaption
     * - imageCaption
     */
    field?: string;

    /**
     * Número de aparición del texto enlazado.
     *
     * Ejemplo:
     *
     * Texto:
     * "Femiciencia trabaja con Femiciencia."
     *
     * occurrence: 0 -> primera aparición
     * occurrence: 1 -> segunda aparición
     *
     * Es opcional para mantener compatibilidad
     * con links creados anteriormente.
     */
    occurrence?: number;
};

export type BlockType =
    | "heading"
    | "paragraph"
    | "divider"
    | "quote"
    | "image"
    | "double-image"
    | "text-image";

export type TextAlignment =
    | "left"
    | "center"
    | "right";

export type DividerStyle =
    | "solid"
    | "dashed";

export type ImagePosition =
    | "left"
    | "right";

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