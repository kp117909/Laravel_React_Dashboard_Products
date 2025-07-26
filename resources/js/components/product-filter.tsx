import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import PriceRangeSlider from "./price-range-slider";
import SearchInput from "./search-input";

const categories = ["Clothing", "Shoes", "Accessories", "Sportswear", "Outerwear", "Formal Wear", "Casual Wear"];
const brands = ["Nike", "Adidas", "Puma", "Under Armour", "New Balance", "Levi's", "H&M", "Zara"];
const ratings = ["4", "3", "2", "1"];

export default function ProductFilters() {
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState([0, 100]);

  return (
    <div className="p-4 space-y-6 text-left">
      <h2 className="text-xl font-bold">Shop Products</h2>
      <h3 className="text-md font-semibold">Filters</h3>

      <SearchInput value={search} onChange={setSearch} />
      <PriceRangeSlider value={price} onChange={setPrice} />


      <Accordion type="multiple" className="w-full space-y-2">

        {/* Categories */}
        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-medium">Categories</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {categories.map((cat) => (
              <div key={cat} className="flex items-center space-x-2">
                <Checkbox id={`cat-${cat}`} />
                <Label htmlFor={`cat-${cat}`} className="text-sm">{cat}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Brands */}
        <AccordionItem value="brands">
          <AccordionTrigger className="text-sm font-medium">Brands</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox id={`brand-${brand}`} />
                <Label htmlFor={`brand-${brand}`} className="text-sm">{brand}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Colors */}
        <AccordionItem value="colors">
          <AccordionTrigger className="text-sm font-medium">Colors</AccordionTrigger>
          <AccordionContent className="pt-2 text-sm text-muted-foreground">
            {/* Example placeholder */}
            <p>Color pickers go here.</p>
          </AccordionContent>
        </AccordionItem>

        {/* Sizes */}
        <AccordionItem value="sizes">
          <AccordionTrigger className="text-sm font-medium">Sizes</AccordionTrigger>
          <AccordionContent className="pt-2 text-sm text-muted-foreground">
            {/* Example placeholder */}
            <p>Sizes filter here.</p>
          </AccordionContent>
        </AccordionItem>

        {/* Rating */}
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
