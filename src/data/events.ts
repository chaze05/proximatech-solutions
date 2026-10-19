export type EventItem = {
  slug: string;
  name: string;
  dates: string;
  venue: string;
  description: string;
  image: string;
  countdownTo: string;
};

export const EVENTS: EventItem[] = [
  {
    slug: "fasava-2027",
    name: "FASAVA 2027 Congress",
    dates: "June 2027",
    venue: "Philippines — hosted by PAHA",
    description:
      "Join us for the FASAVA 2027 Congress, hosted by the Philippine Animal Hospital Association (PAHA). Three days of veterinary science, industry exhibits and hands-on workshops — with Proximatech on the floor running registration and showcasing our asset-tracking systems.",
    image: "/images/events/fasava-2027.webp",
    countdownTo: "2027-06-01T09:00:00+08:00",
  },
];
