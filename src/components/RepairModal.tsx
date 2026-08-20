import { useEffect, useRef, useState } from "react";
import { CalendarClock, CheckCircle2, Loader2, Send, Smartphone, X } from "lucide-react";
import { shopConfig } from "@/config/shopConfig";
import { cn, waHref } from "@/lib/utils";
import { Button, Pill } from "@/components/ui";
import { WhatsAppGlyph } from "@/components/Header";

/**
 * Repair booking dialog.
 * The form never posts anywhere — on submit it composes a structured,
 * pre-filled WhatsApp message and opens the deep link (wa.me works on both
 * mobile and desktop). Swap `submit()` for a fetch() to your CRM endpoint if
 * the shop wants bookings captured server-side.
 */
export default function RepairModal({
  open,
  onClose,
  service,
}: {
  open: boolean;
  onClose: () => void;
  service?: string;
}) {
  const { repairs, contact, location } = shopConfig;
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const firstField = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    model: "",
    issue: service ?? "",
    date: "",
    dropOff: "walk-in",
  });

  // Reset + focus when the dialog opens / service changes
  useEffect(() => {
    if (!open) return;
    setSent(false);
    setSending(false);
    setForm((f) => ({ ...f, issue: service ?? f.issue }));
    const t = setTimeout(() => firstField.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [open, service]);

  // Escape to close + scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const valid = form.name.trim().length > 1 && form.phone.replace(/\D/g, "").length >= 8 && form.model.trim().length > 1;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setSending(true);
    const message =
      `*Repair booking — ${shopConfig.shortName}*\n` +
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Device: ${form.model}\n` +
      `Issue: ${form.issue || "To be diagnosed in store"}\n` +
      `Preferred date: ${form.date || "Walk-in today"}\n` +
      `Drop-off: ${form.dropOff === "pickup" ? "Request free pickup & drop" : "Walk-in at the store"}\n` +
      `\nSent from the website.`;
    window.open(waHref(message, contact.whatsapp), "_blank", "noopener,noreferrer");
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 600);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink-950/70 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="repair-modal-title"
        className={cn(
          "relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:max-w-lg sm:rounded-3xl",
          "animate-[fadeUp_.25s_ease-out]",
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-mist-200 p-5 sm:p-6">
          <div>
            <Pill tone="accent">
              <Smartphone className="h-3 w-3" aria-hidden="true" />
              Free diagnosis · no fix, no fee
            </Pill>
            <h2 id="repair-modal-title" className="mt-2.5 text-xl font-extrabold tracking-tight text-ink-900">
              Book a repair
            </h2>
            <p className="mt-1 text-sm text-mist-600">
              Fill this in and we'll confirm your slot on WhatsApp within 15 minutes.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-mist-500 transition hover:bg-mist-100 hover:text-ink-900"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {sent ? (
          <div className="p-6 sm:p-8">
            <div className="grid place-items-center py-6 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink-900">Booking sent on WhatsApp</h3>
              <p className="mt-2 max-w-sm text-sm text-mist-600">
                If WhatsApp didn't open, call us at {contact.phoneDisplay} or walk in —{" "}
                {location.address[1]}. We keep two walk-in slots free every hour.
              </p>
              <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
                <Button onClick={onClose} variant="outline" className="flex-1">
                  Back to site
                </Button>
                <Button as="a" href={`tel:+${contact.phoneRaw}`} className="flex-1">
                  Call the store
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4 p-5 sm:p-6">
            <Field label="Your name" required>
              <input
                ref={firstField}
                value={form.name}
                onChange={update("name")}
                required
                autoComplete="name"
                placeholder="Ananya Rao"
                className={inputCls}
              />
            </Field>

            <Field label="Phone / WhatsApp" required>
              <input
                value={form.phone}
                onChange={update("phone")}
                required
                inputMode="tel"
                autoComplete="tel"
                placeholder="+91 98450 00000"
                className={inputCls}
              />
            </Field>

            <Field label="Device model" required>
              <input
                value={form.model}
                onChange={update("model")}
                required
                placeholder="iPhone 13 / Galaxy S21 FE / Redmi Note 12"
                className={inputCls}
              />
            </Field>

            <Field label="What's the problem?">
              <select value={form.issue} onChange={update("issue")} className={inputCls}>
                <option value="">Select a service (or describe below)</option>
                {repairs.services.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name} — from ₹{s.priceFrom.toLocaleString("en-IN")} · {s.turnaround}
                  </option>
                ))}
                <option value="Not sure — needs diagnosis">Not sure — needs diagnosis</option>
              </select>
              <textarea
                value={form.issue.startsWith("Not sure") || repairs.services.some((s) => s.name === form.issue) ? "" : form.issue}
                onChange={update("issue")}
                rows={2}
                placeholder="e.g. display is black but the phone rings; dropped it yesterday."
                className={cn(inputCls, "mt-2 resize-none")}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Preferred date">
                <input
                  type="date"
                  value={form.date}
                  onChange={update("date")}
                  className={inputCls}
                  min={new Date().toISOString().slice(0, 10)}
                />
              </Field>
              <Field label="Drop-off">
                <select value={form.dropOff} onChange={update("dropOff")} className={inputCls}>
                  <option value="walk-in">Walk in to the store</option>
                  <option value="pickup">Free pickup &amp; drop</option>
                </select>
              </Field>
            </div>

            <p className="flex items-start gap-2 rounded-xl bg-mist-100 p-3 text-xs leading-relaxed text-mist-600">
              <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              We'll confirm the exact slot and an estimated cost before any work begins. Your data is never
              wiped without your explicit approval — please back up if you can.
            </p>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <Button type="submit" disabled={!valid || sending} className="min-h-12 flex-1">
                {sending ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <WhatsAppGlyph />
                )}
                {sending ? "Opening WhatsApp…" : "Send booking on WhatsApp"}
              </Button>
              <Button as="a" href={`tel:+${contact.phoneRaw}`} variant="outline" className="min-h-12 sm:w-auto">
                <Send className="h-4 w-4" aria-hidden="true" />
                Call instead
              </Button>
            </div>
          </form>
        )}
      </div>

      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-mist-300 bg-white px-3.5 py-3 text-sm text-ink-900 placeholder:text-mist-400 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]/25";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="spec-label mb-1.5 block text-mist-600">
        {label}
        {required && <span className="ml-1 text-rose-600">*</span>}
      </span>
      {children}
    </label>
  );
}
