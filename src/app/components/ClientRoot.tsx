"use client";
import ThemeRegistry from "./themeRegistry";
import Header from "../header";
import Footer from "../footer";

export default function ClientRoot({
  children,
  navTitle,
  menuItems,
  footerTitle,
}: {
  children: React.ReactNode;
  navTitle: string;
  menuItems: { title: string; link: string }[];
  footerTitle: string;
}) {
  return (
    <ThemeRegistry>
      <Header navTitle={navTitle} menuItems={menuItems} />
      {children}
      <Footer footerTitle={footerTitle} />
    </ThemeRegistry>
  );
}
