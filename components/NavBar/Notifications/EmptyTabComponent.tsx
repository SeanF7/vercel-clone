type Props = {
  text: string;
  svgImport: React.ReactNode;
};

export const EmptyTabComponent = ({ text, svgImport }: Props) => {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full bg-neutral-900 p-4 text-neutral-400">
          {svgImport}
        </div>

        <span className="text-sm "> {text}</span>
      </div>
    </div>
  );
};
