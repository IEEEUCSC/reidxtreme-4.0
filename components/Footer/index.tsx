import { HeaderSocials } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="container m-auto flex min-h-[25vh] flex-col items-center justify-center gap-y-8">
        <div className="flex flex-col">
          <div className="flex items-center justify-center gap-x-2">
            <h3>Logo</h3>
            <h3>Logo</h3>
          </div>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div>
          <ul className="flex items-center justify-center gap-x-2">
            {HeaderSocials.map((item, index) => (
              <li key={index}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div></div>
      </div>
    </footer>
  );
}
