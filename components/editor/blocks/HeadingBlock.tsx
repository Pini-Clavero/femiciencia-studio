type Props = {

  text: string;

}

export default function HeadingBlock({ text }: Props) {

  return (

    <h1 className="text-4xl font-bold">

      {text}

    </h1>

  );

}