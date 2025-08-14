import Link from "next/link";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import BGImg from "@/assets/registerBg.png";
import Logo from "@/assets/logo.png";
import BubbleUpButton from "@/components/ui/BubbleUpButton/BubbleUpButton";

export default function Page() {
  return (
    <main className="grid lg:grid-cols-2 min-h-screen bg-black p-4 grid-rows-2 lg:grid-rows-1 gap-y-4 relative">
      <div className="relative flex flex-col items-center justify-center gap-y-2 lg:gap-y-4 ">
        <Image
          src={Logo}
          alt="Reidxtreme Logo"
          width={150}
          height={150}
          className="rounded-full absolute top-8 lg:block hidden"
        />
        <Card
          title="Workshop Registration"
          description="Description"
          link="/register"
        />
        <Card
          title="Team Registration"
          description="Description"
          link="/register"
        />
      </div>
      <div className="relative rounded-xl overflow-clip row-start-1 lg:col-start-2">
        <Image src={BGImg} alt="Background" fill objectFit="cover" />
      </div>
    </main>
  );
}

interface CardProps {
  title: string;
  description: string;
  link: string;
}

const Card = ({ title, description, link }: CardProps) => {
  return (
    <div className="border border-[rgba(0,160,116,0.5)] lg:p-6 p-4 flex flex-col gap-y-4 w-full min-w-[300px] lg:max-w-[75%] rounded-2xl ">
      <div className="flex flex-col gap-y-1 lg:gap-y-2">
        <h1 className="text-2xl lg:text-5xl font-semibold text-[rgba(0,160,116)]">
          {title}
        </h1>
        <p className="text-sm lg:text-base text-white/80">{description}</p>
      </div>
      <Link href={link} className="">
        <BubbleUpButton className="cursor-pointer border rounded-full w-full flex text-xl py-2 lg:py-4 gap-x-2 group border-[rgba(0,160,116,0.5)] text-white/80">
          Register Now <MoveRight className="group-hover:translate-x-2" />
        </BubbleUpButton>
      </Link>
    </div>
  );
};
