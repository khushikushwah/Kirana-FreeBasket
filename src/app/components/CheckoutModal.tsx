import { useState } from "react";
import { X, MapPin, Phone, CreditCard, Banknote, CheckCircle2 } from "lucide-react";
import type { CartItem } from "../App";

type Props = {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
  onPlaceOrder: () => void;
};

export function CheckoutModal({ open, onClose, cart, total, onPlaceOrder }: Props) {
  const [step, setStep] = useState<"address" | "payment">("address");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");
  const [form, setForm] = useState({ name: "Priya Sharma", phone: "9876543210", address: "B-204, Green Park Apartments, Sector 12", city: "New Delhi", pincode: "110092" });

  const deliveryFee = total > 299 ? 0 : 30;
  const grandTotal = total + deliveryFee;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative w-full md:max-w-lg max-h-[95vh] overflow-y-auto rounded-t-3xl md:rounded-3xl flex flex-col"
        style={{ background: "white" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 flex-shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
          <div>
            <h2 className="font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>Checkout</h2>
            <div className="flex items-center gap-2 mt-1">
              {(["address", "payment"] as const).map((s, idx) => (
                <div key={s} className="flex items-center gap-1.5">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: step === s || (s === "address" && step === "payment") ? "var(--primary)" : "var(--muted)", color: step === s || (s === "address" && step === "payment") ? "white" : "var(--muted-foreground)" }}
                  >
                    {idx + 1}
                  </div>
                  <span className="text-xs font-medium capitalize" style={{ color: step === s ? "var(--primary)" : "var(--muted-foreground)" }}>{s}</span>
                  {idx < 1 && <span style={{ color: "var(--border)" }}>›</span>}
                </div>
              ))}
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg">
            <X size={18} style={{ color: "var(--muted-foreground)" }} />
          </button>
        </div>

        <div className="p-5 space-y-4 flex-1">
          {step === "address" ? (
            <>
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={16} style={{ color: "var(--primary)" }} />
                <span className="font-bold text-sm" style={{ color: "var(--foreground)" }}>Delivery Address</span>
              </div>
              {[
                { key: "name", label: "Full Name", placeholder: "Your full name" },
                { key: "phone", label: "Phone Number", placeholder: "10-digit mobile number" },
                { key: "address", label: "Full Address", placeholder: "House/Flat, Street, Area" },
                { key: "city", label: "City", placeholder: "City" },
                { key: "pincode", label: "Pincode", placeholder: "6-digit pincode" },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "var(--muted-foreground)" }}>{label}</label>
                  <input
                    type="text"
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full px-3 py-2.5 rounded-xl outline-none text-sm"
                    style={{ background: "var(--input-background)", border: "1.5px solid transparent", color: "var(--foreground)" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                    onBlur={(e) => (e.target.style.borderColor = "transparent")}
                  />
                </div>
              ))}
              <button
                onClick={() => setStep("payment")}
                disabled={!form.name || !form.phone || !form.address}
                className="w-full py-3.5 rounded-xl font-bold text-sm mt-2 transition-all active:scale-95 disabled:opacity-50"
                style={{ background: "var(--primary)", color: "white" }}
              >
                Continue to Payment →
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-2">
                <CreditCard size={16} style={{ color: "var(--primary)" }} />
                <span className="font-bold text-sm" style={{ color: "var(--foreground)" }}>Payment Method</span>
              </div>

              <div className="space-y-2">
                {[
                  { value: "cod", icon: <Banknote size={18} />, label: "Cash on Delivery", sub: "Pay when your order arrives" },
                  { value: "online", icon: <CreditCard size={18} />, label: "Online Payment", sub: "UPI, Cards, Net Banking" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setPaymentMethod(opt.value as "cod" | "online")}
                    className="w-full flex items-center gap-3 p-4 rounded-2xl text-left transition-all"
                    style={{
                      border: paymentMethod === opt.value ? "2px solid var(--primary)" : "2px solid var(--border)",
                      background: paymentMethod === opt.value ? "var(--secondary)" : "white",
                    }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: paymentMethod === opt.value ? "var(--primary)" : "var(--muted)", color: paymentMethod === opt.value ? "white" : "var(--muted-foreground)" }}>
                      {opt.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm" style={{ color: "var(--foreground)" }}>{opt.label}</p>
                      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{opt.sub}</p>
                    </div>
                    {paymentMethod === opt.value && <CheckCircle2 size={20} style={{ color: "var(--primary)" }} />}
                  </button>
                ))}
              </div>

              {/* Order Summary */}
              <div className="p-4 rounded-2xl space-y-2" style={{ background: "var(--secondary)" }}>
                <p className="font-bold text-sm mb-3" style={{ color: "var(--foreground)" }}>Order Summary</p>
                {cart.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex justify-between text-xs" style={{ color: "var(--muted-foreground)" }}>
                    <span>{item.name} × {item.qty}</span>
                    <span>₹{item.price * item.qty}</span>
                  </div>
                ))}
                {cart.length > 3 && <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>+{cart.length - 3} more items</p>}
                <div className="flex justify-between text-sm font-bold pt-2" style={{ borderTop: "1px solid var(--border)", color: "var(--foreground)" }}>
                  <span>Grand Total</span>
                  <span style={{ color: "var(--primary)" }}>₹{grandTotal}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                  <MapPin size={12} />
                  <span className="truncate">{form.address}, {form.city}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep("address")} className="flex-1 py-3 rounded-xl font-bold text-sm" style={{ background: "var(--secondary)", color: "var(--foreground)" }}>
                  ← Back
                </button>
                <button
                  onClick={onPlaceOrder}
                  className="flex-1 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 hover:opacity-90"
                  style={{ background: "var(--primary)", color: "white" }}
                >
                  Place Order 🚚
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
