import React from "react";

// Interface for social data (without the onClose function)
export interface SocialLinkData {
  title: string;
  link: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Interface for the component props (includes onClose function)
export interface HeaderSocialTargetProps extends SocialLinkData {
  onClose: () => void;
}
