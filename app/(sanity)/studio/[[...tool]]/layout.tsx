import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Next - Studio",
  description: "Portfolio Next - Studio",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default Layout;
