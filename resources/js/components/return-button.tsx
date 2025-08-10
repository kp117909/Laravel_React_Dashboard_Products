import { Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReturnButtonProps {
  href?: string;
  label?: string;
  iconPosition?: "left" | "right";
  className?: string;
}

export default function ReturnButton({
  href = route("shop"),
  label = "Back to Home",
  iconPosition = "left",
  className = "",
}: ReturnButtonProps) {
  return (
    <Button asChild variant="ghost" className={className}>
      <Link href={href} className="flex items-center gap-2">
        {iconPosition === "left" && <ArrowLeft className="w-4 h-4" />}
        <span>{label}</span>
        {iconPosition === "right" && <ArrowLeft className="w-4 h-4 rotate-180" />}
      </Link>
    </Button>
  );
}
