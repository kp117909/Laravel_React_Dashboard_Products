import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import PriceRangeSlider from "./price-range-slider";
import SearchInput from "./search-input";
import { Category, Product } from "@/types";
import { YearFilter } from "./filters/year-filter";
import { CategoryFilter } from "./filters/category-filter";

const ratings = ["4", "3", "2", "1"];

interface Props {
    products: Product[];
    categories: Category[];
    years: number[];
    selectedYears: Set<number>;
    onYearsChange: (years: Set<number>) => void;
    onCategoriesChange: (categories: Set<number>) => void;
    selectedCategories: Set<number>;
    onSearchChange: (search: string) => void;
}

export default function ProductFilters({
     categories,
     products,
     onYearsChange,
     selectedYears,
     years,
     onCategoriesChange,
     selectedCategories,
     onSearchChange }: Props) {

  const [search, setSearch] = useState("");
  const [price, setPrice] = useState([0, 100]);

  const handleSearchChange = (search: string) => {
    setSearch(search);
    onSearchChange(search);
  };

  return (
    <div className="p-4 space-y-6 text-left">
      <h2 className="text-xl font-bold">Shop Products</h2>
      <h3 className="text-md font-semibold">Filters</h3>

      <SearchInput value={search} onChange={handleSearchChange} />
      <PriceRangeSlider value={price} onChange={setPrice} />


      <Accordion type="multiple" className="w-full space-y-2">


        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-medium">Categories</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            <CategoryFilter categories={categories} selected={selectedCategories} onChange={onCategoriesChange} />
          </AccordionContent>
        </AccordionItem>


        <AccordionItem value="availability">
          <AccordionTrigger className="text-sm font-medium">Availability</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="availability" />
              <Label htmlFor="availability" className="text-sm">Available</Label>
            </div>
          </AccordionContent>
        </AccordionItem>


        <AccordionItem value="years">
        <AccordionTrigger className="text-sm font-medium">Years</AccordionTrigger>
            <AccordionContent className="space-y-2 pt-2">
                <YearFilter years={years} selected={selectedYears} onChange={onYearsChange} />
            </AccordionContent>
        </AccordionItem>


        <AccordionItem value="rating">
          <AccordionTrigger className="text-sm font-medium">Rating</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {ratings.map((rate) => (
              <div key={rate} className="flex items-center space-x-2">
                <Checkbox id={`rate-${rate}`} />
                <Label htmlFor={`rate-${rate}`} className="text-sm">
                  {"★".repeat(Number(rate))} & Up
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  );
}

