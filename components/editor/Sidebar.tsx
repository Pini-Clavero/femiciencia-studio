export default function Sidebar() {
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
            <button>Título</button>
            <button>Párrafo</button>
            <button>Cita</button>
            <button>Separador</button>
          </div>

        </section>

        <section>

          <h3 className="mb-3 text-xs font-semibold uppercase text-gray-400">
            Imágenes
          </h3>

          <div className="space-y-2">
            <button>Imagen</button>
            <button>Imagen doble</button>
            <button>Texto + Imagen</button>
          </div>

        </section>

      </div>
    </aside>
  );
}