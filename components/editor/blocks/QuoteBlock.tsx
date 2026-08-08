type QuoteBlockProps = {
  text: string;
  author: string;
};

export default function QuoteBlock({
  text,
  author,
}: QuoteBlockProps) {
  return (
    <blockquote className="border-l-4 border-gray-300 py-2 pl-5">
      <p className="text-lg italic leading-7 text-gray-700">
        “{text}”
      </p>

      <footer className="mt-3 text-sm text-gray-400">
        — {author}
      </footer>
    </blockquote>
  );
}