import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface MobileFilterToggleProps {
  onClick: () => void;
  isOpen: boolean;
}

export function MobileFilterToggle({ onClick, isOpen }: MobileFilterToggleProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="fixed bottom-4 left-4 z-50 lg:hidden flex items-center gap-2 shadow-lg bg-white dark:bg-[#18181b]"
    >
      <Filter className="h-4 w-4" />
      {isOpen ? "Hide Filters" : "Show Filters"}
    </Button>
  );
}
