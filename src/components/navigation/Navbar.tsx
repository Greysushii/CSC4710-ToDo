import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav
      className="bg-gradient-to-r from-gray-900
    via-purple-900 to-violet-600 px-2 py-2.5 text-white sm:px-4"
    >
      <div className="container mx-auto flex flex-wrap items-center justify-between text-xl font-medium">
        <Link href="/">
          CSC 4710 <span className="text-[hsl(280,100%,70%)]">ToDo</span> App
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col p-4  md:mt-0 md:flex-row md:space-x-8 md:border-0 md:text-xl md:font-medium">
            <li>
              <Link
                href="/"
                className="block py-2 pl-3 pr-4 text-white hover:text-purple-300 dark:text-white md:bg-transparent md:p-0"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block py-2 pl-3 pr-4 text-white hover:text-purple-300 dark:text-white md:bg-transparent md:p-0"
                aria-current="page"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/authors"
                className="block py-2 pl-3 pr-4 text-white hover:text-purple-300 dark:text-white md:bg-transparent md:p-0"
                aria-current="page"
              >
                Authors
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
