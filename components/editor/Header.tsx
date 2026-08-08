 export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">
      <div className="flex items-center gap-6">
        <button>←</button>

        <h1 className="font-semibold">
          Edición XXX
        </h1>

        <span className="text-sm text-green-600">
          ✓ Guardado automáticamente
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button>Desktop</button>

        <button>Mobile</button>

        <button>Vista previa</button>

        <button className="rounded-xl bg-black px-5 py-2 text-white">
          Publicar
        </button>
      </div>
    </header>
  );
}