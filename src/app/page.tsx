import { PageHero } from "@/components/ui/PageHero";
import { SITE } from "@/data/site";

export default function Home() {
  return (
    <>
      <PageHero
        eyebrow="Proximatech Solutions"
        title={
          <>
            Securing Your <span className="text-signal">Future.</span>
          </>
        }
        lede={SITE.description}
        crumb="Home"
      />
      <div className="mx-auto w-full max-w-container px-5 py-24">
        <p className="text-secondary">Home page sections land next.</p>
      </div>
    </>
  );
}
