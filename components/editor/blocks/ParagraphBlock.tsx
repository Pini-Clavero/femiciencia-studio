type ParagraphBlockProps = {
  text: string;
  links?: {
    id: string;
    text: string;
    url: string;
  }[];
};

export default function ParagraphBlock({
  text,
  links = [],
}: ParagraphBlockProps) {
  const renderText = () => {
    if (links.length === 0) {
      return text;
    }

    let remainingText = text;
    const parts: React.ReactNode[] = [];

    links.forEach((link) => {
      const index = remainingText.indexOf(link.text);

      if (index === -1) {
        return;
      }

      const before = remainingText.slice(0, index);

      if (before) {
        parts.push(before);
      }

      parts.push(
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          {link.text}
        </a>
      );

      remainingText = remainingText.slice(
        index + link.text.length
      );
    });

    if (remainingText) {
      parts.push(remainingText);
    }

    return parts;
  };

  return (
    <p className="text-base leading-7 text-gray-700">
      {renderText()}
    </p>
  );
}