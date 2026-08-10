type HeaderProps = {
  isSaving: boolean;
};

export default function Header({
  isSaving,
}: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">

      <div className="flex items-center gap-4">

        <button
          type="button"
          className="text-xl text-gray-500 transition hover:text-gray-900"
        >
          ←
        </button>

        <h1 className="font-semibold">
          Edición XXX
        </h1>

        <span
          className={`text-sm ${
            isSaving
              ? "text-gray-400"
              : "text-green-600"
          }`}
        >
          {isSaving
            ? "Guardando..."
            : "✓ Guardado automáticamente"}
        </span>

      </div>

      <div className="flex items-center gap-3">

        <button
          type="button"
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600"
        >
          Desktop
        </button>

        <button
          type="button"
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600"
        >
          Mobile
        </button>

        <button
          type="button"
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600"
        >
          Vista previa
        </button>

        <button
          type="button"
          className="rounded-xl bg-black px-5 py-2 text-sm text-white"
        >
          Publicar
        </button>

      </div>

    </header>
  );
}