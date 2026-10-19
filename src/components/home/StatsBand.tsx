import { Stat } from "@/components/ui/Stat";

export function StatsBand() {
  return (
    <section className="border-b border-white/5 bg-panel/40">
      <div className="mx-auto grid w-full max-w-container grid-cols-2 gap-px bg-white/5 px-5 py-0 sm:px-0 lg:grid-cols-4">
        <div className="bg-night px-6 py-10 sm:px-10">
          <Stat value={100} suffix="+" label="Projects delivered" />
        </div>
        <div className="bg-night px-6 py-10 sm:px-10">
          <Stat value={50} suffix="+" label="Clients served" />
        </div>
        <div className="bg-night px-6 py-10 sm:px-10">
          <Stat value="24/7" label="Support available" />
        </div>
        <div className="bg-night px-6 py-10 sm:px-10">
          <Stat value={2} suffix=".0×" label="Productivity lift" />
        </div>
      </div>
    </section>
  );
}
