type PropertiesProps = {
  selectedBlockId: string | null;
  blocks: any[];
};

export default function Properties({
  selectedBlockId,
  blocks,
}: PropertiesProps) {
  const selectedBlock = blocks.find(
    (block) => block.id === selectedBlockId
  );

  return (
    <aside className="w-80 border-l bg-white p-6">
      <h2 className="mb-6 text-lg font-semibold">
        Propiedades
      </h2>

      {!selectedBlock && (
        <p className="text-sm text-gray-500">
          Selecciona un bloque para editar sus propiedades.
        </p>
      )}

      {selectedBlock?.type === "heading" && (
        <div>
          <p className="mb-2 text-sm font-medium">
            Título
          </p>

          <p className="text-sm text-gray-500">
            {selectedBlock.props.text}
          </p>
        </div>
      )}
    </aside>
  );
}