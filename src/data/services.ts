export type Service = {
  num: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  image: string;
};

export const SERVICES: Service[] = [
  {
    num: "01",
    slug: "rfid-solutions",
    title: "RFID Solutions",
    tagline: "Total Control Over Every Asset, Every Time.",
    description:
      "Item-level RFID tracking turns stocktakes from hours into minutes. We deploy readers, tags and dashboards so you always know exactly what you own and where it is.",
    bullets: [
      "Bulk reading without line-of-sight",
      "Real-time asset location tracking",
      "Audit-ready movement history",
    ],
    image: "/images/services/rfid-solutions.avif",
  },
  {
    num: "02",
    slug: "barcode-solutions",
    title: "Barcode Solutions",
    tagline: "Scan, Track, and Move Faster.",
    description:
      "From label design to handheld scanners and integration with your existing systems, we build barcode workflows that remove manual encoding and human error.",
    bullets: [
      "Hardware, labels and software in one package",
      "Integration with ERP and POS systems",
      "On-site rollout and staff training",
    ],
    image: "/images/services/barcode-solutions.avif",
  },
  {
    num: "03",
    slug: "customized-apps",
    title: "Customized Apps",
    tagline: "Built for You. Designed to Fit.",
    description:
      "Off-the-shelf software rarely matches how your team actually works. We design and build web and mobile apps around your exact processes.",
    bullets: [
      "Discovery, UX and clickable prototypes",
      "Web, mobile and offline-first builds",
      "Ongoing support and iteration",
    ],
    image: "/images/services/customized-apps.avif",
  },
  {
    num: "04",
    slug: "event-registration-system",
    title: "Event Registration System",
    tagline: "Your Gateway to Easy Registration.",
    description:
      "Self-service registration, QR check-in and live attendance dashboards. We run the full stack for conferences, congresses and corporate events.",
    bullets: [
      "Online registration and payment-ready forms",
      "QR badges with fast on-site scanning",
      "Live attendance and reporting",
    ],
    image: "/images/services/event-registration-system.avif",
  },
  {
    num: "05",
    slug: "warehouse-management-system",
    title: "Warehouse Management System",
    tagline: "Total Control, From Dock to Door.",
    description:
      "Receive, put away, pick, pack and ship with guided workflows. Bin-level accuracy and live visibility across every location you operate.",
    bullets: [
      "Guided receiving and put-away",
      "Barcode-driven picking and packing",
      "Live stock visibility across sites",
    ],
    image: "/images/services/warehouse-management-system.avif",
  },
  {
    num: "06",
    slug: "fixed-asset-management-system",
    title: "Fixed Asset Management System",
    tagline: "Every Asset Accounted For.",
    description:
      "Tag, track and audit fixed assets across branches. Depreciation-ready records, assignment history and mobile audit scans keep finance and operations aligned.",
    bullets: [
      "RFID and barcode asset tagging",
      "Custodian and transfer tracking",
      "Mobile audit scans in hours, not weeks",
    ],
    image: "/images/services/fixed-asset-management-system.avif",
  },
  {
    num: "07",
    slug: "structured-cabling",
    title: "Structured Cabling",
    tagline: "Reliable Networks Start With the Right Foundation.",
    description:
      "Certified cabling design and installation for offices, warehouses and data rooms — documented, labelled and built to standard.",
    bullets: [
      "Design and site survey",
      "Certified installation and testing",
      "As-built documentation and labelling",
    ],
    image: "/images/services/structured-cabling.avif",
  },
  {
    num: "08",
    slug: "website-development",
    title: "Website Development",
    tagline: "Modern, Responsive, Built to Convert.",
    description:
      "Corporate sites and web apps designed around your brand — fast, responsive and ready for SEO from the first deploy.",
    bullets: [
      "Design systems and responsive builds",
      "CMS-ready content workflows",
      "Performance and SEO built in",
    ],
    image: "/images/services/website-development.png",
  },
];
