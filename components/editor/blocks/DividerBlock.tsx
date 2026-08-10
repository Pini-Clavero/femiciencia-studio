type DividerBlockProps = {
    style?: "solid" | "dashed";
};

export default function DividerBlock({
    style = "solid",
}: DividerBlockProps) {
    return (
        <div className="py-4">
            <div
                className="w-full"
                style={{
                    borderTop:
                        style === "dashed"
                            ? "1px dashed #e5e7eb"
                            : "1px solid #e5e7eb",
                }}
            />
        </div>
    );
}