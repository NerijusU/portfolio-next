import "./globals.css";

/**
 * Root layout required by Next.js App Router.
 * @param {{ children: React.ReactNode }} props - Layout props with child routes.
 * @returns {JSX.Element} The root layout.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
