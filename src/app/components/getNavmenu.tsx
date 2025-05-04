import { fetchData } from "../lib/contentful";
import { NavMenuData, NavMenuItem } from "@/app/types";

// Type checker for items
// Got 1 eslint-disable because it cant be sure its an array or string.
function isNavMenuItem(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any
): item is { fields: { title: string; link: string } } {
  return (
    item &&
    typeof item === "object" &&
    item.fields &&
    typeof item.fields.title === "string" &&
    typeof item.fields.link === "string"
  );
}

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
      ? itemsField.filter(isNavMenuItem).map((item) => ({
          title: item.fields.title,
          link: item.fields.link,
        }))
      : [];
    return { title, items };
  } catch (error) {
    console.error("Error fetching navigation menu:", error);
    return { title: "Tranåsens Kennel", items: [] };
  }
};

export default getNavMenuItems;
