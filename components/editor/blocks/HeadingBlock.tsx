type HeadingBlockProps = {
  text: string;
};

export default function HeadingBlock({
  text,
}: HeadingBlockProps) {
  return (
    <h1
  className="break-words text-4xl font-bold"
  style={{ overflowWrap: "anywhere" }}
>
  {text}
</h1>
  );
}