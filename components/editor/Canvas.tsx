type CanvasProps = {
  blocks: any[];
};

export default function Canvas({ blocks }: CanvasProps) {

  return (

    <section className="flex flex-1 justify-center overflow-y-auto p-10">

      <div className="min-h-[900px] w-[600px] rounded-2xl bg-white p-8 shadow-sm">

        {blocks.map((block) => (

          <div key={block.id}>

            {block.type === "heading" && (

              <h1 className="text-4xl font-bold">

                {block.props.text}

              </h1>

            )}

          </div>

        ))}

      </div>

    </section>

  );

}