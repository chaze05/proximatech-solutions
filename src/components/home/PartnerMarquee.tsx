import { Marquee } from "@/components/ui/Marquee";

const partners = ["Acer", "Zebra", "Epson", "Honeywell", "Ubiquiti", "HID"];

export function PartnerMarquee() {
  return (
    <section className="border-b border-white/5 py-8">
      <div className="mx-auto w-full max-w-container px-5">
        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
          Technology partners
        </p>
        <Marquee speed={30}>
          {partners.map((partner) => (
            <span
              key={partner}
              className="font-display text-xl uppercase tracking-[0.18em] text-white/25 transition-colors hover:text-white/60"
            >
              {partner}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
