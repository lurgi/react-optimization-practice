import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Header = () => {
  const { pathname } = useLocation();

  const routes = [
    { path: "/", text: "Home" },
    { path: "/throttle", text: "Throttle" },
    { path: "/debounce", text: "Debounce" },
    { path: "/virtualized-list", text: "Virtualized List" },
  ];

  return (
    <header className="flex justify-center py-4 shadow-sm">
      <nav>
        <ul className="flex gap-x-3">
          {routes.map(({ path, text }) => (
            <li
              key={text}
              className={twMerge(
                "px-4 py-2 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-950 transition",
                `${pathname}` === path ? "text-neutral-950" : ""
              )}>
              <Link to={path}>{text}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
