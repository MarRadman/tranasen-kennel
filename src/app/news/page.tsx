import { getAllNews } from "../services/helpers";
import { Box, Typography, Paper } from "@mui/material";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import LoadingData from "../components/getLoadingPage";
import { Suspense } from "react";
import { NewsItem } from "@app/types";
import { Document } from "@contentful/rich-text-types";

const NewsPage = async () => {
  const newsLists = await getAllNews();

  // Flatten all news from newsLists and sort them by date (latest first)
  const allNews = newsLists
    .flatMap((list) => (Array.isArray(list.news) ? list.news : []))
    .sort(
      (a, b) =>
        new Date(b.fields.date).getTime() - new Date(a.fields.date).getTime()
    );

  if (!allNews.length) {
    return <Typography variant="h1">Inga nyheter hittades</Typography>;
  }

  const allNewsWithPlainText = allNews.map((newsItem) => ({
    ...newsItem,
    fields: {
      ...newsItem.fields,
      description:
        newsItem.fields.description &&
        typeof newsItem.fields.description === "object"
          ? documentToPlainTextString(newsItem.fields.description as Document)
          : newsItem.fields.description || "",
    },
  }));

  return (
    <Suspense fallback={<LoadingData />}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          p: 3,
          gap: 4,
        }}>
        {allNews.map((newsItem: NewsItem, index: number) => (
          <Paper
            key={newsItem.sys?.id || index}
            elevation={3}
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: 800,
              width: "100%",
              mb: 3,
              marginTop: "5%",
              borderRadius: 2,
            }}>
            <Typography variant="h4" component="h2" gutterBottom>
              {newsItem.fields.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {newsItem.fields.date}
            </Typography>
            <Typography
              variant="body1"
              component="div"
              color="textSecondary"
              align="center"
              sx={{ maxWidth: 800 }}>
              {allNewsWithPlainText[index].fields.description}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Suspense>
  );
};

export default NewsPage;
