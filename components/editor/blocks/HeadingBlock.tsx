type HeadingBlockProps = {
  text: string;
};

export default function HeadingBlock({
  text,
}: HeadingBlockProps) {
  return (
    <h1 className="text-4xl font-bold">
      {text}
    </h1>
  );
}