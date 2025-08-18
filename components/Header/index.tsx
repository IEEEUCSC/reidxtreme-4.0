import HeaderMenu from "./HeaderMenu";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-[9999] min-h-[70px] w-full border border-red-500">
      <HeaderMenu />
      <div className="relative">
        <h1>logo</h1>
      </div>
      <div className="relative">
        <button>Register button</button>
        <button className="group flex w-8 flex-col gap-y-1">
          <span className="ml-auto h-0.5 w-[75%] bg-white group-hover:w-full" />
          <span className="mx-auto h-0.5 w-[75%] bg-white group-hover:w-full" />
          <span className="mr-auto h-0.5 w-[75%] bg-white group-hover:w-full" />
        </button>
      </div>
    </header>
  );
}
