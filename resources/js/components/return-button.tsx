import { Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getShopUrlWithFilters } from "@/utils/filter-persistence";

interface ReturnButtonProps {
  href?: string;
  label?: string;
  iconPosition?: "left" | "right";
  className?: string;
  useSavedFilters?: boolean;
}

export default function ReturnButton({
  href,
  label = "Back to Home",
  iconPosition = "left",
  className = "",
  useSavedFilters = true,
}: ReturnButtonProps) {
  const finalHref = href || (useSavedFilters ? getShopUrlWithFilters() : route("shop"));

  return (
    <Button asChild variant="ghost" className={className}>
      <Link href={finalHref} className="flex items-center gap-2">
        {iconPosition === "left" && <ArrowLeft className="w-4 h-4" />}
        <span>{label}</span>
        {iconPosition === "right" && <ArrowLeft className="w-4 h-4 rotate-180" />}
      </Link>
    </Button>
  );
}
