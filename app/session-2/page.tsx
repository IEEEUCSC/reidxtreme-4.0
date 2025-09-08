import type { Metadata } from "next";
import Workshop2Client from "./Workshop2Client";

// Workshop data
const workshopData = {
  subheading: "Workshop 2",
  title: "Getting Started with Algorithms in Competitive Programming",
  description:
    "Learn fundamental algorithms used in competitive programming with practical insights and applications to improve your problem-solving efficiency.",
  speaker: {
    name: "Dinuka Amarasinghe",
    title: "DevOps Engineer at Cambio",
    description:
      "Get ready to learn from Dinuka Amarasinghe, a skilled DevOps Engineer at Cambio, as he guides you through algorithms in competitive programming.",
    image: "/img/sessions/session2-cover.jpeg",
  },
  sessionTime: "7:00 PM",
  meetingLink:
    "https://zoom.us/j/92957770964?pwd=bItSG9nGA725wzyFcygSzqR6cthPiM.1", // Replace with actual meeting link
  redirectDelay: 5, // seconds
};

export const metadata: Metadata = {
  title:
    "Workshop 2: Getting Started with Algorithms in Competitive Programming | ReidXtreme 4.0",
  description:
    "Join Dinuka Amarasinghe, DevOps Engineer at Cambio, for an intensive workshop on fundamental algorithms used in competitive programming. Learn practical insights and applications to improve your problem-solving efficiency.",
  openGraph: {
    title:
      "Workshop 2: Getting Started with Algorithms in Competitive Programming",
    description:
      "Join Dinuka Amarasinghe for an intensive workshop on fundamental algorithms used in competitive programming.",
    images: [
      {
        url: "https://cdn.jsdelivr.net/gh/IEEEUCSC/reidxtreme-4.0@main/public/img/sessions/session2-cover.jpeg",
        width: 1200,
        height: 630,
        alt: "Workshop 2: Getting Started with Algorithms in Competitive Programming - Dinuka Amarasinghe",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Workshop 2: Getting Started with Algorithms in Competitive Programming",
    description:
      "Join Dinuka Amarasinghe for an intensive workshop on fundamental algorithms used in competitive programming.",
    images: [
      "https://cdn.jsdelivr.net/gh/IEEEUCSC/reidxtreme-4.0@main/public/img/sessions/session2-cover.jpeg",
    ],
  },
};

export default function Workshop2Page() {
  return <Workshop2Client workshopData={workshopData} />;
}
