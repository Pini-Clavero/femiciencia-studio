import HeadingBlock from "./blocks/HeadingBlock";
import ParagraphBlock from "./blocks/ParagraphBlock";
import DividerBlock from "./blocks/DividerBlock";
import QuoteBlock from "./blocks/QuoteBlock";
import ImageBlock from "./blocks/ImageBlock";
import { NewsletterBlock } from "./blocks/types";

type CanvasProps = {
    blocks: NewsletterBlock[];
    selectedBlockId: string | null;
    setSelectedBlockId: (id: string) => void;
};

export default function Canvas({
    blocks,
    selectedBlockId,
    setSelectedBlockId,
}: CanvasProps) {
    return (
        <section className="flex flex-1 justify-center overflow-y-auto p-10">
            <div className="min-h-[900px] w-[600px] rounded-2xl bg-white p-8 shadow-sm">
                {blocks.length === 0 && (
                    <div className="flex min-h-[700px] items-center justify-center">
                        <div className="text-center">
                            <p className="text-lg font-medium text-gray-700">
                                Tu newsletter comienza aquí
                            </p>

                            <p className="mt-2 text-sm text-gray-400">
                                Elegí un bloque de la biblioteca para comenzar a crear.
                            </p>
                        </div>
                    </div>
                )}

                {blocks.map((block) => {
                    const isSelected = selectedBlockId === block.id;

                    return (
                        <div
                            key={block.id}
                            onClick={() => setSelectedBlockId(block.id)}
                            className={`cursor-pointer rounded-lg p-2 transition ${isSelected
                                    ? "outline outline-2 outline-offset-2 outline-pink-400"
                                    : "outline-none"
                                }`}
                        >
                            {block.type === "heading" && (
                                <HeadingBlock text={block.props.text} />
                            )}

                            {block.type === "paragraph" && (
  <ParagraphBlock
    text={block.props.text}
    links={block.props.links}
  />
)}

                            {block.type === "divider" && <DividerBlock />}

                            {block.type === "quote" && (
                                <QuoteBlock
                                    text={block.props.text}
                                    author={block.props.author}
                                />
                            )}
                            {block.type === "image" && block.props.src && (
                                <ImageBlock
                                    src={block.props.src}
                                    caption={block.props.caption}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}