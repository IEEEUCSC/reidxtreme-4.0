import { HeaderNav } from "@/lib/data";
import HeaderMenuTarget from "./HeaderMenuTarget";

export default function HeaderMenu() {
  return (
    <div className="absolute top-0 flex min-h-screen w-full items-center bg-green-400 pt-[70px] lg:px-8">
      <nav className="w-full">
        <ul className="flex w-full flex-col gap-y-2">
          {HeaderNav.map((item, i) => (
            <HeaderMenuTarget
              key={item.title}
              link={item.link}
              title={item.title}
              index={i}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}
