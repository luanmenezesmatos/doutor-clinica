import { HelpCircle } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface QuestionCardProps {
  title?: string;
  description?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  title,
  description,
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <div
          className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100"
          style={{ padding: "0.25rem" }}
        >
          <HelpCircle className="text-accent-foreground" />
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        {title && <h3 className="text-sm font-semibold">{title}</h3>}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};
