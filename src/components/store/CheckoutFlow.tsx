"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getStoreProduct } from "@/data/store";
import { formatPeso } from "@/lib/format";
import {
  validateCheckoutContact,
  validatePayment,
  validateShipping,
  type CheckoutContactInput,
  type PaymentInput,
  type ShippingInput,
} from "@/lib/validation";
import { Field } from "@/components/ui/Field";
import { useCart } from "./CartProvider";
import { Steps } from "./Steps";
import { DemoNotice } from "./DemoNotice";

type OrderItem = { name: string; qty: number; price: number };
type Order = { id: string; items: OrderItem[]; total: number };

export function CheckoutFlow() {
  const { lines, subtotal, clear } = useCart();
  const [step, setStep] = useState(0);
  const [contact, setContact] = useState<CheckoutContactInput>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [shipping, setShipping] = useState<ShippingInput>({
    address: "",
    city: "",
    province: "",
    postalCode: "",
  });
  const [payment, setPayment] = useState<PaymentInput>({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  if (order) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-panel/60 p-8 text-center sm:p-12">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m5 12 5 5L20 7" />
          </svg>
        </span>
        <h2 className="mt-6 font-display text-2xl uppercase tracking-wide">
          Order confirmed.
        </h2>
        <p className="mt-2 text-sm text-secondary">
          Your demo order{" "}
          <span className="font-display text-ink">{order.id}</span> has been
          placed.
        </p>

        <ul className="mt-6 space-y-2 border-t border-white/10 pt-5 text-left text-sm">
          {order.items.map((item) => (
            <li key={item.name} className="flex justify-between gap-4">
              <span className="text-secondary">
                {item.name} × {item.qty}
              </span>
              <span className="text-ink">{formatPeso(item.price * item.qty)}</span>
            </li>
          ))}
          <li className="flex justify-between gap-4 border-t border-white/10 pt-3 font-bold">
            <span>Total</span>
            <span>{formatPeso(order.total)}</span>
          </li>
        </ul>

        <div className="mt-6">
          <DemoNotice />
        </div>

        <Link
          href="/store"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-signal px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-signal-hover"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-panel/60 p-8 text-center sm:p-12">
        <p className="font-display text-2xl uppercase tracking-wide">
          Your cart is empty.
        </p>
        <p className="mt-2 text-sm text-secondary">
          Add something from the store before checking out.
        </p>
        <Link
          href="/store"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-signal px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-signal-hover"
        >
          Browse products
        </Link>
      </div>
    );
  }

  const validateStep = (): boolean => {
    const result =
      step === 0
        ? validateCheckoutContact(contact)
        : step === 1
          ? validateShipping(shipping)
          : step === 2
            ? validatePayment(payment)
            : {};
    setErrors(result as Record<string, string>);
    return Object.keys(result).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    setStep((current) => Math.min(current + 1, 3));
  };

  const back = () => setStep((current) => Math.max(current - 1, 0));

  const placeOrder = () => {
    setPlacing(true);
    window.setTimeout(() => {
      const items: OrderItem[] = lines
        .map((line) => {
          const product = getStoreProduct(line.slug);
          return product
            ? { name: product.name, qty: line.qty, price: product.price }
            : null;
        })
        .filter((item): item is OrderItem => item !== null);
      const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

      setOrder({
        id: `PX-${Date.now().toString(36).toUpperCase()}`,
        items,
        total,
      });
      clear();
      setPlacing(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 900);
  };

  const maskedCard = `•••• ${payment.cardNumber.replace(/\s/g, "").slice(-4)}`;

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
      <div>
        <Steps current={step} />

        <div className="mt-6">
          <DemoNotice />
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-panel/60 p-6 sm:p-8">
          {step === 0 ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="First name"
                name="firstName"
                value={contact.firstName}
                onChange={(value) => setContact({ ...contact, firstName: value })}
                error={errors.firstName}
                autoComplete="given-name"
                required
              />
              <Field
                label="Last name"
                name="lastName"
                value={contact.lastName}
                onChange={(value) => setContact({ ...contact, lastName: value })}
                error={errors.lastName}
                autoComplete="family-name"
                required
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={contact.email}
                onChange={(value) => setContact({ ...contact, email: value })}
                error={errors.email}
                autoComplete="email"
                required
              />
              <Field
                label="Phone"
                name="phone"
                type="tel"
                value={contact.phone}
                onChange={(value) => setContact({ ...contact, phone: value })}
                error={errors.phone}
                autoComplete="tel"
                required
              />
            </div>
          ) : null}

          {step === 1 ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field
                  label="Address"
                  name="address"
                  value={shipping.address}
                  onChange={(value) => setShipping({ ...shipping, address: value })}
                  error={errors.address}
                  autoComplete="street-address"
                  required
                />
              </div>
              <Field
                label="City"
                name="city"
                value={shipping.city}
                onChange={(value) => setShipping({ ...shipping, city: value })}
                error={errors.city}
                autoComplete="address-level2"
                required
              />
              <Field
                label="Province"
                name="province"
                value={shipping.province}
                onChange={(value) => setShipping({ ...shipping, province: value })}
                error={errors.province}
                autoComplete="address-level1"
                required
              />
              <Field
                label="Postal code"
                name="postalCode"
                value={shipping.postalCode}
                onChange={(value) => setShipping({ ...shipping, postalCode: value })}
                error={errors.postalCode}
                autoComplete="postal-code"
                required
              />
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field
                  label="Name on card"
                  name="cardName"
                  value={payment.cardName}
                  onChange={(value) => setPayment({ ...payment, cardName: value })}
                  error={errors.cardName}
                  autoComplete="cc-name"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <Field
                  label="Card number"
                  name="cardNumber"
                  value={payment.cardNumber}
                  onChange={(value) => setPayment({ ...payment, cardNumber: value })}
                  error={errors.cardNumber}
                  placeholder="4111 1111 1111 1111"
                  autoComplete="cc-number"
                  required
                />
              </div>
              <Field
                label="Expiry (MM/YY)"
                name="expiry"
                value={payment.expiry}
                onChange={(value) => setPayment({ ...payment, expiry: value })}
                error={errors.expiry}
                placeholder="09/29"
                autoComplete="cc-exp"
                required
              />
              <Field
                label="CVC"
                name="cvc"
                value={payment.cvc}
                onChange={(value) => setPayment({ ...payment, cvc: value })}
                error={errors.cvc}
                placeholder="123"
                autoComplete="cc-csc"
                required
              />
              <p className="text-xs text-muted sm:col-span-2">
                Card details are validated for format only and never stored or
                charged.
              </p>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                  Contact
                </p>
                <p className="mt-1 text-sm text-secondary">
                  {contact.firstName} {contact.lastName} · {contact.email} ·{" "}
                  {contact.phone}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                  Shipping
                </p>
                <p className="mt-1 text-sm text-secondary">
                  {shipping.address}, {shipping.city}, {shipping.province}{" "}
                  {shipping.postalCode}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                  Payment
                </p>
                <p className="mt-1 text-sm text-secondary">
                  {payment.cardName} · {maskedCard}
                </p>
              </div>
              <button
                type="button"
                onClick={placeOrder}
                disabled={placing}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-signal px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-signal-hover disabled:opacity-60"
              >
                {placing ? "Placing demo order…" : "Place demo order"}
              </button>
            </div>
          ) : null}

          {step < 3 ? (
            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className="min-h-11 rounded-full border border-white/15 px-6 py-2.5 text-sm font-bold text-ink transition-colors hover:border-signal/60 disabled:opacity-40"
              >
                Back
              </button>
              <button
                type="button"
                onClick={next}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-signal px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-signal-hover"
              >
                Continue
              </button>
            </div>
          ) : (
            <div className="mt-8">
              <button
                type="button"
                onClick={back}
                className="min-h-11 rounded-full border border-white/15 px-6 py-2.5 text-sm font-bold text-ink transition-colors hover:border-signal/60"
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>

      <aside className="rounded-2xl border border-white/10 bg-panel/60 p-6">
        <p className="font-display text-sm uppercase tracking-[0.16em] text-secondary">
          Order summary
        </p>
        <ul className="mt-5 space-y-4">
          {lines.map((line) => {
            const product = getStoreProduct(line.slug);
            if (!product) return null;
            return (
              <li key={line.slug} className="flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-elevated">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="56px"
                    className="object-contain p-1.5"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{product.name}</p>
                  <p className="text-xs text-muted">
                    {formatPeso(product.price)} × {line.qty}
                  </p>
                </div>
                <span className="text-sm">
                  {formatPeso(product.price * line.qty)}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-sm text-secondary">Subtotal</span>
          <span className="font-display text-xl">{formatPeso(subtotal)}</span>
        </div>
      </aside>
    </div>
  );
}
