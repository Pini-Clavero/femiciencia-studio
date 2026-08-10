type DoubleImageBlockProps = {
    leftSrc: string;
    leftCaption: string;
    rightSrc: string;
    rightCaption: string;
    gap?: number;
};

export default function DoubleImageBlock({
    leftSrc,
    leftCaption,
    rightSrc,
    rightCaption,
    gap = 16,
}: DoubleImageBlockProps) {
    return (
        <div
            className="grid grid-cols-2"
            style={{
                gap: `${gap}px`,
            }}
        >
            <figure className="min-w-0">
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

            <figure className="min-w-0">
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