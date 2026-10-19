import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function StorySection() {
  return (
    <section id="story" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto grid w-full max-w-container items-center gap-14 px-5 lg:grid-cols-2">
        <Reveal>
          <SectionHeader
            index="01"
            eyebrow="Our story"
            title={
              <>
                Innovating workplace <span className="text-signal-light">solutions</span>
              </>
            }
          />
          <div className="mt-6 space-y-4 text-secondary leading-relaxed">
            <p>
              Proximatech Solutions is a Philippine software startup on a mission
              to develop next-generation applications that revolutionise
              workplace productivity.
            </p>
            <p>
              Our dedicated team leverages Agile and DevOps methodologies to
              create customer-centric software tailored to the specific needs of
              every business — from RFID and asset tracking to full custom
              platforms.
            </p>
            <p>
              With over a hundred delivered projects, we pair enterprise-grade
              hardware with software our clients actually enjoy using.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -left-4 -top-4 h-24 w-24 border-l-2 border-t-2 border-signal/60"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 h-24 w-24 border-b-2 border-r-2 border-signal/60"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/gallery/gallery-vision-1.jpg"
                alt="Proximatech team collaborating in the office"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 w-40 overflow-hidden rounded-xl border border-white/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] sm:w-48">
              <div className="relative aspect-square">
                <Image
                  src="/images/gallery/team-1.jpg"
                  alt="Proximatech team member at work"
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
