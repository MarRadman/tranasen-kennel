import { fetchData } from "../lib/contentful";

export const getPageContent = async (contentType: string, slug?: string) => {
  const pageData = await fetchData(contentType, slug);
  return pageData.length > 0 ? pageData[0].fields : null;
};

// /* eslint-disable */

// import { fetchData } from "../lib/contentful";
// import {
//   HomePageData,
//   AboutPageData,
//   ContactPageData,
//   ProjectsPageData,
//   ProjectData,
//   Education,
//   WorkExperience,
// } from "@/app/types";

// export const getPageContent = async (
//   contentType: string,
//   slug?: string,
//   category?: string
// ): Promise<
//   | HomePageData
//   | AboutPageData
//   | ContactPageData
//   | ProjectsPageData
//   | ProjectData
//   | null
// > => {
//   const pageData = await fetchData(contentType, slug, category);
//   const page = pageData[0]?.fields;

//   if (!page) {
//     return null;
//   }

//   const extractText = (content: any): string => {
//     if (Array.isArray(content)) {
//       return content
//         .map((item) => {
//           if (item.nodeType === "text") {
//             return item.value;
//           } else if (item.content) {
//             return extractText(item.content);
//           }
//           return "";
//         })
//         .join(" ");
//     } else if (typeof content === "string") {
//       return content;
//     }
//     return ""; // Return an empty string if content is not an array or string
//   };

//   const extractTechnologies = (content: any[]): string[] => {
//     if (!Array.isArray(content)) {
//       return []; // Return an empty array if content is not an array
//     }
//     return content
//       .flatMap((item) => {
//         if (item.nodeType === "text") {
//           return [item.value];
//         } else if (item.content) {
//           return extractTechnologies(item.content);
//         }
//         return [];
//       })
//       .filter((tech) => tech.trim() !== ""); // Filter out empty strings
//   };

//   const extractImages = (imagesField: any): string[] => {
//     if (Array.isArray(imagesField)) {
//       return imagesField.map(
//         (image: any) => `https://${image.fields.file.url}`
//       );
//     } else if (imagesField?.fields?.file?.url) {
//       return [`https://${imagesField.fields.file.url}`];
//     }
//     return []; // Return an empty array if imagesField is not an array or a single image object
//   };

//   const extractEducation = (educationField: any[]): Education[] => {
//     if (!Array.isArray(educationField)) {
//       return []; // Return an empty array if educationField is not an array
//     }
//     return educationField.map((item) => ({
//       title: item.fields.title,
//       school: item.fields.school,
//       year: item.fields.year,
//       description: extractText(item.fields.description?.content || ""),
//     }));
//   };

//   const extractWorkExperience = (
//     workExperienceField: any[]
//   ): WorkExperience[] => {
//     if (!Array.isArray(workExperienceField)) {
//       return []; // Return an empty array if workExperienceField is not an array
//     }
//     return workExperienceField.map((item) => ({
//       role: item.fields.role,
//       company: item.fields.company,
//       duration: item.fields.duration,
//       description: extractText(item.fields.description?.content || ""),
//     }));
//   };

//   const extractProjects = (projects: any[]): ProjectData[] => {
//     if (!Array.isArray(projects)) {
//       return []; // Return an empty array if projects is not an array
//     }
//     return projects.map((project) => {
//       const projectFields = project.fields;
//       const projectContent = extractText(projectFields.content?.content || []);
//       const projectDescription = projectFields.description || "";
//       const projectImages = extractImages(projectFields.images || []);
//       const projectSlug = project.fields.slug;
//       const projectTechnologies = extractTechnologies(
//         projectFields.technologies?.content || []
//       );
//       const projectUrl = projectFields.url || "";

//       return {
//         title: projectFields.title || "Untitled",
//         content: projectContent,
//         description: projectDescription,
//         images: projectImages,
//         slug: projectSlug,
//         technologies: projectTechnologies,
//         url: projectUrl,
//         category: projectFields.category || "",
//       };
//     });
//   };

//   switch (contentType) {
//     case "homepage":
//       return {
//         title: page.title,
//         content:
//           page.content &&
//           typeof page.content === "object" &&
//           "content" in page.content
//             ? extractText(page.content.content || [])
//             : "",
//         image: extractImages(page.image),
//       } as HomePageData;

//     case "about":
//       return {
//         title: page.title,
//         content:
//           page.content &&
//           typeof page.content === "object" &&
//           "content" in page.content
//             ? extractText(page.content.content || [])
//             : "",
//         image: extractImages(page.image),
//         education: Array.isArray(page.education)
//           ? extractEducation(page.education)
//           : [],
//         workExperience: Array.isArray(page.workExperience)
//           ? extractWorkExperience(page.workExperience)
//           : [],
//       } as AboutPageData;

//     case "contact":
//       return {
//         title: page.title,
//         image: extractImages(page.image),
//         address: page.address,
//         email: page.email,
//         phone: page.phone,
//         github: page.github,
//         linkedin: page.linkedin,
//       } as ContactPageData;

//     case "projects":
//       const projects = Array.isArray(page.projects)
//         ? extractProjects(page.projects)
//         : [];
//       const categories = Array.from(
//         new Set(projects.map((project) => project.category))
//       );
//       return {
//         title: page.title,
//         projects,
//         categories,
//       } as ProjectsPageData;

//     case "project":
//       return {
//         title: page.title,
//         content:
//           page.content &&
//           typeof page.content === "object" &&
//           "content" in page.content
//             ? extractText(page.content.content || [])
//             : "",
//         description: page.description || "",
//         images: extractImages(page.images),
//         slug: page.slug,
//         technologies:
//           page.technologies &&
//           typeof page.technologies === "object" &&
//           "content" in page.technologies
//             ? Array.isArray(page.technologies.content)
//               ? extractTechnologies(page.technologies.content)
//               : []
//             : [],
//         url: page.url || "",
//         category: page.category || "",
//       } as ProjectData;

//     default:
//       return null;
//   }
// };
