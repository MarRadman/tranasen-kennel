import { getAllNews } from "../services/helpers";
import { Box, Typography, Paper, CardMedia } from "@mui/material";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import LoadingData from "../components/getLoadingPage";
import { Suspense } from "react";

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
      description: documentToPlainTextString(newsItem.fields.description),
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
        {allNews.map((newsItem: any, index: number) => (
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
            {newsItem.fields.heroImage?.fields?.file?.url && (
              <CardMedia
                component="img"
                alt={newsItem.fields.heroImage.fields.title}
                image={`https:${newsItem.fields.heroImage.fields.file.url}`}
                sx={{
                  width: "100%",
                  height: "auto",
                  mb: 2,
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              />
            )}
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
