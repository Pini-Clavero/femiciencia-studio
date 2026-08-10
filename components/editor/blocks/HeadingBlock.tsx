type HeadingBlockProps = {
    text: string;
    alignment?: "left" | "center" | "right";
};

export default function HeadingBlock({
    text,
    alignment = "left",
}: HeadingBlockProps) {
    return (
        <h1
            className="break-words text-4xl font-bold"
            style={{
                overflowWrap: "anywhere",
                textAlign: alignment,
            }}
        >
            {text}
        </h1>
    );
}