import getNavMenuItems from "./components/getNavmenu";
import ClientRoot from "./components/ClientRoot";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <ClientRoot navTitle={title} menuItems={items} footerTitle={title}>
          {children}
        </ClientRoot>
      </body>
    </html>
  );
}
