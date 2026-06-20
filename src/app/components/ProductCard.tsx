import { Plus, Minus, Store } from "lucide-react";
import type { Product } from "../App";

type Props = {
  product: Product;
  cartQty: number;
  onAdd: () => void;
  onInc: () => void;
  onDec: () => void;
};

export function ProductCard({ product, cartQty, onAdd, onInc, onDec }: Props) {
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col transition-all hover:shadow-lg hover:-translate-y-0.5 duration-200"
      style={{ background: "white", border: "1px solid var(--border)" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: "140px", background: "var(--muted)" }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        {product.badge && (
          <span
            className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold"
            style={{ background: "var(--primary)", color: "white" }}
          >
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.45)" }}>
            <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: "rgba(0,0,0,0.6)" }}>
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1 gap-1">
        <p className="font-bold text-sm leading-tight line-clamp-2" style={{ color: "var(--foreground)" }}>
          {product.name}
        </p>

        {/* Shop name */}
        <div className="flex items-center gap-1 mt-0.5">
          <Store size={10} style={{ color: "var(--primary)", flexShrink: 0 }} />
          <span className="text-xs font-semibold truncate" style={{ color: "var(--primary)" }}>
            {product.shop}
          </span>
        </div>

        <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{product.unit}</p>

        {/* Price + Add */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="font-extrabold" style={{ color: "var(--foreground)" }}>
            ₹<span style={{ color: "var(--primary)" }}>{product.price}</span>
          </span>

          {product.inStock ? (
            cartQty === 0 ? (
              <button
                onClick={onAdd}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 hover:opacity-90"
                style={{ background: "var(--primary)", color: "white" }}
              >
                <Plus size={12} />
                Add
              </button>
            ) : (
              <div
                className="flex items-center gap-1 rounded-xl overflow-hidden"
                style={{ border: "1.5px solid var(--primary)" }}
              >
                <button
                  onClick={onDec}
                  className="w-7 h-7 flex items-center justify-center font-bold transition-colors"
                  style={{ color: "var(--primary)" }}
                >
                  <Minus size={13} />
                </button>
                <span className="w-6 text-center text-sm font-bold" style={{ color: "var(--primary)" }}>
                  {cartQty}
                </span>
                <button
                  onClick={onInc}
                  className="w-7 h-7 flex items-center justify-center font-bold transition-colors"
                  style={{ color: "var(--primary)" }}
                >
                  <Plus size={13} />
                </button>
              </div>
            )
          ) : (
            <button
              disabled
              className="px-3 py-1.5 rounded-xl text-xs font-bold opacity-50"
              style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
            >
              Notify
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
