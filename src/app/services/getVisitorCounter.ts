// import { createClient } from "contentful";

// const client = createClient({
//   space: process.env.CONTENTFUL_SPACE_ID || "",
//   accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
// });

// const spaceId = process.env.CONTENTFUL_SPACE_ID || ""; // Your Contentful space ID
// const environmentId = "master"; // Your environment ID (default is "master")
// const entryId = "YOUR_ENTRY_ID"; // Replace with the ID of your VisitorCounter entry

// export const getVisitorCounter = async () => {
//   const space = await client.getSpace(spaceId);
//   const environment = await space.getEnvironment(environmentId);
//   const entry = await environment.getEntry(entryId);

//   // Fetch the current count
//   const currentCount = entry.fields.count["en-US"] || 0;

//   // Increment the count
//   const updatedCount = currentCount + 1;
//   entry.fields.count["en-US"] = updatedCount;

//   await entry.update();
//   await entry.publish();

//   return updatedCount;
// };
