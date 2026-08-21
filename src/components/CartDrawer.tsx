import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Lock,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "@/lib/cart";

type CheckoutStep = "cart" | "checkout" | "processing" | "success";

export function CartDrawer() {
  const { lines, open, setOpen, setQty, remove, total } = useCart();

  const [step, setStep] = useState<CheckoutStep>("cart");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const shipping = total > 0 && total < 100 ? 9 : 0;
  const grandTotal = total + shipping;

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const handleClose = () => {
    setOpen(false);

    // Reset checkout when drawer is closed
    setTimeout(() => {
      setStep("cart");
    }, 300);
  };

  const handleCheckout = () => {
    if (lines.length === 0) return;
    setStep("checkout");
  };

  const handlePayment = () => {
    setStep("processing");

    // Fake/demo payment processing
    setTimeout(() => {
      setStep("success");
    }, 1800);
  };

  const orderId = `NOVA-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-card"
            aria-label="Shopping cart"
          >
            {/* ================= CART ================= */}
            {step === "cart" && (
              <>
                <div className="flex items-center gap-2 border-b border-border p-5">
                  <ShoppingBag className="h-5 w-5 text-accent" />

                  <h2 className="text-base font-semibold">Your Cart</h2>

                  <button
                    onClick={handleClose}
                    aria-label="Close cart"
                    className="ml-auto grid h-9 w-9 place-items-center rounded-full border border-border transition-colors hover:bg-surface"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto p-5">
                  {lines.length === 0 && (
                    <p className="pt-10 text-center text-sm text-muted-foreground">
                      Your cart is empty — let the AI assistant find something
                      for you.
                    </p>
                  )}

                  {lines.map((line) => (
                    <div
                      key={line.product.id}
                      className="flex gap-3 rounded-xl border border-border bg-surface p-3"
                    >
                      <img
                        src={line.product.image}
                        alt={line.product.name}
                        loading="lazy"
                        width={768}
                        height={768}
                        className="h-16 w-16 rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {line.product.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          ${line.product.price}
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                          <button
                            aria-label="Decrease quantity"
                            onClick={() =>
                              setQty(line.product.id, line.qty - 1)
                            }
                            className="grid h-7 w-7 place-items-center rounded-md border border-border"
                          >
                            <Minus className="h-3 w-3" />
                          </button>

                          <span className="w-6 text-center text-sm">
                            {line.qty}
                          </span>

                          <button
                            aria-label="Increase quantity"
                            onClick={() =>
                              setQty(line.product.id, line.qty + 1)
                            }
                            className="grid h-7 w-7 place-items-center rounded-md border border-border"
                          >
                            <Plus className="h-3 w-3" />
                          </button>

                          <button
                            aria-label="Remove item"
                            onClick={() => remove(line.product.id)}
                            className="ml-auto text-muted-foreground transition-colors hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <span className="text-sm font-semibold">
                        ${line.qty * line.product.price}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-border p-5">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${total}</span>
                  </div>

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Shipping</span>
                    <span>{shipping ? `$${shipping}` : "Free"}</span>
                  </div>

                  <div className="flex justify-between text-base font-semibold">
                    <span>Total</span>
                    <span>${grandTotal}</span>
                  </div>

                  <button
                    disabled={lines.length === 0}
                    onClick={handleCheckout}
                    className="glow-ring w-full rounded-full py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-40"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    Checkout Preview
                  </button>
                </div>
              </>
            )}

            {/* ================= CHECKOUT ================= */}
            {step === "checkout" && (
              <>
                <div className="flex items-center gap-3 border-b border-border p-5">
                  <button
                    onClick={() => setStep("cart")}
                    className="grid h-9 w-9 place-items-center rounded-full border border-border transition-colors hover:bg-surface"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>

                  <div>
                    <h2 className="text-base font-semibold">Checkout</h2>
                    <p className="text-xs text-muted-foreground">
                      Secure demo checkout
                    </p>
                  </div>

                  <button
                    onClick={handleClose}
                    className="ml-auto grid h-9 w-9 place-items-center rounded-full border border-border"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex-1 space-y-6 overflow-y-auto p-5">
                  {/* Contact */}
                  <section>
                    <h3 className="mb-3 text-sm font-semibold">
                      Contact Information
                    </h3>

                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Full name"
                        value={customer.name}
                        onChange={(e) =>
                          setCustomer({
                            ...customer,
                            name: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-accent"
                      />

                      <input
                        type="email"
                        placeholder="Email address"
                        value={customer.email}
                        onChange={(e) =>
                          setCustomer({
                            ...customer,
                            email: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-accent"
                      />
                    </div>
                  </section>

                  {/* Shipping */}
                  <section>
                    <h3 className="mb-3 text-sm font-semibold">
                      Shipping Information
                    </h3>

                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Address"
                        value={customer.address}
                        onChange={(e) =>
                          setCustomer({
                            ...customer,
                            address: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-accent"
                      />

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="City"
                          value={customer.city}
                          onChange={(e) =>
                            setCustomer({
                              ...customer,
                              city: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-accent"
                        />

                        <input
                          type="text"
                          placeholder="ZIP code"
                          value={customer.zip}
                          onChange={(e) =>
                            setCustomer({
                              ...customer,
                              zip: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-accent"
                        />
                      </div>
                    </div>
                  </section>

                  {/* Order Summary */}
                  <section>
                    <h3 className="mb-3 text-sm font-semibold">
                      Order Summary
                    </h3>

                    <div className="space-y-3 rounded-xl border border-border bg-surface p-4">
                      {lines.map((line) => (
                        <div
                          key={line.product.id}
                          className="flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={line.product.image}
                              alt={line.product.name}
                              className="h-11 w-11 rounded-lg object-cover"
                            />

                            <div>
                              <p className="text-sm font-medium">
                                {line.product.name}
                              </p>

                              <p className="text-xs text-muted-foreground">
                                Qty: {line.qty}
                              </p>
                            </div>
                          </div>

                          <span className="text-sm font-semibold">
                            ${line.qty * line.product.price}
                          </span>
                        </div>
                      ))}

                      <div className="my-2 border-t border-border" />

                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Subtotal</span>
                        <span>${total}</span>
                      </div>

                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Shipping</span>
                        <span>{shipping ? `$${shipping}` : "Free"}</span>
                      </div>

                      <div className="flex justify-between pt-1 font-semibold">
                        <span>Total</span>
                        <span>${grandTotal}</span>
                      </div>
                    </div>
                  </section>

                  {/* Payment */}
                  <section>
                    <h3 className="mb-3 text-sm font-semibold">
                      Demo Payment
                    </h3>

                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition ${
                        paymentMethod === "card"
                          ? "border-accent bg-accent/10"
                          : "border-border bg-surface"
                      }`}
                    >
                      <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10">
                        <CreditCard className="h-5 w-5 text-accent" />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-medium">Demo Card</p>
                        <p className="text-xs text-muted-foreground">
                          No real payment will be processed
                        </p>
                      </div>

                      <div className="h-4 w-4 rounded-full border-2 border-accent p-[2px]">
                        <div className="h-full w-full rounded-full bg-accent" />
                      </div>
                    </button>
                  </section>

                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Lock className="h-3.5 w-3.5" />
                    Secure demo checkout
                  </div>
                </div>

                <div className="border-t border-border p-5">
                  <button
                    onClick={handlePayment}
                    disabled={
                      !customer.name ||
                      !customer.email ||
                      !customer.address ||
                      !customer.city ||
                      !customer.zip
                    }
                    className="w-full rounded-full py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    Pay ${grandTotal}
                  </button>
                </div>
              </>
            )}

            {/* ================= PROCESSING ================= */}
            {step === "processing" && (
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear",
                  }}
                  className="mb-6 h-14 w-14 rounded-full border-4 border-border border-t-accent"
                />

                <h2 className="text-lg font-semibold">
                  Processing Demo Payment
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Please wait while we securely process your demo order.
                </p>
              </div>
            )}

            {/* ================= SUCCESS ================= */}
            {step === "success" && (
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="mb-6 grid h-20 w-20 place-items-center rounded-full bg-green-500/10"
                >
                  <CheckCircle2 className="h-10 w-10 text-green-500" />
                </motion.div>

                <h2 className="text-2xl font-bold">
                  Payment Successful!
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Your demo order has been placed successfully.
                </p>

                <div className="mt-6 w-full rounded-2xl border border-border bg-surface p-5">
                  <p className="text-xs text-muted-foreground">
                    ORDER ID
                  </p>

                  <p className="mt-1 font-mono text-sm font-semibold">
                    {orderId}
                  </p>

                  <div className="my-4 border-t border-border" />

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Amount Paid
                    </span>

                    <span className="font-semibold">
                      ${grandTotal}
                    </span>
                  </div>

                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Payment
                    </span>

                    <span className="font-semibold text-green-500">
                      Demo Payment
                    </span>
                  </div>
                </div>

                <p className="mt-5 text-xs text-muted-foreground">
                  This is a portfolio/demo checkout. No real payment was
                  processed.
                </p>

                <button
                  onClick={handleClose}
                  className="mt-6 w-full rounded-full py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01]"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  Back to Shop
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}