import { fetchData } from "../lib/contentful";
import { NavMenuData, NavMenuItem } from "@/app/types";

const getNavMenuItems = async (): Promise<NavMenuData> => {
  try {
    const data = await fetchData("navigationMenu");

    if (!data || data.length === 0) {
      console.error("No navigation menu data found");
      return { title: "", items: [] };
    }

    const title =
      typeof data[0]?.fields?.title === "string" ? data[0].fields.title : "";

    const itemsField = data[0]?.fields?.items;
    const items: NavMenuItem[] = Array.isArray(itemsField)
      ? itemsField.map((item: any) => ({
          title: item.fields.title,
          link: item.fields.link, // Use "linkTo" as defined in your MenuItem content type
        }))
      : [];
    return { title, items };
  } catch (error) {
    console.error("Error fetching navigation menu:", error);
    return { title: "Tranåsens Kennel", items: [] };
  }
};

export default getNavMenuItems;
