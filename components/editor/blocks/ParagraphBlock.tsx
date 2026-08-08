type ParagraphBlockProps = {
  text: string;
};

export default function ParagraphBlock({
  text,
}: ParagraphBlockProps) {
  return (
    <p className="text-base leading-7 text-gray-700">
      {text}
    </p>
  );
}