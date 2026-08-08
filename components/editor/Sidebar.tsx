type SidebarProps = {
  onAddHeading: () => void;
  onAddParagraph: () => void;
};

export default function Sidebar({
  onAddHeading,
  onAddParagraph,
}: SidebarProps) {
  return (
    <aside className="w-72 border-r bg-white p-6">
      <h2 className="mb-6 text-lg font-semibold">
        Biblioteca
      </h2>

      <div className="space-y-8">
        <section>
          <h3 className="mb-3 text-xs font-semibold uppercase text-gray-400">
            Texto
          </h3>

          <div className="space-y-2">
            <button
              type="button"
              onClick={onAddHeading}
              className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-left text-sm transition hover:bg-gray-50"
            >
              Título
            </button>

            <button
              type="button"
              onClick={onAddParagraph}
              className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-left text-sm transition hover:bg-gray-50"
            >
              Párrafo
            </button>

            <button
              type="button"
              className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-left text-sm text-gray-400"
            >
              Cita
            </button>

            <button
              type="button"
              className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-left text-sm text-gray-400"
            >
              Separador
            </button>
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-xs font-semibold uppercase text-gray-400">
            Imágenes
          </h3>

          <div className="space-y-2">
            <button
              type="button"
              className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-left text-sm text-gray-400"
            >
              Imagen
            </button>

            <button
              type="button"
              className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-left text-sm text-gray-400"
            >
              Imagen doble
            </button>

            <button
              type="button"
              className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-left text-sm text-gray-400"
            >
              Texto + Imagen
            </button>
          </div>
        </section>
      </div>
    </aside>
  );
}