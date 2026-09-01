"use client";

import { Box, Title, Text, Button } from "@mantine/core";
import Link from "next/link";

interface HeroSectionProps {
  title: string;
  statement: string;
  href: string;
  align: "left" | "right";
  media:
    | { type: "video"; src: string; poster: string }
    | { type: "image"; src: string; alt: string };
}

export function HeroSection({
  title,
  statement,
  href,
  align,
  media,
}: HeroSectionProps) {
  const isLeft = align === "left";

  return (
    <Box
      component="section"
      pos="relative"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: isLeft ? "flex-start" : "flex-end",
        padding: "120px 48px 80px",
        overflow: "hidden",
      }}
    >
      {/* Background Media */}
      <Box
        pos="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        style={{ zIndex: 0 }}
      >
        {media.type === "video" ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={media.poster}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          >
            <source type="video/mp4" src={media.src} />
          </video>
        ) : (
          <Box
            component="img"
            src={media.src}
            alt={media.alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        )}
      </Box>

      {/* Vignette Overlay */}
      <Box
        pos="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        style={{
          zIndex: 1,
          pointerEvents: "none",
          background: isLeft
            ? `linear-gradient(to left, transparent 40%, rgba(10, 10, 10, 0.85) 70%, #0a0a0a 100%),
               linear-gradient(to bottom, transparent 80%, #0a0a0a 100%),
               linear-gradient(to top, transparent 90%, #0a0a0a 100%)`
            : `linear-gradient(to right, transparent 40%, rgba(10, 10, 10, 0.85) 70%, #0a0a0a 100%),
               linear-gradient(to bottom, transparent 80%, #0a0a0a 100%),
               linear-gradient(to top, transparent 90%, #0a0a0a 100%)`,
        }}
      />

      {/* Content */}
      <Box
        pos="relative"
        style={{
          zIndex: 2,
          maxWidth: 650,
          textAlign: align,
        }}
      >
        <Title
          order={1}
          tt="uppercase"
          fw={700}
          lh={1.1}
          mb="xl"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </Title>

        <Text
          size="lg"
          c="rgba(255, 255, 255, 0.85)"
          lh={1.8}
          mb={40}
          style={{
            fontFamily: "Calibri, 'Gill Sans', sans-serif",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
          }}
        >
          {statement}
        </Text>

        <Button
          component={Link}
          href={href}
          variant="filled"
          color="white"
          c="dark"
          size="lg"
          radius={0}
          tt="uppercase"
          fw={600}
          px={40}
          style={{
            letterSpacing: "0.1em",
            fontSize: "0.875rem",
            border: "2px solid white",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          styles={{
            root: {
              "&:hover": {
                backgroundColor: "transparent",
                color: "white",
              },
            },
          }}
        >
          Learn More
        </Button>
      </Box>
    </Box>
  );
}
