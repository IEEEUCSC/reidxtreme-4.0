import { ArrowRight } from "lucide-react";
import Image from "next/image";
import BGImg from "@/public/img/cover.png";
import BubbleUpButton from "@/components/ui/BubbleUpButton/BubbleUpButton";
import { cn } from "@/lib/utils";
import RevealAnimationContainer from "@/components/reveal-animation-container";

// Card data structure
const cardData = {
  teamRegistration: {
    subheading: "Initial Round",
    title: "Team Registration",
    description:
      "The Initial Round of ReidXtreme 4.0 is an online coding competition designed to evaluate participants' problem-solving skills. Top performing teams from this round will qualify for the onsite Grand Finale, an 8 hour intensive coding challenge.",
    link: "/registrations/team-registration",
    status: "open" as const,
  },
  workshops: [
    {
      subheading: "Workshop 1",
      title: "Introduction to Competitive Programming",
      description:
        "The first workshop of ReidXtreme 4.0 provides an introduction to ReidXtreme 4.0 and Competitive Programming, offering participants a clear understanding of the competition structure and essential problem solving fundamentals.",
      link: "#",
      status: "done" as const,
    },
    {
      subheading: "Workshop 2",
      title: "Getting Started with Algorithms in Competitive Programming",
      description:
        "This workshop will introduce participants to the fundamental algorithms used in competitive programming, providing practical insights into their applications and preparing participants to approach problem solving with greater efficiency and confidence.",
      link: "https://forms.gle/bWzRpsFw3cGWeA6y9",
      status: "done" as const,
    },
    {
      subheading: "Workshop 3",
      title: "Dynamic Programming",
      description:
        "Dive deep into Dynamic Programming (DP): learn how to identify DP problems, define states and transitions, optimize with space/time improvements, and apply patterns to classic competitive programming challenges.",
      link: "https://forms.gle/hKuKfvDpQgSdGMdBA",
      // Status set to open now that details & link are available. Change back if not yet accepting registrations.
      status: "open" as const,
    },
  ],
};

// Derive workshop groupings
const openWorkshops = cardData.workshops.filter((w) => w.status === "open");
const pastWorkshops = cardData.workshops.filter((w) => w.status === "done");

// (Optional future) If needed, upcoming workshops could be handled similarly:
// const upcomingWorkshops = cardData.workshops.filter((w) => w.status === "upcoming");

export default function Page() {
  return (
    <main className="relative grid min-h-screen grid-rows-[60vh_1fr] gap-y-4 p-4 lg:grid-cols-2 lg:grid-rows-1">
      <div className="relative flex flex-col items-center justify-center gap-y-4 lg:gap-y-8">
        <div className="mt-24 flex w-full flex-col items-center gap-y-4">
          <RevealAnimationContainer className="mx-auto flex items-center justify-center">
            <h3 className="text-foreground w-full text-xl font-semibold lg:max-w-[75%] lg:text-3xl">
              Team Registration
            </h3>
          </RevealAnimationContainer>
          <RevealAnimationContainer
            delay={0.3}
            className="mx-auto flex items-center justify-center"
          >
            <Card
              subheading={cardData.teamRegistration.subheading}
              title={cardData.teamRegistration.title}
              description={cardData.teamRegistration.description}
              link={cardData.teamRegistration.link}
              status={cardData.teamRegistration.status}
            />
          </RevealAnimationContainer>
        </div>
        <div className="mt-16 flex w-full flex-col items-center gap-y-12">
          {/* Open Workshops Section */}
          <div className="flex w-full flex-col items-center gap-y-8">
            <RevealAnimationContainer
              delay={0.4}
              className="mx-auto flex items-center justify-center"
            >
              <h3 className="text-foreground w-full text-xl font-semibold lg:max-w-[75%] lg:text-3xl">
                Upcoming Workshops
              </h3>
            </RevealAnimationContainer>
            {openWorkshops.length === 0 && (
              <p className="text-muted-foreground text-sm lg:text-base">
                No active workshops at the moment. Please check back soon.
              </p>
            )}
            {openWorkshops.map((workshop, index) => (
              <RevealAnimationContainer
                key={workshop.title}
                delay={0.5 + index * 0.1}
                className="mx-auto flex items-center justify-center"
              >
                <Card
                  subheading={workshop.subheading}
                  title={workshop.title}
                  description={workshop.description}
                  link={workshop.link}
                  status={workshop.status}
                />
              </RevealAnimationContainer>
            ))}
          </div>

          {/* Past Workshops Section */}
          <div className="flex w-full flex-col items-center gap-y-8">
            <RevealAnimationContainer
              delay={0.4}
              className="mx-auto flex items-center justify-center"
            >
              <h3 className="text-foreground w-full text-xl font-semibold lg:max-w-[75%] lg:text-3xl">
                Past Workshops
              </h3>
            </RevealAnimationContainer>
            {pastWorkshops.map((workshop, index) => (
              <RevealAnimationContainer
                key={workshop.title}
                delay={0.5 + index * 0.1}
                className="mx-auto flex items-center justify-center"
              >
                <Card
                  subheading={workshop.subheading}
                  title={workshop.title}
                  description={workshop.description}
                  link={workshop.link}
                  status={workshop.status}
                />
              </RevealAnimationContainer>
            ))}
          </div>
        </div>
      </div>
      <div className="relative row-start-1 overflow-clip rounded-xl lg:sticky lg:top-4 lg:col-start-2 lg:h-[calc(100vh-2rem)]">
        <Image src={BGImg} alt="Background" fill objectFit="cover" />
      </div>
    </main>
  );
}

interface CardProps {
  title: string;
  subheading?: string;
  description: string;
  link: string;
  disabled?: boolean;
  status?: "open" | "upcoming" | "done";
}

const Card = ({
  title,
  subheading,
  description,
  link,
  disabled,
  status = "open",
}: CardProps) => {
  // Get status badge styling
  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "open":
        return {
          classes: `${baseClasses} bg-green-500/20 text-green-400 border border-green-500/50`,
          text: "Open",
        };
      case "upcoming":
        return {
          classes: `${baseClasses} bg-yellow-500/20 text-yellow-400 border border-yellow-500/50`,
          text: "Upcoming",
        };
      case "done":
        return {
          classes: `${baseClasses} bg-gray-500/20 text-gray-400 border border-gray-500/50`,
          text: "Done",
        };
      default:
        return {
          classes: `${baseClasses} bg-green-500/20 text-green-400 border border-green-500/50`,
          text: "Open",
        };
    }
  };

  const statusBadge = getStatusBadge(status);

  // Get button text based on status
  const getButtonText = (status: string) => {
    switch (status) {
      case "done":
        return "Already Done";
      case "upcoming":
        return "Coming Soon";
      case "open":
      default:
        return "Register Now";
    }
  };

  const buttonText = getButtonText(status);

  return (
    <div className="bg-card border-border flex w-full min-w-[300px] flex-col gap-y-4 rounded-2xl border p-4 backdrop-blur-sm transition-colors duration-300 hover:border-[rgba(0,160,116,0.8)] lg:max-w-[75%] lg:p-6">
      <div className="flex flex-col gap-y-1 lg:gap-y-6">
        {subheading && (
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase lg:text-sm">
              {subheading}
            </p>
            <span className={statusBadge.classes}>{statusBadge.text}</span>
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between gap-x-2">
          <h1 className="text-2xl font-semibold text-[rgba(0,160,116)] lg:text-4xl">
            {title}
          </h1>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed lg:text-base">
          {description}
        </p>
      </div>
      <a
        href={link}
        className={cn("", {
          "cursor-not-allowed": disabled,
        })}
        target="_blank"
      >
        <BubbleUpButton
          className="group flex w-full cursor-pointer gap-x-2 py-2 transition-all duration-300 hover:border-[rgba(0,160,116,1)] lg:py-4 lg:text-xl"
          isDisabled={disabled || status === "upcoming" || status === "done"}
        >
          {buttonText}{" "}
          {status === "open" && (
            <ArrowRight
              className="transition-transform duration-300 group-hover:translate-x-2"
              strokeWidth={1.5}
            />
          )}
        </BubbleUpButton>
      </a>
    </div>
  );
};
