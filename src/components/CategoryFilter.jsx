import { Button } from "@/components/ui/button";
import { ChefHat } from "lucide-react";
import { useState } from "react";

function CategoryFilter({ categories, onSelect }) {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    onSelect(category);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <ChefHat className="h-5 w-5 text-amber-500" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Explore Categories
        </h2>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Button
            key={category.strCategory}
            onClick={() => handleCategorySelect(category.strCategory)}
            variant={activeCategory === category.strCategory ? "default" : "outline"}
            size="sm"
            className={`rounded-full px-4 transition-all duration-200 ${
              activeCategory === category.strCategory 
                ? "shadow-md" 
                : "hover:shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            {category.strCategory}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;