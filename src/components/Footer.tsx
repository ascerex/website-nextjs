"use client";

import { Box, Group, Text, Anchor, Container } from "@mantine/core";
import Link from "next/link";

export function Footer() {
  return (
    <Box
      component="footer"
      style={{
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        padding: "40px 48px",
      }}
    >
      <Container size="xl">
        <Group justify="space-between" align="flex-start">
          {/* Contact */}
          <Box style={{ flex: 1, textAlign: "left" }}>
            <Text
              size="sm"
              c="dimmed"
              tt="uppercase"
              style={{ letterSpacing: "0.05em" }}
              mb={8}
            >
              Contact
            </Text>
            <Anchor
              href="mailto:contact@ascerex.com"
              c="white"
              size="sm"
              style={{ letterSpacing: "0.02em" }}
            >
              contact@ascerex.com
            </Anchor>
          </Box>

          {/* Privacy */}
          <Box style={{ flex: 1, textAlign: "center" }}>
            <Anchor
              component={Link}
              href="/privacy-policy"
              c="dimmed"
              size="sm"
              tt="uppercase"
              style={{ letterSpacing: "0.05em" }}
            >
              Privacy Policy
            </Anchor>
          </Box>

          {/* Copyright */}
          <Box style={{ flex: 1, textAlign: "right" }}>
            <Text
              size="sm"
              c="dimmed"
              tt="uppercase"
              style={{ letterSpacing: "0.05em" }}
            >
              &copy; 2025 ASCEREX
            </Text>
          </Box>
        </Group>
      </Container>
    </Box>
  );
}
