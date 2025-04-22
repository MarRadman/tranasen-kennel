export interface HomePageData {
  title: string;
  content: string;
  image: string[];
}

export interface Education {
  title: string;
  school: string;
  year: string;
  description: string;
}

export interface WorkExperience {
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface AboutPageData {
  title: string;
  content: string;
  image: string[];
  education: Education[];
  workExperience: WorkExperience[];
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

export interface ProjectData {
  title: string;
  content: string;
  description: string;
  images: string[];
  slug: string;
  technologies?: string[];
  url?: string;
  category?: string;
}

export interface ProjectsPageData {
  title: string;
  projects: ProjectData[];
  categories: string[];
}

export interface NavMenuItem {
  title: string;
  link: string;
}

export interface NavMenuData {
  title: string;
  items: NavMenuItem[];
}
