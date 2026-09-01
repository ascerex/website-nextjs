"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Group,
  Burger,
  Collapse,
  Anchor,
  Image,
  Text,
} from "@mantine/core";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import Link from "next/link";

const navLinks = [
  { label: "Mission", href: "/mission" },
  { label: "Vehicle", href: "/vehicle" },
  { label: "Skyway", href: "/skyway" },
  { label: "Flight Autonomy", href: "/pilot" },
  { label: "Investors", href: "/investors" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [scroll] = useWindowScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const scrollThreshold = 100;

    if (opened) {
      setIsVisible(true);
      return;
    }

    if (scroll.y > scrollThreshold) {
      if (scroll.y > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    } else {
      setIsVisible(true);
    }

    setLastScrollY(scroll.y);
  }, [scroll.y, opened, lastScrollY]);

  return (
    <Box
      component="header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Box
        style={{
          background: "rgba(10, 10, 10, 0.5)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Box px={{ base: "md", sm: 48 }}>
          <Group justify="space-between" h={80}>
            {/* Logo */}
            <Anchor component={Link} href="/" underline="never">
              <Group gap="sm">
                <Image
                  src="/favicon/logo.svg"
                  alt="Ascerex Logo"
                  h={40}
                  w="auto"
                />
                <Text
                  fw={700}
                  size="xl"
                  tt="uppercase"
                  style={{ letterSpacing: "0.2em" }}
                >
                  ASCEREX
                </Text>
              </Group>
            </Anchor>

            {/* Desktop Navigation */}
            <Group gap={40} visibleFrom="md">
              {navLinks.map((link) => (
                <Anchor
                  key={link.href}
                  component={Link}
                  href={link.href}
                  c="dimmed"
                  size="sm"
                  fw={500}
                  tt="uppercase"
                  style={{
                    letterSpacing: "0.05em",
                    transition: "color 0.3s ease",
                  }}
                  underline="never"
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--mantine-color-dimmed)")
                  }
                >
                  {link.label}
                </Anchor>
              ))}
            </Group>

            {/* Mobile Burger */}
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="md"
              color="white"
              size="sm"
            />
          </Group>
        </Box>

        {/* Mobile Navigation */}
        <Collapse in={opened}>
          <Box px={{ base: "md", sm: "xl" }} pb="xl" hiddenFrom="md">
            {navLinks.map((link) => (
              <Anchor
                key={link.href}
                component={Link}
                href={link.href}
                c="dimmed"
                display="block"
                py="md"
                tt="uppercase"
                fw={500}
                size="md"
                onClick={close}
                underline="never"
                style={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {link.label}
              </Anchor>
            ))}
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
}
