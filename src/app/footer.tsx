"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import getNavMenuItems from "./components/getNavmenu";

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [footerTitle, setFooterTitle] = useState<string>("");

  useEffect(() => {
    const fetchMenuItems = async () => {
      const { title } = await getNavMenuItems();
      setFooterTitle(title);
    };
    fetchMenuItems();
  }, []);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <Box component="footer" className="footer">
      <Typography
        sx={{
          background: "linear-gradient(to right, #ece9e6, #ffffff)",
        }}
        variant="subtitle1"
        align="center"
        color="secondary"
        component="p">
        © {year} {footerTitle}. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
