import ThemeRegistry from "./components/themeRegistry";
import Header from "./header";
import Footer from "./footer";
import getNavMenuItems from "./components/getNavmenu";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch navigation menu data server-side
  const { title, items } = await getNavMenuItems();

  return (
    <html lang="se">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Tranasens Hundkennel" />
        <meta name="keywords" content="NEXT.TS, Contentful" />
        <meta name="author" content="Martin" />
        <title>Tranåsens Hundkennel</title>
      </head>
      <body>
        <ThemeRegistry>
          <Header navTitle={title} menuItems={items} />
          {children}
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
