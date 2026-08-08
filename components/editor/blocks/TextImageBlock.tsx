type TextImageBlockProps = {
  text: string;
  imageSrc: string;
  imageCaption: string;
  imagePosition: "left" | "right";
};

export default function TextImageBlock({
  text,
  imageSrc,
  imageCaption,
  imagePosition,
}: TextImageBlockProps) {
  const image = (
    <figure className="flex min-w-0 flex-col items-center">
      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageCaption}
          className="h-[220px] w-full object-cover"
        />
      )}

      {imageCaption && (
        <figcaption className="mt-2 text-center text-xs leading-5 text-gray-400">
          {imageCaption}
        </figcaption>
      )}
    </figure>
  );

  const content = (
  <div className="min-w-0 flex-1 overflow-hidden">
<p
  className="break-words text-base leading-7 text-gray-700"
  style={{ overflowWrap: "anywhere" }}
>      {text}
    </p>
  </div>
);

  return (
    <div className="grid grid-cols-2 items-start gap-6">
      {imagePosition === "left" ? (
        <>
          {image}
          {content}
        </>
      ) : (
        <>
          {content}
          {image}
        </>
      )}
    </div>
  );
}