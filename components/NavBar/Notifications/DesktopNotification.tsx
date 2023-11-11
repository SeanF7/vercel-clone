import Image from "next/image";

type Props = {
  id: number;
  image: string;
  description: string;
  time: string;
  archived: boolean;
  triggerReload: () => void;
};

export const DesktopNotification = ({
  image,
  description,
  time,
  id,
  archived,
  triggerReload,
}: Props) => {
  const handleClick = (id: number) => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/notifications?id=${id}`, {
      method: "DELETE",
    }).then(() => {
      triggerReload();
    });
  };

  return (
    <div className="group flex h-20 items-center justify-between p-4 pr-4 shadow-[inset_0px_-1px_1px] shadow-neutral-700 hover:bg-neutral-900">
      <div className="flex items-center gap-6 text-sm ">
        <Image
          height={32}
          width={32}
          src={image}
          alt="Notification Image"
          className="h-8 w-8 rounded-full"
        />
        <div className="flex flex-col">
          <h1 className="text-white">{description}</h1>
          <p>{time}</p>
        </div>
      </div>
      {!archived && (
        <div className="hidden rounded-full text-neutral-500 transition hover:bg-neutral-800 hover:text-neutral-100 group-hover:inline">
          <button className="p-2" onClick={() => handleClick(id)}>
            <svg
              fill="none"
              height="16"
              width="16"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 8v13H3V8" />
              <path d="M1 3h22v5H1z" />
              <path d="M10 12h4" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};
