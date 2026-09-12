import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "./globals.css";

// Custom Ascerex theme
const theme = createTheme({
  primaryColor: "gray",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  colors: {
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5c5f66",
      "#373A40",
      "#2C2E33",
      "#25262b",
      "#1A1B1E",
      "#141517",
      "#0a0a0a",
    ],
  },
  headings: {
    fontWeight: "700",
  },
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  "https://www.ascerex.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Ascerex",
  title: "Ascerex",
  description: "Revolutionizing Personal Flight Accessibility",
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      {
        url: "/favicon/favicon-white.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "Ascerex",
    statusBarStyle: "black",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Ascerex",
    title: "Ascerex",
    description: "Revolutionizing Personal Flight Accessibility",
    images: [
      {
        url: "/favicon/social-preview.png",
        width: 1200,
        height: 630,
        alt: "Ascerex company logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ascerex",
    description: "Revolutionizing Personal Flight Accessibility",
    images: ["/favicon/social-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-mantine-color-scheme="dark">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
