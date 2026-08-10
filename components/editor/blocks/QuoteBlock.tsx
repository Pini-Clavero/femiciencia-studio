type QuoteBlockProps = {
    text: string;
    author: string;
    alignment?: "left" | "center" | "right";
};

export default function QuoteBlock({
    text,
    author,
    alignment = "left",
}: QuoteBlockProps) {
    return (
        <blockquote
            className="text-lg italic leading-7 text-gray-700"
            style={{
                overflowWrap: "anywhere",
                textAlign: alignment,
            }}
        >
            “{text}”

            <footer
                className="mt-3 text-sm text-gray-400"
                style={{
                    overflowWrap: "anywhere",
                    textAlign: alignment,
                }}
            >
                — {author}
            </footer>
        </blockquote>
    );
}