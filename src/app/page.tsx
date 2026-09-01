import { Box } from "@mantine/core";
import { Header, Footer, HeroSection } from "@/components";

const heroSections = [
  {
    id: "mission",
    title: "Revolutionizing Transportation",
    statement:
      "Ascerex was founded to fulfill Henry Ford's unfinished legacy by developing the vehicles and infrastructure that will make personal aviation accessible, affordable, and practical for families and individuals everywhere.",
    href: "/mission",
    align: "left" as const,
    media: {
      type: "video" as const,
      src: "/images/skyline.mp4",
      poster: "/images/skylinestatic.png",
    },
  },
  {
    id: "vehicle",
    title: "Building a New Class of Vehicle",
    statement:
      "Ascerex is pioneering a compact VTOL aircraft vehicle engineered for efficiency, reliability, and safe human transportation.",
    href: "/vehicle",
    align: "right" as const,
    media: {
      type: "image" as const,
      src: "/images/vehicle.PNG",
      alt: "VTOL Vehicle",
    },
  },
  {
    id: "skyway",
    title: "Charting the Skyway Infrastructure",
    statement:
      "By mapping a seamless Skyway network of air traffic routes over existing paths, Ascerex plans to enable dense, scalable aerial transportation for the demands of tomorrow's airspace.",
    href: "/skyway",
    align: "left" as const,
    media: {
      type: "image" as const,
      src: "/images/skyway.JPG",
      alt: "Skyway Network",
    },
  },
  {
    id: "flight-autonomy",
    title: "Delivering Autonomous Flight Systems",
    statement:
      "Ascerex vehicles will be embedded with fully autonomous flight intelligence to remove the need for human piloting, ensuring safe, reliable operations within the Skyway and opening aerial travel to everyone.",
    href: "/pilot",
    align: "right" as const,
    media: {
      type: "video" as const,
      src: "/images/autonomy.mp4",
      poster: "/images/autonomystatic.jpeg",
    },
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <Box component="main">
        {heroSections.map((section) => (
          <HeroSection
            key={section.id}
            title={section.title}
            statement={section.statement}
            href={section.href}
            align={section.align}
            media={section.media}
          />
        ))}
      </Box>
      <Footer />
    </>
  );
}
