"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import getNavMenuItems from "./components/getNavmenu";
import Link from "next/link";

const Footer = () => {
  const [footerTitle, setFooterTitle] = useState<string>("");

  useEffect(() => {
    const fetchMenuItems = async () => {
      const { title } = await getNavMenuItems();
      setFooterTitle(title);
    };
    fetchMenuItems();
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
        component="div">
        © 2025 {footerTitle}. All rights reserved.
        <Typography
          sx={{
            fontSize: "0.8rem",
            marginTop: "0.5rem",
            color: "#888",
          }}
          variant="body2"
          align="center"
          component="div">
          Developed & maintained by{" "}
          <Link href="https://github.com/MarRadman">MarRadman</Link>
        </Typography>
      </Typography>
    </Box>
  );
};

export default Footer;
