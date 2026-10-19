import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { InfoCards } from "@/components/contact/InfoCards";
import { MapCard } from "@/components/contact/MapCard";

export const metadata: Metadata = {
  title: "Contact — Proximatech Solutions",
  description:
    "Talk to Proximatech Solutions about RFID, barcode, asset tracking, custom software or a website build. Based in Sta. Rosa City, Laguna.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build something <span className="text-signal">great</span>
          </>
        }
        lede="Questions, a project in mind, or just exploring? Our team is ready to assist — usually within one business day."
        crumb="Contact"
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto grid w-full max-w-container items-start gap-10 px-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-4">
              <InfoCards />
              <MapCard />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
