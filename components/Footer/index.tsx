import { HeaderSocials } from "@/lib/data";
import FooterText from "./FooterText";

export default function Footer() {
  return (
    <footer className="w-full py-16">
      <div className="container m-auto flex min-h-[25vh] flex-col items-center justify-between gap-y-8">
        <div className="h-auto w-full overflow-clip">
          <FooterText />
        </div>
        <div className="relative flex w-full flex-col items-center gap-y-8 pt-4 lg:flex-row lg:justify-between">
          <div className="absolute top-0 left-0 h-0.5 w-full bg-white/80" />
          <div className="flex items-center justify-center gap-x-2">
            <h3>Logo</h3>
            <h3>Logo</h3>
          </div>
          <div className="">
            <ul className="flex items-center justify-center gap-x-4">
              {HeaderSocials.map((item, index) => (
                <li key={index} className="flex items-center gap-x-2">
                  <item.icon className="h-6 w-6" />
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
