import { NewsletterBlock, BlockType } from "./types";

export function createBlock(type: BlockType): NewsletterBlock {
    const id = crypto.randomUUID();

    switch (type) {
        case "heading":
            return {
                id,
                type,
                props: {
                    text: "Nuevo título",
                },
            };

        case "paragraph":
            return {
                id,
                type,
                props: {
                    text: "Escribí aquí el contenido de tu newsletter.",
                    links: [],
                },
            };

        case "divider":
            return {
                id,
                type,
                props: {},
            };

        case "quote":
            return {
                id,
                type,
                props: {
                    text: "Escribí aquí una cita.",
                    author: "Autor",
                    links: [],
                },
            };

        case "image":
            return {
                id,
                type,
                props: {
                    src: "",
                    caption: "",
                },
            };
        case "double-image":
            return {
                id,
                type,
                props: {
                    leftSrc: "",
                    leftCaption: "",
                    rightSrc: "",
                    rightCaption: "",
                },
            };
        case "text-image":
            return {
                id,
                type,
                props: {
                    text: "Escribí aquí el contenido.",
                    imageSrc: "",
                    imageCaption: "",
                    imagePosition: "right",
                },
            };
    }
}