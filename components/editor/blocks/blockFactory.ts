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
                    alignment: "left",
                },
            };

        case "paragraph":
            return {
                id,
                type,
                props: {
                    text: "Escribí aquí el contenido de tu newsletter.",
                    links: [],
                    alignment: "left",
                },
            };

        case "divider":
            return {
                id,
                type,
                props: {
                    style: "solid",
                },
            };

        case "quote":
            return {
                id,
                type,
                props: {
                    text: "Escribí aquí una cita.",
                    author: "Autor",
                    links: [],
                    alignment: "left",
                },
            };

        case "image":
            return {
                id,
                type,
                props: {
                    src: "",
                    caption: "",
                    alignment: "center",
                    width: 300,
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
                    gap: 16,
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
                    imageWidth: 220,
                },
            };
    }
}