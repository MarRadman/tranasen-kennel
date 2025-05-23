import HeaderClient from "./components/HeaderClient";

interface HeaderProps {
  navTitle: string;
  menuItems: { title: string; link: string }[];
}

export default function Header(props: HeaderProps) {
  return <HeaderClient {...props} />;
}
