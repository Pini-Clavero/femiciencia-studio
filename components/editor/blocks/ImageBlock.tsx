type ImageBlockProps = {
    src: string;
    caption: string;
    alignment?: "left" | "center" | "right";
    width?: number;
};

export default function ImageBlock({
    src,
    caption,
    alignment = "center",
    width = 300,
}: ImageBlockProps) {
    return (
        <figure
            className="flex w-full flex-col"
            style={{
                alignItems:
                    alignment === "left"
                        ? "flex-start"
                        : alignment === "right"
                        ? "flex-end"
                        : "center",
            }}
        >
            <img
                src={src}
                alt={caption}
                style={{
                    width: `${width}px`,
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "contain",
                }}
            />

            {caption && (
                <figcaption
                    className="mt-2 text-xs leading-5 text-gray-400"
                    style={{
                        width: `${width}px`,
                        maxWidth: "100%",
                        textAlign: alignment,
                    }}
                >
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}