import Link from "next/link";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import BGImg from "@/assets/registerBg.png";
import BubbleUpButton from "@/components/ui/BubbleUpButton/BubbleUpButton";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <main className="relative grid min-h-screen grid-rows-[60vh_1fr] gap-y-4 p-4 lg:grid-cols-2 lg:grid-rows-1">
      <div className="relative flex flex-col items-center justify-center gap-y-4 lg:gap-y-8">
        <Card
          title="Team Registration"
          description="Description"
          link="/register"
        />
        <div className="flex w-full flex-col items-center gap-y-4">
          <h3 className="w-full text-xl text-white lg:max-w-[75%] lg:text-3xl">
            Workshop Registration
          </h3>
          <Card
            title="Workshop 01"
            description="Description"
            link="/register"
            disabled
          />
          <Card
            title="Workshop 02"
            description="Description"
            link="/register"
          />
          <Card
            title="Workshop 03"
            description="Description"
            link="/register"
          />
        </div>
      </div>
      <div className="relative row-start-1 overflow-clip rounded-xl lg:col-start-2">
        <Image src={BGImg} alt="Background" fill objectFit="cover" />
      </div>
    </main>
  );
}

interface CardProps {
  title: string;
  description: string;
  link: string;
  disabled?: boolean;
}

const Card = ({ title, description, link, disabled }: CardProps) => {
  return (
    <div className="flex w-full min-w-[300px] flex-col gap-y-4 rounded-2xl border border-[rgba(0,160,116,0.5)] p-4 lg:max-w-[75%] lg:p-6">
      <div className="flex flex-col gap-y-1 lg:gap-y-2">
        <h1 className="text-2xl font-semibold text-[rgba(0,160,116)] lg:text-4xl">
          {title}
        </h1>
        <p className="text-sm text-white/80 lg:text-base">{description}</p>
      </div>
      <Link
        href={link}
        className={cn("", {
          "cursor-not-allowed": disabled,
        })}
      >
        <BubbleUpButton
          className="group flex w-full cursor-pointer gap-x-2 rounded-full border border-[rgba(0,160,116,0.5)] py-2 text-white/80 lg:py-4 lg:text-xl"
          isDisabled={disabled}
        >
          Register Now <MoveRight className="group-hover:translate-x-2" />
        </BubbleUpButton>
      </Link>
    </div>
  );
};
