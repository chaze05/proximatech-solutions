export type GalleryCategory = "Team" | "Vision" | "Events";

export type GalleryImage = {
  src: string;
  alt: string;
  category: GalleryCategory;
};

export const GALLERY: GalleryImage[] = [
  {
    src: "/images/gallery/gallery-vision-1.jpg",
    alt: "Proximatech team collaborating in the office",
    category: "Vision",
  },
  {
    src: "/images/gallery/gallery-vision-2.avif",
    alt: "Workspace planning and design session",
    category: "Vision",
  },
  {
    src: "/images/gallery/gallery-vision-3.avif",
    alt: "Engineering team reviewing a build",
    category: "Vision",
  },
  {
    src: "/images/gallery/gallery-values.avif",
    alt: "Proximatech team celebrating a product launch",
    category: "Vision",
  },
  {
    src: "/images/gallery/team-1.jpg",
    alt: "Proximatech team hosting a registration event",
    category: "Team",
  },
  {
    src: "/images/gallery/team-2.jpg",
    alt: "Proximatech team hosting a registration event",
    category: "Team",
  },
  {
    src: "/images/gallery/team-3.jpg",
    alt: "Proximatech team hosting a registration event",
    category: "Team",
  },
  {
    src: "/images/gallery/team-4.jpg",
    alt: "Proximatech team hosting a registration event",
    category: "Team",
  },
  {
    src: "/images/gallery/team-5.jpg",
    alt: "Proximatech team hosting a registration event",
    category: "Team",
  },
  {
    src: "/images/gallery/team-6.jpg",
    alt: "Proximatech team hosting a registration event",
    category: "Team",
  },
  {
    src: "/images/events/fasava-2027.webp",
    alt: "FASAVA 2027 Congress announcement",
    category: "Events",
  },
];
