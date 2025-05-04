export interface HomePageData {
  title: string;
  content: string;
  image: string[];
}

export interface ContactPageData {
  title: string;
  image: string[];
  address: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}

export interface NavMenuItem {
  title: string;
  link: string;
}

export interface NavMenuData {
  title: string;
  items: NavMenuItem[];
}
