export interface HomePageData {
  description: string;
  heroImages: unknown;
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

// Navmenu types
export interface NavMenuItem {
  title: string;
  link: string;
}

export interface NavMenuData {
  title: string;
  items: NavMenuItem[];
}

// Dog types
export interface DogImageField {
  file: {
    url: string;
  };
}

export interface DogImage {
  fields: DogImageField;
}

export interface DogAncestor {
  metadata: unknown;
  sys: unknown;
  fields: {
    relationType: string;
    color: string;
    name: string;
  };
}

export interface Dog {
  name?: string;
  slug?: string;
  images?: DogImage[];
  description?: {
    data: unknown;
    content: string[];
    nodeType: string;
  };
  category?: string;
  birthdate?: string;
  dogColor?: string;
  dogAncestorTree?: DogAncestor[];
}

export interface NewsItem {
  sys?: { id?: string };
  fields: {
    title: string;
    date: string;
    description: string;
    heroImage?: DogImage;
  };
}

export interface NewsList {
  title: string;
  slug: string;
  news: NewsItem[];
}

export interface ContentfulEntry<T> {
  fields: T;
  sys?: unknown;
  metadata?: unknown;
}
