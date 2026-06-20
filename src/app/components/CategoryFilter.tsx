type Props = {
  categories: string[];
  selected: string;
  onSelect: (cat: string) => void;
};

const CATEGORY_ICONS: Record<string, string> = {
  "All":              "🛒",
  "Vegetables":       "🥦",
  "Fruits":           "🍎",
  "Dry Fruits":       "🥜",
  "Dairy & Eggs":     "🥛",
  "Grains & Pulses":  "🌾",
  "Herbs & Spices":   "🌿",
  "Snacks & Namkeen": "🍿",
  "Oils & Ghee":      "🫙",
};

export function CategoryFilter({ categories, selected, onSelect }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
      {categories.map((cat) => {
        const isSelected = cat === selected;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all active:scale-95"
            style={{
              background: isSelected ? "var(--primary)" : "var(--secondary)",
              color: isSelected ? "white" : "var(--foreground)",
              border: isSelected ? "none" : "1px solid var(--border)",
            }}
          >
            <span>{CATEGORY_ICONS[cat] ?? "🛍️"}</span>
            <span>{cat}</span>
          </button>
        );
      })}
    </div>
  );
}
