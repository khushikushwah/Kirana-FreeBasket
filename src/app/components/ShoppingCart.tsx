import { X, Minus, Plus, Trash2, ShoppingBasket } from "lucide-react";
import type { CartItem } from "../App";

type Props = {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  onInc: (id: number) => void;
  onDec: (id: number) => void;
  onRemove: (id: number) => void;
  total: number;
  onCheckout: () => void;
};

export function ShoppingCart({ open, onClose, cart, onInc, onDec, onRemove, total, onCheckout }: Props) {
  const deliveryFee = total > 299 ? 0 : 30;
  const grandTotal = total + deliveryFee;

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      )}
      <aside
        className="fixed top-0 right-0 h-full z-50 flex flex-col transition-transform duration-300"
        style={{
          width: "min(420px, 100vw)",
          background: "white",
          transform: open ? "translateX(0)" : "translateX(100%)",
          boxShadow: open ? "-4px 0 32px rgba(0,0,0,0.12)" : "none",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 flex-shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2">
            <ShoppingBasket size={20} style={{ color: "var(--primary)" }} />
            <span className="font-bold" style={{ color: "var(--foreground)", fontFamily: "'Playfair Display', serif" }}>
              My Cart {cart.length > 0 && <span className="text-sm font-normal" style={{ color: "var(--muted-foreground)" }}>({cart.reduce((s, i) => s + i.qty, 0)} items)</span>}
            </span>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted">
            <X size={18} style={{ color: "var(--muted-foreground)" }} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-16">
              <span className="text-6xl">🛒</span>
              <p className="font-semibold" style={{ color: "var(--foreground)" }}>Your cart is empty</p>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Add fresh vegetables, fruits and more!</p>
              <button onClick={onClose} className="px-5 py-2 rounded-xl font-bold text-sm" style={{ background: "var(--primary)", color: "white" }}>
                Browse Products
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: "var(--muted)" }}>
                <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate" style={{ color: "var(--foreground)" }}>{item.name}</p>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{item.unit}</p>
                  <p className="font-extrabold text-sm mt-0.5" style={{ color: "var(--primary)" }}>₹{item.price * item.qty}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button onClick={() => onRemove(item.id)} className="p-1 rounded-lg hover:bg-red-50">
                    <Trash2 size={14} style={{ color: "#d4183d" }} />
                  </button>
                  <div className="flex items-center gap-1 rounded-xl overflow-hidden" style={{ border: "1.5px solid var(--primary)" }}>
                    <button onClick={() => onDec(item.id)} className="w-7 h-7 flex items-center justify-center" style={{ color: "var(--primary)" }}>
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center text-sm font-bold" style={{ color: "var(--primary)" }}>{item.qty}</span>
                    <button onClick={() => onInc(item.id)} className="w-7 h-7 flex items-center justify-center" style={{ color: "var(--primary)" }}>
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        {cart.length > 0 && (
          <div className="p-4 flex-shrink-0" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm" style={{ color: "var(--muted-foreground)" }}>
                <span>Subtotal</span>
                <span className="font-semibold" style={{ color: "var(--foreground)" }}>₹{total}</span>
              </div>
              <div className="flex justify-between text-sm" style={{ color: "var(--muted-foreground)" }}>
                <span>Delivery fee</span>
                {deliveryFee === 0 ? (
                  <span className="font-semibold" style={{ color: "var(--primary)" }}>FREE</span>
                ) : (
                  <span className="font-semibold" style={{ color: "var(--foreground)" }}>₹{deliveryFee}</span>
                )}
              </div>
              {deliveryFee > 0 && (
                <p className="text-xs px-2 py-1.5 rounded-lg" style={{ background: "var(--secondary)", color: "var(--primary)" }}>
                  Add ₹{299 - total} more to get FREE delivery!
                </p>
              )}
              <div className="flex justify-between font-bold pt-2" style={{ borderTop: "1px solid var(--border)", color: "var(--foreground)" }}>
                <span>Total</span>
                <span style={{ color: "var(--primary)" }}>₹{grandTotal}</span>
              </div>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 hover:opacity-90"
              style={{ background: "var(--primary)", color: "white" }}
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
