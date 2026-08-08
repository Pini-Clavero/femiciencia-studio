type ImageBlockProps = {
  src: string;
  caption: string;
};

export default function ImageBlock({
  src,
  caption,
}: ImageBlockProps) {
  return (
    <figure className="flex flex-col items-center">
      <img
        src={src}
        alt={caption}
        className="max-h-[300px] w-auto max-w-full object-contain"
      />

      {caption && (
        <figcaption className="mt-2 text-center text-xs leading-5 text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}