import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  {
    num: "01",
    title: "Consult",
    text: "We map your operations, pain points and targets on site.",
  },
  {
    num: "02",
    title: "Design",
    text: "Hardware, software and rollout plan — scoped with a fixed quote.",
  },
  {
    num: "03",
    title: "Build",
    text: "Configuration, integration and testing against real data.",
  },
  {
    num: "04",
    title: "Deploy",
    text: "On-site installation, tagging and staff training.",
  },
  {
    num: "05",
    title: "Support",
    text: "Monitoring, maintenance and 24/7 support after go-live.",
  },
];

export function ProcessBand() {
  return (
    <section className="border-y border-white/5 bg-panel/30 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-container px-5">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="One-stop shop"
            title={
              <>
                From first call to <span className="text-signal">go-live</span>
              </>
            }
            lede="Contract & documentation, proofing & printing, installation, monitoring, maintenance and dismantling — handled by one team."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <Reveal key={step.num} delay={index * 70}>
              <div className="relative h-full rounded-2xl border border-white/10 bg-night p-6">
                <span className="font-display text-3xl text-signal/70">
                  {step.num}
                </span>
                <h3 className="mt-4 font-display text-base uppercase tracking-wide">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  {step.text}
                </p>
                {index < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-signal/40 lg:block"
                  >
                    →
                  </span>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
