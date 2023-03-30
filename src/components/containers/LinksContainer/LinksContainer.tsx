import Link from "next/link";

const LinksContainer: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      {[
        {
          title: "Home Page",
          href: "/",
        },
        {
          title: "Tasks Due Today",
          href: "/today",
        },
        {
          title: "Tasks Due Tomorrow",
          href: "/tomorrow",
        },
        {
          title: "Tasks Due by Next Week",
          href: "/next-week",
        },
      ].map((info, index) => (
        <Link
          key={index}
          className="flex h-32 w-32 max-w-xs items-center justify-center gap-4 rounded-xl bg-white/10 p-4 text-center text-lg text-white hover:bg-white/20"
          href={info.href}
        >
          {info.title}
        </Link>
      ))}
    </div>
  );
};

export default LinksContainer;
