type DoubleImageBlockProps = {
  leftSrc: string;
  leftCaption: string;
  rightSrc: string;
  rightCaption: string;
};

export default function DoubleImageBlock({
  leftSrc,
  leftCaption,
  rightSrc,
  rightCaption,
}: DoubleImageBlockProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <figure className="flex flex-col items-center">
        {leftSrc && (
          <img
            src={leftSrc}
            alt={leftCaption}
            className="h-[220px] w-full object-cover"
          />
        )}

        {leftCaption && (
          <figcaption className="mt-2 text-center text-xs leading-5 text-gray-400">
            {leftCaption}
          </figcaption>
        )}
      </figure>

      <figure className="flex flex-col items-center">
        {rightSrc && (
          <img
            src={rightSrc}
            alt={rightCaption}
            className="h-[220px] w-full object-cover"
          />
        )}

        {rightCaption && (
          <figcaption className="mt-2 text-center text-xs leading-5 text-gray-400">
            {rightCaption}
          </figcaption>
        )}
      </figure>
    </div>
  );
}