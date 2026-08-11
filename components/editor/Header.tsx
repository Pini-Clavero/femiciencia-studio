"use client";

type HeaderProps = {
  isSaving: boolean;
  title: string;
  volume: string;
  date: string;
  onUpdateNewsletter: (
    updatedData: {
      title?: string;
      volume?: string;
      date?: string;
    }
  ) => void;
};

export default function Header({
  isSaving,
  title,
  volume,
  date,
  onUpdateNewsletter,
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

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={title}
            onChange={(event) =>
              onUpdateNewsletter({
                title: event.target.value,
              })
            }
            className="w-56 border-b border-transparent bg-transparent font-semibold outline-none transition focus:border-gray-300"
            aria-label="Título del newsletter"
          />

          <div className="flex items-center gap-1 text-xs text-gray-400">
            <span>Volumen</span>

            <input
              type="text"
              value={volume}
              onChange={(event) =>
                onUpdateNewsletter({
                  volume: event.target.value,
                })
              }
              className="w-12 border-b border-transparent bg-transparent text-center outline-none transition focus:border-gray-300"
              aria-label="Volumen del newsletter"
            />

            <span>·</span>

            <input
              type="date"
              value={date}
              onChange={(event) =>
                onUpdateNewsletter({
                  date: event.target.value,
                })
              }
              className="border-b border-transparent bg-transparent text-xs text-gray-400 outline-none transition focus:border-gray-300"
              aria-label="Fecha del newsletter"
            />
          </div>
        </div>

        <span
          className={`text-sm ${
            isSaving ? "text-gray-400" : "text-green-600"
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