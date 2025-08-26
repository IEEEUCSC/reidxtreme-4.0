import { SocialLinkData } from "./types";
import {
  Instagram,
  Linkedin,
} from "lucide-react";

export const HeaderNav = [
  {
    title: "About",
    link: "#about",
  },
  {
    title: "Timeline",
    link: "#timeline",
  },
  {
    title: "Prizes",
    link: "#prizes",
  },
  {
    title: "Sponsors",
    link: "#sponsors",
  },
  {
    title: "FAQ",
    link: "#faq",
  },
];

export const HeaderSocials: SocialLinkData[] = [
  {
    title: "Instagram",
    link: "https://instagram.com",
    icon: Instagram,
  },
  {
    title: "LinkedIn",
    link: "https://linkedin.com",
    icon: Linkedin,
  },
];
