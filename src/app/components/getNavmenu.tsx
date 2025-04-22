/* eslint-disable */
import { fetchData } from "../lib/contentful";
import { NavMenuData, NavMenuItem } from "@/app/types";

const getNavMenuItems = async (): Promise<NavMenuData> => {
  const data = await fetchData("navigationMenu");
  console.log("NAvmenu: ", data);
  const title =
    typeof data[0]?.fields?.title === "string"
      ? data[0].fields.title
      : "Default Title";
  const itemsField = data[0]?.fields?.items;
  const items: NavMenuItem[] = Array.isArray(itemsField)
    ? itemsField.map((item: any) => ({
        title: item.fields.title,
        link: item.fields.link,
      }))
    : [];
  return { title, items };
};

export default getNavMenuItems;
