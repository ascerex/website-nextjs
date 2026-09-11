"use client";

import { Box, Title, Text, Button } from "@mantine/core";
import Link from "next/link";
import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  title: string;
  statement: string;
  href: string;
  align: "left" | "right";
  readability?: "none" | "standard" | "strong";
  media:
    | { type: "video"; src: string; poster: string }
    | { type: "image"; src: string; alt: string };
}

export function HeroSection({
  title,
  statement,
  href,
  align,
  readability = "standard",
  media,
}: HeroSectionProps) {
  return (
    <Box
      component="section"
      className={styles.section}
      data-align={align}
      data-readability={readability}
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
        className={styles.overlay}
        data-align={align}
        style={{
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <Box
        className={styles.content}
      >
        <Title
          order={1}
          className={styles.title}
        >
          {title}
        </Title>

        <Text
          className={styles.statement}
        >
          {statement}
        </Text>

        <Button
          component={Link}
          className={styles.action}
          href={href}
          variant="filled"
          color="white"
          c="dark"
          radius={0}
          style={{
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
