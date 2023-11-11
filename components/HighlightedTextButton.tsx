import Link from "next/link";

type props = {
  link?: string;
  text: string;
  classes?: string;
};

export const HighlightedTextButton = ({ link, text, classes }: props) => {
  return (
    <Link
      className={`text-sm transition-colors hover:text-white ${classes}`}
      href={link ? link : "/"}
    >
      {text}
    </Link>
  );
};
