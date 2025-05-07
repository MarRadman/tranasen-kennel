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

export interface Dog {
  name?: string;
  slug?: string;
  images?: Array<{ fields: { file: { url: string } } }>;
  description?: { data: JSON; content: string[]; nodeType: string };
  category?: string;
  birthdate?: string;
  dogColor?: string;
  dogAncestorTree?: Array<{
    metadata: any;
    sys: any;
    fields: any;
  }>;
}
