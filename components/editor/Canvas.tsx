type CanvasProps = {
  blocks: any[];
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
              className={`cursor-pointer rounded-lg p-2 transition ${
                isSelected
                  ? "outline outline-2 outline-offset-2 outline-pink-400"
                  : "outline-none"
              }`}
            >
              {block.type === "heading" && (
                <h1 className="text-4xl font-bold">
                  {block.props.text}
                </h1>
              )}

              {block.type === "paragraph" && (
                <p className="text-base leading-7 text-gray-700">
                  {block.props.text}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}