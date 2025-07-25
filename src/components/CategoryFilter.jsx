import { Button } from "@/components/ui/button";

function CategoryFilter({ categories, onSelect }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Browse by Category</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.strCategory}
            onClick={() => onSelect(category.strCategory)}
            variant="outline"
            size="sm"
          >
            {category.strCategory}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
