type Props = { onShopNow: () => void };

export function HeroBanner({ onShopNow }: Props) {
  return (
    <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a5c1a 0%, #2d7a2d 50%, #4a9e4a 100%)", minHeight: "280px" }}>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&h=400&fit=crop&auto=format)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 py-10 md:py-14 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-white text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "rgba(255,255,255,0.15)", color: "white" }}>
            🚚 Free delivery on orders above ₹299
          </div>
          <h1 className="font-bold leading-tight mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: "white" }}>
            Fresh Groceries<br />Delivered to Your Door
          </h1>
          <p className="text-sm md:text-base mb-6 max-w-md" style={{ color: "rgba(255,255,255,0.85)" }}>
            Shop vegetables, fruits, dry fruits & more from your local area shops. Get it delivered in 30–60 minutes!
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <button
              onClick={onShopNow}
              className="px-6 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 hover:opacity-90"
              style={{ background: "white", color: "var(--primary)" }}
            >
              Shop Now →
            </button>
            <button className="px-6 py-3 rounded-xl font-bold text-sm border-2 border-white text-white hover:bg-white hover:text-green-700 transition-all">
              View Offers
            </button>
          </div>
          <div className="flex items-center gap-6 mt-6 justify-center md:justify-start">
            {[["10K+", "Happy Customers"], ["200+", "Products"], ["4.8★", "Rating"]].map(([val, label]) => (
              <div key={label} className="text-center">
                <p className="font-extrabold text-lg" style={{ color: "white" }}>{val}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:grid grid-cols-2 gap-3 flex-shrink-0">
          {[
            { emoji: "🥦", label: "Vegetables", count: "45+ items" },
            { emoji: "🍎", label: "Fruits", count: "30+ items" },
            { emoji: "🥜", label: "Dry Fruits", count: "20+ items" },
            { emoji: "🌾", label: "Grains", count: "25+ items" },
          ].map((cat) => (
            <div
              key={cat.label}
              className="flex flex-col items-center justify-center w-28 h-24 rounded-2xl cursor-pointer hover:scale-105 transition-transform"
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
              onClick={onShopNow}
            >
              <span className="text-3xl mb-1">{cat.emoji}</span>
              <p className="text-xs font-bold text-white">{cat.label}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{cat.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
