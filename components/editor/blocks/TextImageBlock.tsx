type TextImageBlockProps = {
    text: string;
    imageSrc: string;
    imageCaption: string;
    imagePosition: "left" | "right";
    imageWidth?: number;
};

export default function TextImageBlock({
    text,
    imageSrc,
    imageCaption,
    imagePosition,
    imageWidth = 220,
}: TextImageBlockProps) {
    const image = (
        <figure
            className="shrink-0"
            style={{
                width: `${imageWidth}px`,
                maxWidth: "100%",
            }}
        >
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={imageCaption}
                    className="h-auto w-full object-cover"
                />
            )}

            {imageCaption && (
                <figcaption className="mt-2 text-center text-xs leading-5 text-gray-400">
                    {imageCaption}
                </figcaption>
            )}
        </figure>
    );

    const content = (
        <div
            className="min-w-0 flex-1 text-base leading-7 text-gray-700"
            style={{
                overflowWrap: "anywhere",
            }}
        >
            {text}
        </div>
    );

    return (
        <div className="flex items-start gap-6">
            {imagePosition === "left" ? (
                <>
                    {image}
                    {content}
                </>
            ) : (
                <>
                    {content}
                    {image}
                </>
            )}
        </div>
    );
}