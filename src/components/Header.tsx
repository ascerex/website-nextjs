"use client";

import { useEffect, useRef, useState } from "react";
import {
  Box,
  Group,
  Burger,
  Collapse,
  Anchor,
  Image,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import styles from "./Header.module.css";

const SCROLL_THRESHOLD = 100;

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
  const [isVisible, setIsVisible] = useState(true);
  const openedRef = useRef(opened);
  const lastScrollYRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    openedRef.current = opened;
  }, [opened]);

  useEffect(() => {
    lastScrollYRef.current = Math.max(window.scrollY, 0);

    const updateHeader = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const lastScrollY = lastScrollYRef.current;

      if (openedRef.current) {
        lastScrollYRef.current = currentScrollY;
        animationFrameRef.current = null;
        return;
      }

      if (currentScrollY <= SCROLL_THRESHOLD) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
      animationFrameRef.current = null;
    };

    const handleScroll = () => {
      if (animationFrameRef.current === null) {
        animationFrameRef.current = window.requestAnimationFrame(updateHeader);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!opened) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [close, opened]);

  const handleMenuToggle = () => {
    if (!opened) setIsVisible(true);
    toggle();
  };

  return (
    <Box
      component="header"
      className={styles.stage}
      data-state={isVisible ? "isOpen" : "isCollapsed"}
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
                  c="#fff"
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
                  className={styles.desktopNavLink}
                  underline="never"
                >
                  {link.label}
                </Anchor>
              ))}
            </Group>

            {/* Mobile Burger */}
            <Burger
              opened={opened}
              onClick={handleMenuToggle}
              hiddenFrom="md"
              color="white"
              size="sm"
              aria-label={opened ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={opened}
              aria-controls="mobile-navigation"
            />
          </Group>
        </Box>

        {/* Mobile Navigation */}
        <Collapse in={opened}>
          <Box
            id="mobile-navigation"
            component="nav"
            aria-label="Mobile navigation"
            px={{ base: "md", sm: "xl" }}
            pb="xl"
            hiddenFrom="md"
          >
            {navLinks.map((link) => (
              <Anchor
                key={link.href}
                component={Link}
                href={link.href}
                className={styles.mobileNavLink}
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
