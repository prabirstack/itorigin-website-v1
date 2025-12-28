"use client";

interface BlogCategoryFilterProps {
  categories: readonly string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function BlogCategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange
}: BlogCategoryFilterProps) {
  return (
    <div className="border-b border-border pb-6">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
              selectedCategory === category
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-accent hover:bg-accent/80 text-foreground"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
