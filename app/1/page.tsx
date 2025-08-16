import { GalleryVerticalEnd, MoveRight } from "lucide-react";
import BGImg from "@/assets/registerBg.png";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import BubbleUpButton from "@/components/ui/BubbleUpButton/BubbleUpButton";
import { ScrollArea } from "@/components/ui/scroll-area";
export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <ScrollArea className="max-w-4xs h-screen w-full">
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
          </ScrollArea>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={BGImg}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
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
