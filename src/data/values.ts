export type ValueIcon =
  | "spark"
  | "scale"
  | "user"
  | "bolt"
  | "puzzle"
  | "chip";

export type ValueCard = {
  title: string;
  blurb: string;
  icon: ValueIcon;
};

export const VALUE_CARDS: ValueCard[] = [
  {
    title: "Innovative",
    blurb:
      "We push boundaries by embracing emerging technologies and turning bold ideas into practical, high-impact solutions.",
    icon: "spark",
  },
  {
    title: "Scalable",
    blurb:
      "Our systems are engineered for growth — built to handle increasing demand while staying stable and sustainable.",
    icon: "scale",
  },
  {
    title: "User-Centric",
    blurb:
      "We design with people in mind. Every feature and workflow is crafted for clarity, simplicity and a seamless experience.",
    icon: "user",
  },
  {
    title: "Efficient",
    blurb:
      "Optimised for speed and precision, our processes minimise friction and maximise productivity at every step.",
    icon: "bolt",
  },
  {
    title: "Tailored",
    blurb:
      "Your needs are unique, so are our solutions. Every system is customised to fit your goals, workflows and brand.",
    icon: "puzzle",
  },
  {
    title: "Cutting-Edge",
    blurb:
      "Using the latest technologies and best practices, we build modern, future-ready platforms that keep you ahead.",
    icon: "chip",
  },
];
