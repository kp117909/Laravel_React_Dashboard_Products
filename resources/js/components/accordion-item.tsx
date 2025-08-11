import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface AccordionItemSheetProps {
  value: string;
  title: React.ReactNode;
  children: React.ReactNode;
}

export default function AccordionItemSheet({ value, title, children }: AccordionItemSheetProps) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}
